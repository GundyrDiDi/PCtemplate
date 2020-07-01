import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const root = {
  // everyStore中命名modules
  name: '',
  state: {
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: []
}
const modules = everyStore(root)
// 每一个module里的state数据通过mutations改变
modules.forEach(bindMutations)

const store = new Vuex.Store(root)
const _registerModule = store.registerModule
store.registerModule = function (module) {
  bindMutations(module)
  const name = module.name
  _registerModule.call(this, name.split('_'), module)
  Vue.mixin(mapVuex([module]))
}
export default store

Vue.mixin(mapVuex(modules))

// util
function everyStore (root) {
  const stores = [root]
  let i = 0
  while (i < stores.length) {
    const s = stores[i]
    if (s.modules) {
      Object.entries(s.modules).forEach(([prop, store]) => {
        store.name = s === root ? prop : `${s.name}_${prop}`
        stores.push(store)
      })
    }
    i++
  }
  return stores
}

function mapVuex (modules) {
  const map = {
    computed: ['state', 'getters'],
    methods: ['mutations', 'actions']
  }
  const vuexData = {
    computed: {},
    methods: {}
  }
  modules.forEach(module => {
    Object.entries(map).forEach(([prop, arr]) => {
      arr.forEach(str => {
        if (module[str]) {
          vuexData[prop] = {
            ...mapkeys(str, module),
            ...vuexData[prop]
          }
        }
      })
    })
  })
  return vuexData
}

function mapkeys (str, module = root) {
  if (!module[str]) return {}
  let fn = Vuex['map' + str.slice(0, 1).toUpperCase() + str.slice(1)]
  let keys = Object.keys(module[str])
  if (module.name) {
    fn = fn.bind(Vuex, module.name.replace('_', '/'))
  }
  if (str === 'mutations' || str === 'actions') {
    keys = keys.reduce((acc, key) => {
      // 只有_开头才是传递到组件中使用的方法
      if (key.includes('_')) {
        acc[module.name + key] = key
      }
      return acc
    }, {})
  }
  return fn.call(Vuex, keys)
}

function bindMutations (module) {
  module.mutations = {
    ...module.mutations,
    ...new Proxy(module.state, {
      get (target, propKey) {
        return (state, payload) => {
          state[propKey] = payload
        }
      },
      // 过滤 前缀_表示内部数据
      ownKeys (target) {
        return Object.keys(target).filter(key => key[0] !== '_')
      }
    })
  }
}
