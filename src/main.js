import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import './plugins/font-awesome'
import './plugins/countTo.js'
import 'normalize.css'
import 'animate.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
