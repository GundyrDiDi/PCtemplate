import { calcRange } from '@/plugins/util'
export default {
  user: {
    name: 'CHENFAN',
    expire: '永久',
    auth: '免费版',
    followlist: []
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
    msg: '点击关注服务号，可接收更多资讯哦！'
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
    collapse: require('@/assets/img/home/collapse.png')
  },
  icons: {},
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/home.vue'),
      meta: { title: '主页' },
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
      redirect: to => ({ name: 'hosts' })
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
            url: 'uvpv'
          },
          shownum: {
            url: 'shownum'
          },
          hostnum: {
            url: ''
          },
          goodnum: {
            url: ''
          }
        },
        hostvalue: {},
        fanspicture: {},
        ring: {
          typeofhost: {
            url: 'typeofhost'
          },
          levelofhost: {
            url: 'levelofhost'
          }
        },
        map: {
          district: {
            url: 'district'
          }
        },
        keyword: {
          roomtitle: {
            url: 'roomtitle'
          }
        }
      },
      form: {
        range: {
          default: {
            url: 'range'
          }
        },
        options: {
          default: {
            url: 'options'
          },
          catalog: {
            url: 'catalog'
          }
        }
      },
      tables: {
        hostslist: {
          url: 'hostslist'
        },
        hostrecord: {
          url: 'hostrecord'
        }
      }
    },
    post: {}
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
    ],
    hostvalue: [
      {
        title: '粉丝变化趋势',
        name: 'fansflow',
        api: 'charts/watch/uvpv'
      },
      {
        title: '观看UV/观看PV',
        name: 'uvpv',
        api: 'charts/watch/shownum'
      },
      {
        title: '点赞数',
        name: 'favonum',
        api: 'charts/watch/hostnum'
      },
      {
        title: '评论数',
        name: 'commentnum',
        data: 'charts/watch/goodnum'
      },
      {
        title: '销售额(估)/销量(估)',
        name: 'moneyamount',
        data: 'charts/watch/goodnum'
      }
    ],
    bar: {},
    fanspicture: [
      { title: '性别比例', name: 'fansgender', api: 'charts/ring/typeofhost' },
      { title: '年龄分布', name: 'fansage', api: 'charts/ring/typeofhost' },
      { title: '消费偏好', name: 'fanscost', api: 'charts/ring/typeofhost' },
      { title: '生活偏好', name: 'fanshobby', api: 'charts/ring/typeofhost' },
      { title: '城市分布', name: 'fansdistrct', api: 'charts/map/district' }
    ],
    ring: [
      {
        title: '主播类型',
        name: 'typeofhost',
        api: 'charts/ring/typeofhost'
      },
      {
        title: '主播等级分布',
        name: 'levelofhost',
        api: 'charts/ring/levelofhost'
      }
    ],
    map: [
      {
        title: '直播间地区分布',
        name: 'district',
        api: 'charts/map/district'
      }
    ],
    keyword: [
      {
        title: '直播间标题词云分布',
        name: 'roomtitle',
        api: 'charts/keyword/roomtitle'
      }
    ],
    hybird: [
      {
        title: '直播流量分析',
        name: 'roteofflow',
        api: 'charts/keyword/roteofflow'
      }
    ]
  },
  tables: {
    hostslist: {
      param: {
        sort: {
          key: '',
          order: 0
        },
        size: 1,
        sizeOpts: [1, 2, 3, 4],
        page: 1
      },
      events: {
        follow (row, column) {},
        detail (row, column) {
          this.$store.commit('host/actHost', row)
          this.$router.push({ name: 'hostDetail' })
        }
      },
      api: 'tables/hostslist',
      column: [
        { key: 'name', title: '主播名称' },
        { key: 'fansnum', title: '粉丝数', sortable: true },
        { key: 'favonum', title: '最爱TA', sortable: true },
        { key: 'prainum', title: '点赞数', sortable: true },
        { key: 'district', title: '所属区域' },
        { key: 'type', title: '主播类型' },
        { key: 'goodat', title: '擅长领域' },
        {
          key: 'money30day',
          title: '近30天销售额(估)',
          sortable: true,
          width: 150
        },
        {
          key: 'amount30day',
          title: '近30天销量(估)',
          sortable: true,
          width: 150
        },
        {
          key: 'price30day',
          title: '近30天客单价(估)',
          sortable: true,
          width: 150
        },
        {
          key: 'action',
          title: '操作',
          action: [
            {
              event: 'follow',
              class: 'fa fa-star',
              on: 'click',
              tooltip: '关注'
            },
            {
              event: 'detail',
              class: 'fa fa-ellipsis-h',
              on: 'click',
              tooltip: '查看详情'
            }
          ]
        }
      ]
    },
    hostrecord: {
      param: {
        sort: {
          key: '',
          order: 0
        },
        size: 10,
        sizeOpts: [10],
        page: 1
      },
      events: {
        playlive () {}
      },
      api: 'tables/hostrecord',
      column: [
        { key: 'liveinfo', title: '直播信息' },
        { key: 'livetime', title: '直播时间' },
        { key: 'uv', title: 'UV' },
        { key: 'pv', title: 'PV' },
        { key: 'fansofraise', title: '直播涨粉' },
        { key: 'goodnum', title: '商品数' },
        { key: 'money', title: '销售额(估)' },
        { key: 'amount', title: '销量(估)' },
        { key: 'price', title: '客单价(估)' },
        {
          key: 'action',
          title: '操作',
          action: [
            {
              event: 'playlive',
              class: 'fa fa-play',
              on: 'click',
              tooltip: '观看直播'
            }
          ]
        }
      ]
    },
    hostgood: {
      param: {
        sort: {
          key: '',
          order: 0
        },
        size: 10,
        sizeOpts: [10],
        page: 1
      },
      events: {
        playlive () {}
      },
      api: 'tables/hostrecord',
      column: [
        { key: 'goodname', title: '商品' },
        { key: 'brand', title: '品牌' },
        { key: 'livenum', title: '直播次数', sortable: true },
        { key: 'liveamount', title: '直播销量(估)', sortable: true },
        { key: 'livemoney', title: '直播销售额(估)', sortable: true },
        { key: 'relativehost', title: '关联主播数', sortable: true },
        { key: 'relativelive', title: '关联直播数', sortable: true },
        { key: 'goodamount', title: '累计直播销量(估)', sortable: true },
        { key: 'goodmoney', title: '累计直播销售额(估)', sortable: true }
      ]
    },
    inslist: {
      param: {
        sort: {
          key: '',
          order: 0
        },
        size: 10,
        sizeOpts: [10, 20, 30, 40],
        page: 1
      },
      api: 'tables/hostrecord',
      column: [
        { key: 'insinfo', title: '机构信息', width: 300 },
        { key: 'insscore', title: '机构得分', sortable: true },
        { key: 'fansnum', title: '覆盖粉丝数量', sortable: true },
        { key: 'amountgood', title: '合作商品数', sortable: true },
        { key: 'amountshop', title: '合作店铺数', sortable: true },
        {
          key: 'amounthost',
          title: '旗下大咖',
          width: 350,
          className: 'text-center'
        }
      ]
    },
    goodslist: {
      param: {
        sort: {
          key: 'livemoney',
          order: 0
        },
        size: 10,
        sizeOpts: [10, 20, 30, 40],
        page: 1
      },
      api: 'tables/hostrecord',
      column: [
        { key: 'goodname', title: '商品', width: 350 },
        { key: 'catalog1', title: '一级类目' },
        { key: 'brand', title: '品牌' },
        { key: 'brand', title: '关联主播数', sortable: true },
        { key: 'livenum', title: '关联直播数', sortable: true },
        { key: 'liveamount', title: '直播销量(估)', sortable: true },
        { key: 'livemoney', title: '直播销售额(估)', sortable: true }
      ]
    }
  },
  forms: {
    richFilter: [
      {
        api: 'form/range/default',
        name: 'fansnum',
        label: '粉丝数量',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'showcount',
        label: '开播场次',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'money30day',
        label: '近30天销售额(估)',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'amount30day',
        label: '近30天销量(估)',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'watch7day',
        label: '近7天场均观看次数',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'price30day',
        label: '近30天客单价(估)',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'comment7day',
        label: '近7天场均评论数',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        name: 'praise7day',
        label: '近7天场均点赞数',
        rule: [],
        component: 'range',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        value: [1, 2, 3, 4],
        api: 'form/options/default',
        name: 'typeofhost',
        label: '播主类型',
        rule: [],
        component: 'select',
        attrs: {
          multiple: true
        },
        type: 'slot',
        slot: {
          component: 'option',
          attrs: {
            label: '',
            value: ''
          }
        }
      },
      {
        api: 'form/options/default',
        name: 'district',
        label: '所属地区',
        rule: [],
        component: 'select',
        attrs: {
          multiple: true
        },
        type: 'slot',
        slot: {
          component: 'option',
          attrs: {
            label: '',
            value: ''
          }
        }
      },
      {
        api: 'form/options/default',
        name: 'levelofhost',
        label: '播主等级',
        rule: [],
        component: 'select',
        attrs: {
          multiple: true
        },
        type: 'slot',
        slot: {
          component: 'option',
          attrs: {
            label: '',
            value: ''
          }
        }
      },
      {
        api: 'form/options/default',
        name: 'goodat',
        label: '擅长领域',
        rule: [],
        component: 'select',
        attrs: {
          multiple: true
        },
        type: 'slot',
        slot: {
          component: 'option',
          attrs: {
            label: '',
            value: ''
          }
        }
      }
    ],
    catalog: {
      api: 'form/options/catalog',
      label: '一级类目',
      name: 'catalog1',
      attrs: {
        mode: [0, 1]
      }
    },
    goodrelative: [
      {
        api: 'form/range/default',
        label: '关注主播数量',
        name: 'relativehost',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        api: 'form/range/default',
        label: '关注直播数量',
        name: 'relativelive',
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      }
    ]
  },
  treemenu: [
    {
      path: '/home/overview',
      name: 'overview',
      component: () => import('@/views/Home/components/overview.vue'),
      meta: { title: '直播大盘', icon: 'icon-fenxi' }
    },
    {
      path: '/home/hosts',
      name: 'hosts',
      component: () => import('@/views/Home/components/hosts.vue'),
      meta: { title: '主播', icon: 'icon-ren' },
      children: [
        {
          path: '/home/hosts/detail',
          name: 'hostDetail',
          component: () => import('@/views/Home/components/hostDetail.vue'),
          meta: { title: '主播详情', second: true }
        }
      ]
    },
    {
      path: '/home/inst',
      name: 'inst',
      component: () => import('@/views/Home/components/inst.vue'),
      meta: { title: '机构', icon: 'icon-jigou' }
    },
    {
      path: '/home/goods',
      name: 'goods',
      component: () => import('@/views/Home/components/goods.vue'),
      meta: { title: '商品', icon: 'icon-shangpin' }
    },
    {
      path: '/home/hotlive',
      name: 'hotlive',
      component: () => import('@/views/Home/components/hotlive.vue'),
      meta: { title: '人气直播', icon: 'icon-remen' }
    },
    // {
    //   path: '/home/report',
    //   name: 'report',
    //   component: () => import('@/views/Home/components/hotlive.vue'),
    //   meta: { title: '行业专题报告' ,icon:'fenxi'}
    // },
    {
      path: '/home/follow',
      name: 'follow',
      component: () => import('@/views/Home/components/follow.vue'),
      meta: { title: '我的关注', icon: 'icon-guanzhu' }
    },
    {
      path: '/home/vip',
      name: 'vip',
      component: () => import('@/views/Home/components/vip.vue'),
      meta: { title: '会员套餐', icon: 'icon-huiyuan' }
    },
    {
      path: '/home/advice',
      name: 'advice',
      component: () => import('@/views/Home/components/advice.vue'),
      meta: { title: '意见和反馈', icon: 'icon-fankui' }
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
