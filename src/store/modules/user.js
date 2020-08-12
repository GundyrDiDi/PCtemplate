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
    componentmap: {
      首页: 'overview',
      主播: 'hosts',
      主播详情: 'hostDetail',
      机构月榜: 'inst',
      直播商品: 'goods',
      人气直播: 'hotlive',
      我的关注: 'follow'
    },
    ablemap ({ test, text }) {
      const reg = [
        {
          reg: /((自由)?选择时间(段)?)|(时间维度)/,
          pipe (text) {
            const match = text.match(/\d+/g)
            if (match) {
              const limit = (Number(match[0]) + 1) * 24 * 3600 * 1000
              return time => {
                if (typeof time === 'string') {
                  time = new Date(time)
                }
                return Date.now() - Date.parse(time) > limit
              }
            }
          }
        }
      ]
      let valid
      reg.some(v => {
        if (v.reg.test(test)) {
          valid = v.pipe(text)
          return true
        }
      })
      return valid
    }
  },
  getters: {
    myauth ({ auths, User, ablemap }) {
      return auths
        ? auths.reduce((acc, v) => {
          acc[v.name] = v.children.map(v2 => {
            return {
              label: v2.label,
              valid: ablemap({
                test: v2.label,
                text: v2.level[User.level].text
              })
            }
          })
          return acc
        }, {})
        : {}
    }
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
    // home加载时获取保存
    getauths (store, param) {
      return Axios.get('user/auths').then(res => {
        const catalog = []
        res.obj.forEach(v => {
          const obj =
            catalog.find(v2 => v2.label === v.power) ||
            (catalog[catalog.length] = {
              name: store.state.componentmap[v.power],
              label: v.power,
              children: []
            })
          const children = obj.children
          const child =
            children.find(v2 => v2.label === v.field) ||
            (children[children.length] = {
              name: '',
              label: v.field,
              level: []
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
        // bad
        requestAnimationFrame(() => {
          store.rootGetters.emitqueue()
        })
      })
    },
    _getUser (store, param) {}
  }
}
