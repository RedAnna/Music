<template>
  <div class="progress-bar">
    <span>{{this.curT}}</span>
    <div class="progress" ref="progress">
      <div ref="pro">
        <i @touchmove="dragM" ref="dot"></i>
      </div>
    </div>
    <span>{{this.t}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: 0, //歌曲当前播放时间
      curT: "00:00",
      t: "00:00",
      pgw: 0, //进度条总长
      currentpgw: 0, //当前进度条长
      timer: null, //计时器
      total: 0, //时间
      time: 0,
      isOk: false, //是否播放完 下一首
    };
  },
  props: {
    id: 0,
    audio: "",
    flag: false,
  },
  methods: {
    //音频是否加载好//容器是否加载好
    getDuration() {
      if (this.audio && this.audio.duration) {
        this.time = this.audio.duration;
        return;
      } else {
        let _this = this;
        setTimeout(() => {
          _this.getDuration();
        }, 0);
      }
    },
    //进度条  开启计时器
    progressPlay() {
      this.getDuration();

      let s = parseInt(this.time % 60);
      if (s < 10) {
        s = "0" + s;
      }
      let m = parseInt(this.time / 60);
      if (m < 10) {
        m = "0" + m;
      }
      this.t = m + ":" + s;

      //进度条
      let dot = this.$refs.dot;
      let progress = this.$refs.progress;
      let pro = this.$refs.pro;

      //进度条总长
      this.pgw = progress.offsetWidth;

      //当前进度条位置
      //圆点位置
      let n = (this.currentTime / this.time) * this.pgw;
      pro.style.width = n + "px";
      dot.style.marginLeft = n + "px";

      let _this = this;
      let ttt = setTimeout(function () {
        _this.currentTime = _this.audio.currentTime;
      }, 1000);

      this.$emit("currenT", parseInt(this.currentTime));
    },
    dragM(e) {
      let dot = this.$refs.dot;
      let progress = this.$refs.progress;
      let pro = this.$refs.pro;

      //点击位置
      let x = e.targetTouches[0].clientX;
      let a = x - progress.offsetLeft - dot.offsetWidth / 2;
      if (a <= 0) {
        a = 0;
      } else if (a >= parseFloat(progress.offsetWidth)) {
        a = parseFloat(progress.offsetWidth) - dot.offsetWidth / 2;
      }

      dot.style.marginLeft = a + "px";
      pro.style.width = a + "px";

      //音乐播放时间
      let t = (parseFloat(dot.style.marginLeft) / this.pgw) * this.time;
      this.audio.currentTime = t;
    },
    gettime() {
      let s = parseInt(this.currentTime % 60);
      if (s < 10) {
        s = "0" + s;
      }
      let m = parseInt(this.currentTime / 60);
      if (m < 10) {
        m = "0" + m;
      }
      this.curT = m + ":" + s;
    },
  },
  watch: {
    id() {
      this.currentTime = this.audio.currentTime;
      this.progressPlay();
    },
    //监听当前时间变化，改变进度条
    currentTime() {
      if (this.currentTime >= this.audio.duration) {
        let dot = this.$refs.dot;
        let pro = this.$refs.pro;
        pro.style.width = 0 + "px";
        dot.style.marginLeft = 0 + "px";
        this.curT ="00:00"
        this.isOk = true;
        let ok = this.isOk;
        this.$emit("isok", ok);
      } else {
        this.gettime();
        this.progressPlay();
      }
    },

    flag() {
      this.progressPlay();
    },
  },
};
</script>

<style scoped>
.progress-bar {
  width: 92%;
  margin: 1rem auto;
  position: relative;
  display: flex;
  align-items: center;
}

.progress-bar span {
  width: 15%;
}
.progress-bar span:last-child {
  text-align: right;
}
.progress-bar > div {
  width: 70%;
  height: 8px;
  display: block;
  background-color: #fff;
  border-radius: 4px;
  margin: 0 auto;
}
.progress-bar div > div {
  width: 0;
  height: 100%;
  background-color: #1296db;
  border-radius: 4px;
  position: relative;
}
.progress-bar div > div i {
  position: relative;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 12px;
  height: 12px;
  background-color: #1296db;
  border-radius: 50%;
}
</style>