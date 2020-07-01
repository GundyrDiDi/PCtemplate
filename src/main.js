import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './plugins/element.js'
import 'normalize.css'
import 'animate.css'
import './plugins/font-awesome'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
