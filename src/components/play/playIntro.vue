<template>
  <el-main class="scroll" ref="intro">
    <div class="xindie" v-show="!isshow">
      <h2>{{name}}</h2>
      <p>
        来源：
        <span v-for="(item ,index) in artists" :key="index">{{item.name}}&nbsp;&nbsp;&nbsp;</span>
      </p>
      <p>公司：{{company}}</p>
      <h2>{{type}}描述</h2>
      <p>{{description}}</p>
    </div>
    <div class="gedan" v-show="isshow">
      <el-image :src="gedanUrl"/>
    </div>
  </el-main>
</template>

<script>
import { getAlbum ,getSongDetail} from "network/song";
export default {
  data() {
    return {
      artists: {},
      description: "", //描述
      company: "", //公司
      name: "",
      type: "", //歌单还是新碟
      gedanUrl:'',
      isshow: true, 
    };
  },
  props: {
    id: 0,
    gid: 0,
    isgedan: false,
  },
  created() {
    this.isGedan();
  },
  methods: {
    getIntroduce() {
      getAlbum(this.id)
        .then((res) => {
          console.log(res);
          this.artists = res.album.artists;
          this.description = res.album.description;
          this.company = res.album.company;
          this.name = res.album.name;
          this.type = "新碟";
        })
        .catch((err) => {});
    },
    getgedan(){
      getSongDetail(this.gid).then(res=>{
        this.gedanUrl = res.songs[0].al.picUrl
      }).catch((err) => {})
    },
    isGedan() {
      if (this.isgedan) {
        this.isshow = true //新碟false 歌单true
        this.getgedan()
      } else {
        this.isshow = false //新碟false 歌单true
        this.getIntroduce();
      }
    },
  },
  watch: {
    id() {
      this.isGedan();
    },
    gid(){
      this.isGedan();
    }
  },
};
</script>

<style scoped>
.el-main {
  height: 100%;
  padding: .5rem;
}
.el-main h2 {
  line-height: 3rem;
}
.el-main p {
  line-height: 2rem;
}
.gedan{
  height: 100%;
  width: 100%;
}
.el-image {
  height: 100%;
  width: 100%;
}
.scroll {
  overflow: scroll;
}
</style>