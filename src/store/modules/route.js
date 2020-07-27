export default {
  namespaced: true,
  state: {
    history: [],
    _limit: 10
  },
  getters: {},
  mutations: {
    push ({ history, _limit }, route) {
      history.push(route)
      if (history.length > _limit) {
        history.shift()
      }
    }
  },
  actions: {}
}
