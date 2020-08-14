import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/.config.js'
import store from '@/store'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)
const getroutechildren = routes => {
  return routes.map(v => {
    if (v.children) {
      v.children = getroutechildren(
        typeof v.children === 'string' ? config[v.children] : v.children
      )
    }
    if (typeof v.beforeEnter === 'function') {
      v.beforeEnter = v.beforeEnter.bind(store)
    }
    return v
  })
}
const routes = getroutechildren(config.routes)

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
let init = true
// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit('myroute/push', to)
  NProgress.start()
  if (init) {
    Promise.all([
      store.dispatch('user/getauths').then(() => {
        ;(() => import('@/plugins/auth'))()
      }),
      store.dispatch('variable/loadimg')
    ]).then(res => {
      init = false
      next()
    })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
  requestAnimationFrame(() => {
    document.title = (to.meta.title ? to.meta.title + '-' : '') + config.name
  })
})

export default router
