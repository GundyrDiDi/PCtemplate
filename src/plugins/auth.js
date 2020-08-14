import Vue from 'vue'
import store from '@/store'

const viewmap = {
  首页: 'overview',
  主播: 'hosts',
  主播详情: 'hostDetail',
  机构月榜: 'inst',
  直播商品: 'goods',
  人气直播: 'hotlive',
  我的关注: 'follow'
}

const pipe = [
  text => {
    if (text === '无') {
      return () => true
    }
  },
  text => {
    if (text === true) return
    const match = text.match(/\d+/g)
    if (match) {
      const limit = (Number(match[0]) + 1) * 24 * 3600 * 1000
      return time => {
        time = time[0]
        if (typeof time === 'string') {
          time = new Date(time)
        }
        return Date.now() - Date.parse(time) > limit
      }
    }
  },
  (text, reg) => {
    if (text === true) return
    const tabs = Object.keys(reg.groups)
    return tab => {
      return tabs.includes(tab)
    }
  }
]
const valid = [
  function (fn) {
    return function () {
      if (fn()) {
        return this.$block()
      }
    }
  },
  function (fn) {
    return function (newval, oldval, prop) {
      if (fn(newval)) {
        this[prop] = oldval
        return this.$block().then(res => {
          this[prop] = JSON.parse(JSON.stringify(oldval))
        })
      }
    }
  },
  function (fn) {
    return function (newval, oldval, prop) {
      if (fn(newval)) {
        requestAnimationFrame(() => {
          this[prop] = oldval
        })
        return this.$block()
      }
    }
  }
]
function validmap (acc, { test, text }) {
  const reg = [
    {
      type: 'time',
      reg: /(自由选择时间段)|(主播趋势)/,
      pipe: pipe[1],
      valid: valid[2]
    },
    {
      type: 'time2',
      reg: /直播记录/,
      pipe: pipe[1],
      valid: valid[2]
    },
    {
      type: 'filter',
      reg: /高级筛选/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'filter2',
      reg: /筛选/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'sort',
      reg: /排序/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'change',
      reg: /(切换时间维度)/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'search',
      reg: /搜索/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'columnEvent',
      reg: /(查看机构主播)/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'columnEvent2',
      reg: /(查看(商品|店铺)明细)|(关联(主播|直播|商品)洞察)/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'lock',
      reg: /AAAAAA/,
      pipe: pipe[0],
      valid: valid[0]
    },
    {
      type: 'tabs',
      // .config/charts/hostvalue
      reg: /(?<uvpv>观看UV\/观看PV)|(?<favonum>评论数趋势)|(?<commentnum>点赞数趋势)|(?<moneyamount>销售数据趋势)/,
      pipe: pipe[2],
      valid: valid[2]
    },
    {
      type: 'hide',
      // store/host.js/hostDisplay
      reg: /(?<fans>粉丝画像)|(?<good>商品分析)/,
      pipe: pipe[2],
      valid: function (fn) {
        return function (name) {
          if (fn(name)) {
            return {
              hide: true,
              component: () => import('./auth.vue')
            }
          }
        }
      }
    }
  ]
  reg.some(v => {
    if (v.reg.test(test)) {
      const fn = v.pipe(text, test.match(v.reg))
      if (fn) {
        acc[v.type] = v.valid(fn)
      }
      return true
    }
  })
  return acc
}
const {
  auths,
  User: { level }
} = store.state.user
const myauth = auths.reduce((acc, view) => {
  acc[viewmap[view.label]] = view.children.reduce((acc, v) => {
    return validmap(acc, {
      test: v.label,
      text: v.level[level].text
    })
  }, {})
  return acc
}, {})
console.log(myauth)
store.commit('user/myauth', myauth)

//
Vue.prototype.$block = function () {
  // return this.$confirm('该功能为标准版以上会员使用，点击了解套餐详情', '提示', {
  //   confirmButtonText: '升级会员',
  //   confirmButtonClass: 'block-btn',
  //   cancelButtonText: '我知道了',
  //   cancelButtonClass: 'block-btn',
  //   type: 'warning'
  // })
  //   .then(() => {
  //     this.$router.push({ name: 'vip' })
  //   })
  //   .catch(() => {})
  return this.$Message.warning({
    render: h => {
      return h('div', [
        '该功能为',
        h('a', '标准版'),
        '以上会员使用，',
        h(
          'a',
          {
            on: {
              click () {
                console.log(this)
              }
            }
          },
          '点击了解套餐详情'
        )
      ])
    },
    duration: 3
  })
}
