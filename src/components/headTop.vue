<template>
  <el-header>
    <el-row class="head-top">
      <el-col :span="3">
        <i class="el-icon-user-solid" @click="isShow()"></i>
      </el-col>

      <el-drawer :visible.sync="show" direction="ltr" size="80%">
        <meDrawer />
      </el-drawer>

      <el-col :span="18" class="find" @click.native="isI()">
        <div>
          <input type="text" v-model="input"  @keyup.enter="submit()"/>
          <span v-show="ishow">
            <i class="el-icon-search"></i>请输入
          </span>
        </div>
      </el-col>
      <el-col :span="3">
        <!-- <i class="el-icon-s-fold"></i> -->
        <el-dropdown trigger="click" @click.native="clearsearch()">
            <i class="el-icon-s-fold"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="routerLink('index')">首页</el-dropdown-item>
            <el-dropdown-item>分类</el-dropdown-item>
            <el-dropdown-item>视频</el-dropdown-item>
            <el-dropdown-item>排行榜</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import meDrawer from "./meDrawer";



export default {
  data() {
    return {
      input: "",
      show: false,
      loading: false,
      timer: null,
      ishow: true,
    };
  },
  components: {
    meDrawer,
  },
  methods: {
    isShow() {
      this.show = !this.show;
    },
    routerLink(path){
      this.$router.push({
        path: `/${path}`
      })
    },
    isI(){
      this.ishow = false
    },
    //回车
    submit(){
      this.$router.push({
        path: '/search',
        query:{
          input: this.input
        }
      })
    },
    clearsearch(){
      this.input = ""
      this.ishow = true
    }
  },
};
</script>

<style scoped>
.el-header {
  color: #fff;
  padding: 1rem 0.5rem;
  text-align: center;
}
i {
  font-size: 2rem;
  line-height: 1.5rem;
}
.find > div {
  position: relative;
}
.find input {
  background: rgba(255, 255, 255, 0.3);
  border: 1px;
  height: 1.5rem;
  width: 80%;
  border-radius: 0.5rem;
  padding: 0 .5rem;
}
.find i {
  font-size: 1rem;
}

.find span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-50%);
  line-height: 1.5rem;
}
.el-dropdown{
  color: #fff;
}
</style>