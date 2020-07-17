'use strict'

import Vue from 'vue'
import echarts from 'echarts'
import 'echarts-wordcloud'
const Plugin = {}
Plugin.install = function (Vue, options) {
  const fn = new Proxy(
    function (el, config) {
      return echarts.init(el)
    },
    {
      get (target, key) {
        return echarts[key]
      }
    }
  )
  Vue.prototype.$echarts = fn
  Vue.prototype.$LinearGradient = function () {
    return new echarts.graphic.LinearGradient(arguments)
  }
}

Vue.use(Plugin)

export default Plugin
