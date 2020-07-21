'use strict'

import Vue from 'vue'
import axios from 'axios'
import api from '@/api'
import { wait } from '@/plugins/util'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl || '',
  timeout: 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

const _getter = _axios.get
_axios.get = function (url, params) {
  return _getter(
    url,
    params
      ? {
        params
      }
      : undefined
  )
}
_axios.interceptors.request.use(
  async function (config) {
    // 生产环境删除
    await wait(500)
    const { method, url } = config
    let data = {}
    const last = [method, ...url.split('/')].reduce((acc, v) => {
      if (acc._params) {
        data = { ...data, ...acc._params }
      }
      return acc[v]
    }, api)
    config[method === 'post' ? 'data' : 'params'] = {
      ...data,
      ...last._params,
      ...(method === 'post' ? config.data : config.params)
    }
    config.url = last.url
    console.log(config)
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.Axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
