export default {
  user: {
    name: 'CHENFAN',
    expire: '永久',
    auth: '免费版'
  },
  tour: {},
  name: '鲸宸数据',
  description: '淘宝主播商家、主播、MCN优选的淘宝直播AI数据平台',
  company: {
    email: 'bd@jingchendata.com',
    tel: 'XXXXXXXXXXXXX',
    addr: '浙江省杭州市滨江区秋溢路606号2号楼402室',
    name: '杭州瀚斯科技有限公司',
    icp: '浙ICP备19017467号',
    gip: '浙公网安备 33010602010329号'
  },
  keywords: [],
  info: [
    {
      title: '大盘数据  一目了然',
      msg:
        '为用户提供简洁明了的大盘数据，可视化展现，支持数据下钻，帮助用户探寻数字背后的真相',
      tab: {
        component: 'multi-box',
        props: {
          inset: [
            {
              component: 'main-chart',
              link: '',
              chartData: 'map-liver-area',
              title: '直播间地区分布'
            },
            {
              component: 'main-chart',
              link: '',
              chartData: 'lineBar-people-total',
              title: '淘宝直播大盘分析',
              suffix: '一对一专业数据分析'
            },
            {
              component: 'main-chart',
              link: '',
              chartData: 'rose-liver-level',
              title: '主播等级分布',
              suffix: '快速了解全网主播概况'
            }
          ]
        }
      }
    },
    {
      title: '主播实力<br/>一览无余',
      msg: '日常监控主播直播数<br/>对主播实力进行全面分析',
      tab: {
        component: 'main-list'
      },
      button: { name: '查看更多', link: '' }
    },
    {
      title: '热门直播<br/>尽收眼底',
      msg:
        '每日罗列带货优秀的直播间及相关数据，帮助商家感知主播的实力，探寻与主播的合作机会',
      tab: {
        component: 'main-cards'
      },
      button: { name: '查看更多', link: '' }
    }
  ],
  notify: {
    msg: '点击关注服务号，可接收更多资源哦！'
  },
  imgs: {
    logo: require('@/assets/img/logo.png'),
    jingchen: require('@/assets/img/jingchen.png'),
    email: require('@/assets/img/email.png'),
    tel: require('@/assets/img/tel.png'),
    addr: require('@/assets/img/addr.png'),
    bubble1: require('@/assets/img/bubble1.png'),
    bubble2: require('@/assets/img/bubble2.png'),
    bubble3: require('@/assets/img/bubble3.png'),
    blueline: require('@/assets/img/blueline.png'),
    crown: require('@/assets/img/crown.png'),
    head: require('@/assets/img/head.png'),
    circle: require('@/assets/img/circle.png'),
    hotlive1: require('@/assets/img/热门直播1.png'),
    hotlive2: require('@/assets/img/热门直播2.png'),
    hotlive3: require('@/assets/img/热门直播3.png'),
    whale: require('@/assets/img/whale.png'),
    overview: require('@/assets/img/home/overview.png'),
    hosts: require('@/assets/img/home/hosts.png'),
    ins: require('@/assets/img/home/ins.png'),
    goods: require('@/assets/img/home/goods.png'),
    hotlive: require('@/assets/img/home/hotlive.png'),
    report: require('@/assets/img/home/report.png'),
    follow: require('@/assets/img/home/follow.png'),
    vip: require('@/assets/img/home/vip.png'),
    advice: require('@/assets/img/home/advice.png')
  },
  icons: {},
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/home.vue'),
      children: 'treemenu'
    },
    {
      path: '/enter',
      name: 'Enter',
      component: () => import('@/views/Enter/index.vue'),
      meta: { title: '首页' }
      // children: 'enternavs'
    },
    {
      path: '/',
      redirect: to => ({ name: 'overview' })
    }
  ],
  enternavs: [
    {
      path: '/enter/entermain',
      name: 'entermain',
      component: () => import('@/views/Enter/components/entermain.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/enter/info',
      name: 'info',
      component: () => import('@/views/Enter/components/info.vue'),
      meta: { title: '产品介绍' }
    },
    {
      path: '/enter/ask',
      name: 'ask',
      component: () => import('@/views/Enter/components/ask.vue'),
      meta: { title: '合作咨询' }
    }
  ],
  api: {
    baseUrl: '',
    get: {
      charts: {
        watch: {
          uvpv: {
            url: 'abv',
            _params: { a: 1 }
          },
          shownum: {
            url: ''
          },
          hostnum: {
            url: ''
          },
          goodnum: {
            url: ''
          }
        }
      }
    },
    post: {

    }
  },
  charts: {
    watch: [
      {
        title: '观看人数(UV)/观看次数(PV)',
        name: 'uvpv',
        api: 'charts/watch/uvpv'
      },
      {
        title: '开播场次/开播主播数',
        name: 'shownum',
        api: 'charts/watch/shownum'
      },
      {
        title: '新增主播数/总主播数',
        name: 'hostnum',
        api: 'charts/watch/hostnum'
      },
      {
        title: '直播商品数/品牌数',
        name: 'goodnum',
        data: 'charts/watch/goodnum'
      }
    ]
  },
  treemenu: [
    {
      path: '/home/overview',
      name: 'overview',
      component: () => import('@/views/Home/components/overview.vue'),
      meta: { title: '直播大盘' }
    },
    {
      path: '/home/hosts',
      name: 'hosts',
      component: () => import('@/views/Home/components/hosts.vue'),
      meta: { title: '主播' }
    },
    {
      path: '/home/ins',
      name: 'ins',
      component: () => import('@/views/Home/components/ins.vue'),
      meta: { title: '机构' }
    },
    {
      path: '/home/goods',
      name: 'goods',
      component: () => import('@/views/Home/components/goods.vue'),
      meta: { title: '商品' }
    },
    {
      path: '/home/hotlive',
      name: 'hotlive',
      component: () => import('@/views/Home/components/hotlive.vue'),
      meta: { title: '人气直播' }
    },
    {
      path: '/home/report',
      name: 'report',
      component: () => import('@/views/Home/components/hotlive.vue'),
      meta: { title: '行业专题报告' }
    },
    {
      path: '/home/follow',
      name: 'follow',
      component: () => import('@/views/Home/components/follow.vue'),
      meta: { title: '我的关注' }
    },
    {
      path: '/home/vip',
      name: 'vip',
      component: () => import('@/views/Home/components/vip.vue'),
      meta: { title: '会员套餐' }
    },
    {
      path: '/home/advice',
      name: 'advice',
      component: () => import('@/views/Home/components/advice.vue'),
      meta: { title: '意见和反馈' }
    }
  ],
  liverlist: [
    {
      nick: '李佳琪',
      fansnum: '3000万',
      lovest: '1000万',
      zan: '3000万',
      dist: '浙江杭州',
      label: '时尚'
    },
    {
      nick: '明日的夏天',
      fansnum: '3000万',
      lovest: '400万',
      zan: '3000万',
      dist: '四川成都',
      label: '美食'
    }
  ],
  livedata: [
    { name: '昨日直播观看次数', value: 123456, unit: '万', link: '' },
    { name: '昨日开播数', value: 3980, unit: '', link: '' },
    { name: '昨日直播商品数(估)', value: 123456, unit: '万', link: '' },
    { name: '昨日带货量(估)', value: 30980, unit: '万', link: '' }
  ]
}
