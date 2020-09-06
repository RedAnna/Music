<template>
  <el-main class="select-index">
    <el-row>
      <el-col :span="18">新碟推荐</el-col>
      <el-col :span="6">
        <el-button class="ablumBtn">查看更多</el-button>
      </el-col>
    </el-row>

    <div
      class="select-main scroll"
      v-infinite-scroll="load"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <el-rows v-for="(arr , index) in newList" :key="index">
        <el-cols v-for="item in arr" :key="item.id" :id="item.id" :gd="isgd">
          <el-image :src="item.picUrl" alt slot="img" />
          <p slot="title">{{item.name}}</p>
        </el-cols>
      </el-rows>
      <p v-if="loading">加载中...</p>
    </div>
  </el-main>
</template>

<script>
import { getNewSong } from "network/song";
import elRows from "components/album/elRows";
import elCols from "components/album/elCols";

export default {
  data() {
    return {
      totallist: [],
      newList: [],
      offset: 0,
      isgd: false,
      page: 3, //一次2行
      loading: false,
    };
  },
  created() {
    this.getNewS();
  },
  components: {
    elRows,
    elCols,
  },
  methods: {
    getNewS() {
      getNewSong(this.offset).then((res) => {
        let arr = [];
        let a = 0;
        for (let i = 0; i < res.monthData.length; i++) {
          if (a < 4) {
            arr.push(res.monthData[i]);
            a++;
          } else {
            this.totallist.push(arr);
            if (this.newList.length <= 2) {
              this.newList.push(arr); //1 2 3
            }
            a = 0;
            arr = [];
          }
        }
      });
    },
    load() {
      this.loading = true;
      if (this.totallist.length) {
        this.getnew();
        this.loading = false;
      } else {
        let _this = this;
        setTimeout(function () {
          _this.load();
        }, 0);
      }
    },
    //下拉加载
    getnew() {
      this.page = this.page + 6;
      for (let i in this.totallist) {
        if (this.newList.length < this.page) {
          let index = this.page - i - 1;
          this.newList.push(this.totallist[index]);
        }
      }
    },
  },
};
</script>

<style scoped>
.select-index {
  width: 100%;
  height: 32vh;
  margin: 0.5rem auto;
  padding: 0 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.select-main {
  height: 100%;
  overflow-y: auto;
}
.ablumBtn {
  font-size: 0.5rem;
  padding: 0.2rem;
  float: right;
}
.el-row {
  padding: 1% 0;
}

.grid-content div .el-image {
  width: 100%;
  height: 100%;
}
.grid-content p {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>