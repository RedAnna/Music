<template>
  <el-main class="find-index">
      <el-row class="find-title">
        <el-col :span="18">发现好歌单</el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
      
      <el-rows >
        <el-cols v-for="item in playlist" :key="item.id"  :id="item.id" :gd="isgd">
          <!-- 图片懒加载 -->
          <el-image :src="item.picUrl" alt="" slot="img" lazy />
          <p slot="title">{{item.name}}</p>
        </el-cols>
      </el-rows>

    </el-main>
</template>

<script>
import { getPlaylist } from "network/song";
import elRows from "components/album/elRows";
import elCols from "components/album/elCols";

export default {
  data(){
    return {
      playlist:[],
      isgd: true,
    }
  },
  created(){
    this.getlist()
  },
  components:{
    elRows,
    elCols
  },
  methods:{
    getlist(){
      getPlaylist().then(res=> {
        this.playlist = res.result
      })
    }
  }
}
</script>

<style scoped>
.find-index {
  width: 100%;
  height: 20vh;
  margin: 0 auto;
  padding: 0 .5rem;
  background-color: #fff;
  border-radius: 5px;
}
.find-title{
  padding: 1% 0;
}
.ablumBtn {
  font-size: 0.5rem;
  padding: 0.2rem;
  float: right;
}

.grid-content div .el-image{
  width: 100%;
  height: 100%;
}
.grid-content p{
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>