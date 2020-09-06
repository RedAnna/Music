import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/index'),
    // redirect：重定向
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('views/playlist/playlist')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('components/play/play')
  },
  //search
  {
    path: '/search',
    name: 'search',
    component: () => import('views/search/search')
  }
  // {
  //   path: '/playTab',
  //   name:'playTab',
  //   component: ()=> import('components/playTab'),
  //   children:[
  //    {
  //      path:'/play',
  //      name: 'play',
  //      component: ()=>import('components/play/play')
  //    }

  //   ]
  // }
]

//路由不能跳转自身，会冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
