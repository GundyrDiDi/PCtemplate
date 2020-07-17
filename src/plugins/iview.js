import Vue from 'vue'
import ViewUI from 'view-design'

import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

Vue.prototype.$Message.config({
  top: 570,
  duration: 3
})
Vue.prototype.msgLoading = function (msg, duration = 0) {
  this.$Message.loading({
    content: msg || '正在加载...',
    duration
  })
}
Vue.prototype.msgDestroy = function () {
  this.$Message.destroy()
}
