export default {
  namespaced: true,
  state: {
    openid: '',
    User: {
      name: 'CHENFAN',
      expire: '永久',
      auth: '免费版',
      club: '免费会员',
      level: 2,
      payrecord: 0
    },
    followlist: [],
    isnotice: true,
    auths: null,
    myauth: {},
    queryType: '',
    newdate: Date.now()
  },
  mutations: {},
  actions: {
    _search (store, param) {
      return Axios.get('user/search', {
        anchorName: param
      }).then(res => {
        return res
      })
    },
    _getfollowlist (store) {
      return Axios.post('user/followlist').then(res => {
        store.commit(
          'followlist',
          res.content.filter(v => v.follow)
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
        return (
          vm
            .$confirm(`不再关注 ${host.anchorName} ?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              return Axios.post('user/notfollow', { ...host, follow: 0 }).then(
                res => {
                  return { msg: res, not: true }
                }
              )
            })
            // 按取消按钮返回{}
            .catch(() => ({}))
        )
      } else {
        if (host.anchorId) {
          return Axios.post('user/followme', {
            ...host,
            status,
            follow: 1
          }).then(res => {
            console.log(res)
            if (typeof res === 'string') {
              return { msg: res }
            }
            return { msg: '关注成功', id: res.id }
          })
        }
      }
    },
    // 进入路由前获取权限保存，最新数据日期
    getnewdate ({ state }) {
      Axios.get('user/newdate').then(res => {
        state.newdate = Date.parse(res)
      })
    },
    getauths (store, param) {
      return Axios.get('user/auths').then(res => {
        const catalog = []
        res.forEach(v => {
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
    _setUser ({ state }, { openid, ...param }) {
      state.openid = openid
      state.User = param
    },
    _logout ({ state }) {
      state.openid = ''
    }
  }
}
