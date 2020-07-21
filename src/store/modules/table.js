import config from '@/.config.js'
export default {
  namespaced: true,
  state: {
    ...config.tables
  },
  getters: {},
  mutations: {},
  actions: {
    _getdata (store, v) {
      return Axios.get(v.api)
    }
  }
}
