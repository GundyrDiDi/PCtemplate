import config from '@/.config.js'
export default {
  namespaced: true,
  state: {
    ...config.forms
  },
  getters: {},
  mutations: {},
  actions: {
    _getdata (store, v) {
      return Axios.get(v.api)
    },
    _getrange (store) {
      return Promise.all([
        Axios.get('forms/range').then(res => {
          const o = {}
          for (const k in res) {
            if (k.startsWith('large_')) {
              const name = k.slice(6)
              o[name] = {
                name,
                max: res[k],
                min: 0
              }
            }
          }
          return o
        }),
        Axios.get('forms/options').then(res => {
          console.log(res)
          for (const k in res) {
            res[k] = Object.entries(res[k]).map(([k, v]) => {
              return { label: v, value: k }
            })
          }
          return res
        })
      ]).then(res => {
        return res.reduce((acc, v) => {
          return { ...acc, ...v }
        }, {})
      })
    },
    _getrelative (store) {
      return Promise.resolve({
        small_anchorsCnt: 0,
        large_anchorsCnt: 300,
        small_liveCnt: 0,
        large_liveCnt: 300
      }).then(res => {
        const o = {}
        for (const k in res) {
          if (k.startsWith('large_')) {
            const name = k.slice(6)
            o[name] = {
              name,
              max: res[k],
              min: 0
            }
          }
        }
        return o
      })
    },
    _getbrand (store, brandName) {
      return Axios.get('forms/brands', {
        brandName,
        num: 20
      }).then(res => {
        return res.filter(v => !/other/.test(v)).map(v => ({ name: v }))
      })
    },
    _gethotfilter (store) {
      return Axios.get('forms/hotfilter').then(res => {
        console.log(res)
        const o = {}
        for (const k in res) {
          if (k.startsWith('large_')) {
            const name = k.slice(6)
            o[name] = {
              name,
              max: res[k],
              min: 0
            }
          }
        }
        return o
      })
    }
  }
}
