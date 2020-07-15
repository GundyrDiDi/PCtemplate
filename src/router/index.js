import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from '@/.config.js'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)
const getroutechildren = routes => {
  return routes.map(v => {
    if (v.children) {
      v.children = getroutechildren(config[v.children])
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
// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title ? to.meta.title + '-' : '') + config.name
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
