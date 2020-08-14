import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Vue.prototype.$myalert = function (msg) {
  this.$alert(msg, '提示', {
    confirmButtonText: '确定'
  })
}
