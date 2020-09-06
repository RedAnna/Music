<template>
  <el-main>
    <p>{{name}}{{alia}}</p>
    <p>
      ——&nbsp;&nbsp;
      <span v-for="(item ,index) in artists" :key="index">{{item.name}}&nbsp;</span>&nbsp;——
    </p>
    <el-row>
      <div class="animation" ref="an">
        <el-image :src="imgurl" />
      </div>
    </el-row>
  </el-main>
</template>

<script>
import { getSongDetail } from "network/song";
export default {
  data() {
    return {
      name: "",
      artists: [],
      alia: "",
      imgurl: "",
    };
  },
  props: {
    id: 0,
    flag: false,
  },
  created() {
    this.getDetail();
    this.isAnimation();
  },
  methods: {
    getDetail() {
      getSongDetail(this.id).then((res) => {
        if (res.songs[0].alia) {
          this.alia = res.songs[0].alia[0];
        } else {
          this.alia = "";
        }
        this.name = res.songs[0].name;
        this.artists = res.songs[0].ar;
        this.imgurl = res.songs[0].al.picUrl;
      }).catch(err => {});
    },
    //动画
    isAnimation() {
      let roll = this.$refs.an;
      if (roll) {
        if (!this.flag) {
          this.$refs.an.style.animationPlayState = "running";
        } else {
          this.$refs.an.style.animationPlayState = "paused";
        }
      }else{
        let _this = this
        setTimeout(function(){
          _this.isAnimation()
        },0)
      }
    },
  },
  watch: {
    id() {
      this.getDetail();
    },
    flag() {
      this.isAnimation();
    },
  },
};
</script>

<style scoped>
.el-main {
  height: 100%;
  text-align: center;
  position: relative;
}
@media screen and (max-width: 400px) {
  .animation {
    width: 50vw;
    height: 50vw;
    border: 2vw solid grey;
  }
}
@media screen and (min-width: 400px) {
  .animation {
    width: 50vh;
    height: 50vh;
    border: 2vh solid grey;
  }
}
.el-row {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.animation {
  border-radius: 50%;
  box-shadow: 0 0.3rem 2.5rem 0.3rem black;
  background: grey;
  overflow: hidden;
  animation: rotatePlay 6s linear infinite;
  animation-play-state: paused;
}
.el-image {
  width: 100%;
  height: 100%;
}
@keyframes rotatePlay {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>