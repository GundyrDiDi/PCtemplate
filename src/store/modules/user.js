import config from '@/.config.js'
export default {
  namespaced: true,
  state: {
    User: config.user,
    followlist: []
  },
  getters: {},
  mutations: {},
  actions: {
    _getfollowlist (store) {
      return Axios.get('user/followlist').then(res => {
        store.commit('followlist', res)
      })
    },
    _notfollow (store) {
      Axios.get('user/notfollow')
    }
  }
}
