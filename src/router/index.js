import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home',
    redirect: to => ({ name: 'Home' })
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫
const projectName = require('@/.config.js').name
router.beforeEach((to, from, next) => {
  console.log(to.meta)
  document.title = (to.meta.title ? to.meta.title + '-' : '') + projectName
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
