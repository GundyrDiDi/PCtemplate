import config from '@/.config.js'
export default {
  namespaced: true,
  state: {
    logoname: config.name,
    description: config.description,
    enternavs: config.enternavs,
    enterinfo: config.info
  },
  getters: {},
  mutations: {},
  actions: {}
}
