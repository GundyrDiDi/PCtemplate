export default {
  namespaced: true,
  state: {
    history: [],
    limit: 10
  },
  getters: {},
  mutations: {
    push ({ history, limit }, route) {
      console.log(route)
      history.push(route)
      if (history.length > limit) {
        history.shift()
      }
      console.log(history)
    }
  },
  actions: {}
}
