'use strict'
const path = require('path')
const idcMain = require('./src/idc-sdk/idc.main.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // 端口

module.exports={
    
}