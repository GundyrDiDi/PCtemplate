import { formatDate } from '@/plugins/util.js'
export default {
  namespaced: true,
  state: {
    openid: '',
    User: {
      cellPhone: '',
      name: '',
      headimg: '',
      expire: '',
      openid: '',
      level: -99,
      auth: '',
      club: ''
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
      return Axios.get('user/followlist', {
        size: 300,
        page: 0
      }).then(res => {
        store.commit(
          'followlist',
          res.content.filter(v => v.follow)
        )
        return !!store.state.followlist.length
      })
    },
    _pushnotice ({ state }, param) {
      console.log(param)
      state.isnotice = !!param.status
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
        console.log(res)
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
          level[v.members_level] = {
            text: v.is_enble === 'hook' ? true : v.is_enble
          }
        })
        catalog.forEach(v => {
          v.collapse = false
        })
        store.commit('auths', catalog)
      })
    },
    _setUser ({ state, dispatch }, { openid, fromqrcode, ...user }) {
      state.User = {
        id: user.id,
        cellPhone: user.cellPhone,
        name: user.nickname,
        headimg: user.headimgurl,
        expire: user.validityTime
          ? formatDate(new Date(user.validityTime), 'yyyy-MM-dd')
          : '永久',
        openid: openid,
        // level: 1,
        level: user.openid === 'on1aixB0HG-N-3faek_fBs_fsfrg' ? 3 : user.vipLevel,
        auth: ['免费版', '标准版', '高级版'][user.vipLevel - 1],
        club: ['免费会员', '标准会员', '高级会员'][user.vipLevel - 1],
        province: user.province,
        sex: user.sex,
        userToken: user.userToken,
        payrecord: 0
      }
      if (fromqrcode) {
        dispatch('saveLocal', openid)
      }
    },
    saveLocal ({ state }, openid) {
      localStorage.jc_expire = Date.now() + 1000 * 12 * 3600
      localStorage.jc_openid = state.openid = openid
    },
    getLocal ({ state, dispatch }) {
      if (localStorage.jc_expire > Date.now()) {
        state.openid = localStorage.jc_openid
        return Axios.get('user/getUserbyopenid', {
          openid: state.openid
        }).then(res => {
          dispatch('_setUser', res)
        })
      } else {
        return dispatch('_logout')
      }
    },
    _logout ({ state }) {
      state.openid = localStorage.jc_openid = ''
      localStorage.jc_expire = ''
    }
  }
}
