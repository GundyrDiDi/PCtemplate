import { MAP } from '@/.config.js'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
export default {
  namespaced: true,
  state: {
    hostId: '',
    hostName: '',
    map: {
      anchorName: 'name',
      anchorType: {
        key: 'type',
        pipe: v => MAP.hosttype[v]
      },
      anchorRank: {
        key: 'level',
        pipe: v => MAP.hostlevel[v]
      },
      anchorImg: {
        key: 'img',
        pipe: v => 'http:' + v
      },
      anchorArea: 'district',
      mechanismName: 'ins',
      skilledField: 'goodat',
      fansNum: {
        key: 'fansnum',
        pipe: v => formatNumber(addNumberUnit(v))
      },
      favorNum: {
        key: 'favonum',
        pipe: v => formatNumber(addNumberUnit(v))
      }
    },
    hostDisplay: [
      {
        name: 'brief',
        label: '主播简介',
        api: 'host/brief',
        component: () => import('@/views/Home/components/host/brief.vue')
      },
      {
        name: 'value',
        label: '主播数据',
        component: () => import('@/views/Home/components/host/value.vue')
      },
      {
        name: 'record',
        label: '直播记录',
        component: () => import('@/views/Home/components/host/record.vue')
      },
      {
        name: 'fans',
        label: '粉丝画像',
        component: () => import('@/views/Home/components/host/fans.vue')
      },
      {
        name: 'good',
        label: '商品分析',
        component: () => import('@/views/Home/components/host/good.vue')
      }
    ],
    hostsbackup: []
  },
  getters: {},
  mutations: {},
  actions: {
    _search (store, param) {
      return Axios.get('host/search', param).then(res => {
        store.commit('hostsbackup', res.data)
      })
    },
    _getdetail ({ state }, { api, param }) {
      return Axios.get(api, param)
    },
    _maphost ({ state }, res) {
      const { map } = state
      for (const k in res) {
        const v = res[k]
        if (k in map) {
          const m = map[k]
          if (typeof m === 'object') {
            res[m.key] = m.pipe(v)
          } else {
            res[m] = v
          }
        } else {
          if (!/id/i.test(k) && /^[0-9.]+$/.test(v)) {
            res[k] = addNumberUnit(v)
          }
        }
      }
      return res
    }
  }
}
