<template>
  <el-container class="album">
    <el-header style="height:40vh">
      <el-image class="header-bgimg" :src="this.playlist.bgimg" lazy />
      <el-row class="header-row">
        <el-col :span="10">
          <el-image :src="playlist.bgimg" :fit="fits" lazy />
        </el-col>
        <el-col :span="14">
          <p>{{playlist.name}}</p>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="scroll">
      <el-row
        v-for="(item , index) in songs"
        :key="index"
        id="item.id"
        @click.native="isPlay(item.id)"
      >
        <el-col :span="4">{{index}}</el-col>
        <el-col :span="20">
          <p>{{item.name}}</p>
          <p>
            <span v-for="(i , index) in item.ar" :key="index">{{i.name}}</span>
          </p>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

import { getPLDetail, getAlbum } from "network/song";

export default {
  data() {
    return {
      id: 0, //当前歌单 or 新碟id
      songIds: [], //所有歌曲id
      songs: [],
      playlist: [], //title bgimg artist
      fits: "scale-down",
      isGedan: false,
      isplay: false ,//点击是否播放
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      if (this.$route.query.isGedan == "true") {
        this.isGedan = true;
        this.getPlaylistDetail(); //获取歌单信息
      } else {
        this.isGedan = false;
        this.getNewDisc(); //获取新碟信息
      }
    },
    getPlaylistDetail() {
      this.id = this.$route.query.id;
      getPLDetail(this.id).then((res) => {
        res = res.playlist;
        this.songIds = res.trackIds;
        this.songs = res.tracks;
        this.$set(this.playlist, "name", res.name);
        this.$set(this.playlist, "bgimg", res.coverImgUrl);
      });
    },
    getNewDisc() {
      this.id = this.$route.query.id;
      getAlbum(this.id).then((res) => {
        this.songs = res.songs;
        this.$set(this.playlist, "name", res.album.name);
        this.$set(this.playlist, "bgimg", res.album.picUrl);
      });
    },
    isPlay(id) {
      //歌单列表-》传值父组件app -> 子组件 playTab
      this.isplay =  !this.isplay
      let isplay = this.isplay;
      let aid = this.id;
      let isgd = this.isGedan;
      let songsId = this.songIds
      //歌曲id 是否播放 aid 是否是歌单 所有歌曲id
      this.$emit("iplay", { id, isplay, aid, isgd ,songsId});
    },
  },
};
</script>

<style scoped>
.album {
  height: 80vh;
  width: 90%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 5px 2px #fff;
}
.el-header {
  padding: 0;
  width: 100%;
  color: #000;
  font-size: 1.5rem;
  font-weight: bolder;
}
.header-bgimg {
  height: 100%;
  width: 100%;
  opacity: 0.7;
}
.header-row {
  position: absolute;
  left: 0;
  right: 0;
  top: 11vh;
}
.header-row .el-col {
  height: 16vh;
  text-shadow: 0 0 5px #fff;
}
.header-row .el-col .el-image {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 16vh;
  height: 16vh;
  border: #fff 1px solid;
  box-shadow: 0px 0px 5px 2px #000;
}
.el-main {
  position: absolute;
  left: 0;
  right: 0;
  top: 38vh;
  bottom: 0;
  border-radius: 3vh 3vh 0 0;
  background-color: #fff;
  padding: 0;
  box-shadow: 0px -1px 0px 1px #000;
  overflow: scroll;
}
.el-main .el-row:first-child {
  margin: 2rem 0 0 0;
}
.el-main .el-row {
  padding: 0 0.5rem;
  margin: 0.5rem 0;
}
.el-main .el-row .el-col:first-child {
  text-align: center;
  color: red;
}
.el-main .el-row .el-col p:nth-child(2) {
  font-size: 0.75rem;
}
</style>