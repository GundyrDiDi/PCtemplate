import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import './plugins/font-awesome'
import './plugins/countTo.js'
import './plugins/directive'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/animate.css'
import './plugins/iview.js'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
