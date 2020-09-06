<template>
  <el-main class="play-main">
    <el-carousel trigger="click" :autoplay="false">
      <el-carousel-item><play-intro :gid="id" :id="aid" :isgedan="isg"/></el-carousel-item>
      <el-carousel-item><play-an :id="id" :flag="ff"/></el-carousel-item>
      <el-carousel-item><play-lyc :id="id" :audio="audio" :currentt="cut" /></el-carousel-item>
    </el-carousel>
  </el-main>
</template>

<script>

import playIntro from "components/play/playIntro"
import playAn from "components/play/playAn"
import playLyc from "components/play/playLyc"

export default {
  props:{
    id:0,
    audio:'',
    cut:0,
    aid:0,
    ff: false,
    isg:false,
  },
  components: {
    playIntro,
    playAn,
    playLyc,
  },
};
</script>

<style scoped>
.play-main {
  background-color: grey;
  height: 75%;
  color: black;
  padding: 0.5rem;
}
.el-carousel {
  height: 100%;
}


.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel /deep/ .el-carousel__container{
  height: 100%;
}

</style>
