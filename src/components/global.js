import Vue from 'vue'

const requireComponent = require.context(
  '.',
  false,
  /\.vue$/
  // 找到components文件夹下以.vue命名的文件
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})
