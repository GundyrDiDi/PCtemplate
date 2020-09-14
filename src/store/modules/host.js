import { MAP } from '@/.config.js'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
export default {
  namespaced: true,
  state: {
    hostId: '',
    actHost: {},
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
      },
      premiereInfoDto: {
        key: 'follow',
        pipe: v => !!v.follow
      }
    },
    hostDisplay: [
      {
        index: 0,
        name: 'brief',
        label: '主播简介',
        component: () => import('@/views/Home/components/host/brief.vue')
      },
      {
        index: 1,
        name: 'value',
        label: '主播数据',
        component: () => import('@/views/Home/components/host/value.vue')
      },
      {
        index: 2,
        name: 'record',
        label: '直播记录',
        component: () => import('@/views/Home/components/host/record.vue')
      },
      {
        index: 3,
        name: 'fans',
        label: '粉丝画像',
        component: () => import('@/views/Home/components/host/fans.vue')
      },
      {
        index: 4,
        name: 'good',
        label: '商品分析',
        component: () => import('@/views/Home/components/host/good.vue')
      }
    ],
    hostsbackup: []
  },
  getters: {},
  mutations: {
    reset ({ hostDisplay }) {
      hostDisplay.forEach(v => {
        v.error = false
      })
    }
  },
  actions: {
    // 绑定在hostDeital组件的路由事件
    setacthost (store, { param } = {}) {
      return Axios.get('host/brief', param).then(res => {
        console.log(res)
        return store.dispatch('_maphost', res.content[0]).then(res => {
          store.commit('actHost', res)
          return res.name
        })
      })
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
