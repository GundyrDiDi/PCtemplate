import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Vue.prototype.$myalert = function (msg) {
  this.$alert(msg, '提示', {
    confirmButtonText: '确定'
  })
}

// 业务全局
Vue.prototype.$block = function () {
  return this.$confirm('您未拥有该操作的权限！建议您升级会员，体验完整功能。', '提示', {
    confirmButtonText: '升级会员',
    cancelButtonText: '我知道了',
    type: 'warning'
  })
    .then(() => {
      this.$router.push({ name: 'vip' })
    })
    .catch(() => {})
}
