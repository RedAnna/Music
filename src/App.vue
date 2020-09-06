<template>
  <div id="app">
    <headTop />
    <router-view @iplay="getp"></router-view>
    <playTab :isplay="isp" :id="id" :aid="aid" :isgdd="isgd" :allSong="allId"/>
  </div>
</template>

<script>
import index from "../src/views/index.vue";
import headTop from "components/headTop";
import playTab from "components/playTab";

export default {
  name: "app",
  data(){
    return {
      id: 0,
      isp: false,
      aid: 0,
      isgd: false,
      allId:[],
    }
  },
  components: {
    index,
    headTop,
    playTab,
  },
  methods:{
    getp(data){
      this.id = data.id
      this.isp = data.isplay
      this.aid = data.aid
      this.isgd = data.isgd
      this.allId = data.songsId
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  height: 100vh;
  width: 100vw;
  font-size: 16px;
  background: linear-gradient(to bottom, #5555ff 30%, #55fd55 100%);
}
@media screen and (min-width: 400px) {
  #app {
    height: 100vh;
    width: 100vw;
    font-size: 16px;
    background: linear-gradient(to bottom, #5555ff 30%, #55fd55 100%);
  }
}

.scroll::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.scroll {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
