export default {
  namespaced: true,
  state: {
    history: [],
    limit: 10
  },
  getters: {},
  mutations: {
    push ({ history, limit }, route) {
      history.push(route)
      if (history.length > limit) {
        history.shift()
      }
    }
  },
  actions: {}
}
