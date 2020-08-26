export default {
  namespaced: true,
  state: {
    openid: '123',
    User: {
      name: 'CHENFAN',
      expire: '永久',
      auth: '免费版',
      club: '免费会员',
      level: 0,
      payrecord: 0
    },
    followlist: [],
    isnotice: true,
    auths: null,
    myauth: {},
    queryType: ''
  },
  mutations: {},
  actions: {
    _search (store, param) {
      return Axios.get('user/search', {
        anchorName: param
      }).then(res => {
        return res.obj
      })
    },
    _getfollowlist (store) {
      return Axios.post('user/followlist').then(res => {
        store.commit(
          'followlist',
          res.obj.content.filter(v => v.follow)
        )
        return !!store.state.followlist.length
      })
    },
    _pushnotice (store, param) {
      return Axios.post('user/isnotice', param)
    },
    _followornot (store, { host, vm }) {
      const status = store.state.isnotice ? 1 : 0
      if (host.follow) {
        return vm
          .$confirm(`不再关注 ${host.anchorName} ?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            host.follow = 0
            return Axios.post('user/notfollow', host).then(res => {
              return { ...res, not: true }
            })
          })
          .catch(() => ({}))
      } else {
        return Axios.post('user/followme', { ...host, status }).then(res => {
          host.follow = 1
          return res
        })
      }
    },
    // 进入路由前获取权限保存
    getauths (store, param) {
      return Axios.get('user/auths').then(res => {
        const catalog = []
        res.obj.forEach(v => {
          const obj =
            catalog.find(v2 => v2.label === v.power) ||
            (catalog[catalog.length] = {
              label: v.power,
              children: []
            })
          const children = obj.children
          const child =
            children.find(v2 => v2.label === v.field) ||
            (children[children.length] = {
              name: '',
              label: v.field,
              level: [],
              des: v.describe
            })
          const level = child.level
          level[v.members_level - 1] = {
            text: v.is_enble === 'hook' ? true : v.is_enble
          }
        })
        catalog.forEach(v => {
          v.collapse = false
        })
        store.commit('auths', catalog)
      })
    },
    _getUser (store, param) {}
  }
}
