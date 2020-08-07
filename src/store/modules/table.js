import config, { MAP } from '@/.config.js'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
export default {
  namespaced: true,
  state: {
    ...config.tables
  },
  getters: {},
  mutations: {},
  actions: {
    _getdata (store, { api, page, size, sort, condition }) {
      return Axios.get(api, {
        page: page - 1,
        size,
        sort,
        ...Object.entries(condition).reduce((acc, [k, v]) => {
          if (typeof v === 'object' && v !== null) {
            if (v.type === 'range') {
              acc['small_' + k] = v.value[0] * v.base
              acc['large_' + k] = v.value[1] * v.base
            } else if (v.type === 'select') {
              acc[k] = Array.isArray(v.value) ? v.value.join() : v.value
            }
          } else if (v) {
            acc[k] = v.toString().replace(/[-/]/g, '')
          }
          return acc
        }, {})
      }).then(res => {
        console.log(res)
        res.content.forEach(v => {
          Object.entries(v).forEach(([k, v2]) => {
            if (!/id/i.test(k) && /^[0-9.]+$/.test(v2)) {
              v[k] = formatNumber(addNumberUnit(v2))
            }
            if (k === 'anchorType') {
              v[k] = MAP.hosttype[v2]
            }
            if (k === 'anchorId') {
              v.id = v2
            }
            if (k in MAP) {
              const m = MAP[k]
              if (typeof m === 'object') {
                v[m.key] = m.pipe(v[k])
              } else {
                v[m] = v[k]
              }
            }
          })
        })
        return {
          data: res.content,
          total: res.totalElements
        }
      })
    }
  }
}
