<template>
  <div class="index">
    <banner />
    <findIndex />
    <selectIndex />
  </div>
</template>

<script>
import findIndex from "views/index/findIndex"
import selectIndex from "views/index/selectIndex"
import banner from "views/index/banner"

export default {
  components:{
    findIndex,
    selectIndex,
    banner,
  }
};
</script>

<style scoped>
.index {
  font-size: 1rem;
  padding: 0 1rem;
}

</style>