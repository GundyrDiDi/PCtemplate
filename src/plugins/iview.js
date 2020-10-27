import Vue from 'vue'
import ViewUI from 'view-design'

import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

Vue.prototype.$Message.config({
  top: 10,
  duration: 2
})
Vue.prototype.msgLoading = function (msg, duration = 0) {
  this.$Message.loading({
    content: msg || '正在加载...',
    duration
  })
}
Vue.prototype.msgSuccess = function (msg, duration = 2) {
  this.$Message.success({
    content: msg || '操作成功 ！',
    duration
  })
}
Vue.prototype.msgFail = function (msg, duration = 2) {
  this.$Message.warning({
    content: msg || '操作失败 ！',
    duration
  })
}
Vue.prototype.msgDestroy = function () {
  this.$Message.destroy()
}
