<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item , index) in imgBoxs" :key="index">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner } from "network/song";
export default {
  data() {
    return {
      url: "",
      imgBoxs: [],
    };
  },
  created() {
    this.isBanner();
  },
  methods: {
    // 判断 移动端推荐歌单 pc banner
    isBanner() {
      //大于400 true 小于false
      var result = window.matchMedia("(min-width: 450px)").matches;
      if (result) {
        this.url = "/banner";
        getBanner(this.url).then((res) => {
          for (let item of res.banners) {
            this.imgBoxs.push(item.imageUrl);
          }
        });
      } else {
        this.url = "/personalized/newsong";
        getBanner(this.url).then((res) => {
          for (let item of res.result) {
            this.imgBoxs.push(item.picUrl);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 20vh;
  background-color: #fff;
  border-radius: 5px;
  margin: 8vh 0 10px 0;
  position: relative;
}
.el-carousel {
  width: 95%;
  height: 200px;
  margin: 0 auto;
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-carousel /deep/ .el-carousel__container {
  height: 150px;
}
.el-carousel /deep/ .el-carousel__button {
  width: 1rem;
}
</style>