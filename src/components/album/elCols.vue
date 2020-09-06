<template>
  <el-col :span="5"  @click.native="routePlaylist()">
    <div class="grid-content">
      <div >
        <slot name="img" />
      </div>
      <slot name="title" />
    </div>
  </el-col>
</template>

<script>
export default {
  props:{
    id: 0,
    gd: true
  },
  methods:{
    routePlaylist(){
      this.$router.push({
        path: '/playlist',
        query:{
          id: this.id,
          isGedan: this.gd
        }
      }).catch(err => {err})
    }
  }
};
</script>

<style scoped>
.grid-content {
  font-size: 0.5rem;
  position: relative;
}
.grid-content div {
  width: 10vh;
  height: 10vh;
  border-radius: 0.5rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}
</style>