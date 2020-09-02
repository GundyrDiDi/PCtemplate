import config from '@/.config.js'
import { loadimg } from '@/plugins/util'
export default {
  namespaced: true,
  state: {
    logoname: config.name,
    enterdescription: config.description,
    enternavs: config.enternavs,
    enterinfo: config.info,
    company: config.company,
    imgs: config.imgs,
    liverlist: config.liverlist,
    livedata: config.livedata,
    notify: config.notify,
    treemenu: config.treemenu
  },
  getters: {},
  mutations: {},
  actions: {
    loadimg ({ state }) {
      return Promise.all(
        Object.values(state.imgs).map(v => {
          return loadimg(v)
        })
      )
    }
  }
}
