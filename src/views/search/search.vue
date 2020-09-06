<template>
  <el-container>
    <el-main class="scroll">
      <el-row v-for="item in songs" :key="item.id" id="item.id"
        @click.native="isPlay(item.id)">
        <p>{{item.name}}&nbsp;&nbsp;{{item.alias[0]}}</p>
        <p>
          &nbsp;&nbsp;
          <span v-for="(a, index) in item.artists" :key="index">
            {{a.name}}&nbsp;&nbsp;
            </span>
        </p>
        <el-divider></el-divider>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { search } from "network/song";
export default {
  data() {
    return {
      input: "",
      songs: [],
      id: 0,
    };
  },
  created() {
    this.getres();
  },
  methods: {
    getres() {
      this.input = this.$route.query.input;
      search(this.input).then((res) => {
        this.songs = res.result.songs;
        console.log(this.songs);
      });
    },
     isPlay(id) {
      //歌单列表-》传值父组件app -> 子组件 playTab
      let isplay = true;
      let aid = "";
      let isgd = 'true';
      //歌曲id 是否播放 aid 是否是歌单
      this.$emit("iplay", { id, isplay, aid, isgd });
    },
  },
};
</script>

<style scoped>
.el-container{
  height: 90%;
  width: 100%;
  background-color: #fff;
}
.el-main{
  height: 90%;
  overflow: scroll;
  padding: 5% 5% ;
}
.el-divider{
  margin: 12px 0;
}
</style>