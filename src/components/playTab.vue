<template>
  <div class="play-tab" ref="tab">
    <el-button @click="play()" class="play-btn" ref="playbtn" icon="el-icon-video-play" circle></el-button>
    <!-- <span class="play-span"></span> -->
    <el-button @click="upPlay()" class="up-btn">{{this.text}}</el-button>
    <play
      :id="iid"
      :aid="aid"
      :ff="flag"
      :isg="isgdd"
      v-show="isShow"
      :audio="this.$refs.audio"
      :cut="curt"
    />
    <play-progress
      :id="iid"
      :flag="flag"
      :audio="this.$refs.audio"
      v-show="isShow"
      @currenT="getT"
      @isok="isloop"
    />
    <audio :src="sUrl" ref="audio" autoplay />
  </div>
</template>

<script>
//获取音乐url
import { getSongUrl } from "network/song";

import play from "components/play/play";
import playProgress from "components/play/playProgress";

export default {
  data() {
    return {
      iid: 0, //可以改变的id
      isUp: false,
      text: "点击进入",
      sUrl: "", //歌曲url
      allSongid: [], //所有歌曲的id
      surls: [], //所有歌曲的url
      flag: true, //播放按钮
      isShow: false,
      curt: 0,
      isok: false,
    };
  },
  props: {
    id: 0,
    isplay: false,
    aid: 0,
    isgdd: false,
    allSong: null, //所有歌曲
  },
  components: {
    play,
    playProgress,
  },
  methods: {
    //audio是否加载好
    getaudio() {
      if (this.$refs.audio || this.$refs.audio.src) {
        this.$refs.playbtn.disabled = false;
      } else {
        $refs.playbtn.disabled = true;
        let _this = this;
        setTimeout(function () {
          this.getaudio();
        }, 0);
      }
    },
    upPlay() {
      let tab = this.$refs.tab;
      this.isUp = !this.isUp;
      if (this.isUp) {
        tab.style.top = "5%";
        this.text = "返回首页";
        this.isShow = true;
      } else {
        tab.style.top = "95% ";
        this.text = "点击进入";
        this.isShow = false;
      }
    },

    play() {
      this.getaudio()
      if (this.flag) {
        this.$refs.audio.play();
        this.flag = false;
      } else {
        this.$refs.audio.pause();
        this.flag = true;
      }
    },
    getSongURL() {
      getSongUrl(this.iid).then((res) => {
        this.sUrl = res.data[0].url;
        this.getaudio();
      });
    },
    getT(data) {
      this.curt = data;
    },
    //播放完，下一首
    isloop(data) {
      this.isok = data;
      //获取所有id
      for (let item of this.allSong) {
        this.allSongid.push(item.id);
      }
      //查找当前元素id索引
      if (this.isok) {
        let i = this.allSongid.indexOf(this.id);
        if (i == this.allSongid.length - 1) {
          i = -1;
        }
        //下一首
        this.iid = this.allSongid[i + 1];
      }
    },
  },
  watch: {
    id() {
      this.iid = this.id;
      this.getSongURL();
    },
    //轮播监听
    iid() {
      this.getSongURL();
    },
    isplay() {
      this.flag = this.isplay;
      console.log("是否在播放" + this.flag);
      this.getSongURL();
      this.play();
    },
  },
};
</script>

<style scoped>
.play-tab {
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 95%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 1rem 1rem 0 0;
  transition: 0.3s ease-in-out;
  z-index: 9999;
}
.el-button {
  padding: 0;
}
.play-btn {
  width: 4rem;
  height: 4rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  font-size: 4rem;
  line-height: 4rem;
  z-index: 999;
}
/* .play-span{
  height: 4rem;
  width: 4rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 0 5rem 0rem grey;
} */
.up-btn {
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  line-height: 1rem;
  text-align: right;
  padding-right: 1rem;
}
.el-button + .el-button {
  margin: 0;
}
audio {
  display: none;
}
</style>
<style>
.play-btn /deep/ .el-icon-video-play {
  text-align: center;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>