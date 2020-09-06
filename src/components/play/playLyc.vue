<template>
  <el-main class="lyc-div scroll" ref="scroll">
    <div v-for="(item, index) in lyc" :key="index" :id="il[index]">
      <p>{{ item }}</p>
      <!-- <p>{{ tlyc[index] }}</p> -->
    </div>
  </el-main>
</template>

<script>
import { getSongLyric } from "network/song";

export default {
  data() {
    return {
      lyc: [], //歌词
      tlyc: [], //翻译歌词
      il: [],
      s: "",
    };
  },
  props: {
    id: 0,
    audio: "",
    currentt: 0, //当前时间
  },
  created() {
    this.getlyc();
  },
  mounted() {
  },
  methods: {
    getlyc() {
      getSongLyric(this.id).then((res) => {
        this.lyc = [];
        this.tlyc = [];
        this.il = [];
        if (res.nolyric || res.lrc == undefined || res.lrc.lyric == "") {
          this.lyc.push("暂无歌词");
        } else {
          let a = res.lrc.lyric.split("[");
          for (let i in a) {
            let b = a[i].split("]");
            this.lyc.push(b[1]);
            //id
            let sum = this.getT(b[0]);
            this.il.push("s" + sum);
          }
          if (res.tlyric.lyric) {
            let ta = res.tlyric.lyric.split("[");
            for (let i in ta) {
              let tb = ta[i].split("]");
              this.tlyc.push(tb[1]);
            }
          }
        }
      });
    },
    getT(b) {
      let m = parseInt(b.split(":")[0]);
      let s = parseInt(b.split(":")[1]);
      let sum = m * 60 + s;
      return sum;
    },
    pColor() {
      let i = "s" + this.currentt;
      let div = document.getElementById(i);
      if (div) {
        if (this.s) {
          let ds = document.getElementById(this.s);
          ds ? (ds.style.color = "black") : "";
        }
        div.style.color = "blue";
        this.s = i;
        let _this = this;
        let scroll = this.$refs.scroll;
        setTimeout(() => {
          scroll.scrollTop = div.offsetTop;
        }, 100);
      }
    },
  },
  watch: {
    id() {
      this.getlyc();
      if (this.s) {
        let ds = document.getElementById(this.s);
        ds ? (ds.style.color = "black") : "";
      }
    },
    currentt() {
      //this.currentTime();
      this.pColor();
    },
  },
};
</script>

<style scoped>
.el-main {
  height: 100%;
  padding: 0.5rem;
  text-align: center;
  overflow: scroll;
}
.el-main > div {
  margin: 0.5rem 0;
}
</style>