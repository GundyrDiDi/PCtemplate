export default {
  namespaced: true,
  state: {
    actHost: {
      name: '谢广坤',
      goodat: '美妆',
      ins: '美腕',
      district: '中国',
      type: '美妆',
      level: 'Lv1',
      fansnum: '2800万',
      favonum: '2800万'
    },
    hostDisplay: [
      {
        name: 'brief',
        label: '主播简介',
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
    }
  }
}
