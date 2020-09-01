'use strict'

import Vue from 'vue'
import axios from 'axios'
import api from '@/api'
import store from '@/store'
// import { wait } from '@/plugins/util'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl || api.baseURL,
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
    const { method, url } = config
    let data = api[method]._params
    data = data ? data() : {}
    let _url = ''
    url.split('/').reduce((acc, v) => {
      if (typeof acc[v]._params === 'function') {
        data = { ...data, ...acc[v]._params() }
      } else if (typeof acc[v]._params === 'object') {
        data = acc[v]._params
      }
      if (acc[v].url) {
        _url = acc[v].url
      }
      return acc[v]
    }, api[method])
    config[method === 'post' ? 'data' : 'params'] = {
      ...data,
      ...(method === 'post' ? config.data : config.params)
    }
    config.url = _url
    // auth
    config.headers.openid = store.state.user.openid
    config.headers.userToken = 321321
    config.headers.queryType = store.state.user.queryType
    config.headers.vipLevel = store.state.user.User.level + 1
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
    store.commit('user/queryType', '')
    const { data } = response
    if (data.code === 200) {
      return data.obj
    }
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
