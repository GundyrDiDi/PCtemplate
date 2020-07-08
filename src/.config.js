export default {
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
    hotlive3: require('@/assets/img/热门直播3.png')
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
      redirect: to => ({ name: 'Enter', hash: '#entermain' })
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
  treemenu: [],
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
  ]
}
