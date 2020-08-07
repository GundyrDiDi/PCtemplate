'use strict'
// const path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  // 部署生产环境和开发环境下的URL。
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 打包时不生成.map文件 避免看到源码
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true, // 代理时跳过检查
    host: '0.0.0.0', // 如果是真机测试，就使用这个IP
    port: 8081,
    https: false,
    compress: true, // 配置是否启用 gzip 压缩。boolean 为类型，默认为 false。
    hotOnly: false, // 热更新（webpack已实现了，这里false即可）
    proxy: {
      '/api': {
        target: 'http://10.228.88.46:8000/api',
        secure: false,
        ws: false,
        changeOrigin: true
      }
    }
  }
}
