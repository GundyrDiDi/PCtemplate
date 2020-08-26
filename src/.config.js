import { calcRange } from '@/plugins/util'
export const MAP = {
  hosttype: {
    1: '达人无店铺',
    2: '达人有店铺',
    3: '商家'
  },
  hostlevel: {
    1: 'Lv 1',
    2: 'Lv 2',
    3: 'Lv 3',
    4: 'Lv 4',
    5: 'Lv 5'
  },
  //
  liveTitle: 'liveinfo',
  startTime: 'livetime',
  addFansNum: 'fansofraise',
  goodsCnt: 'goodnum',
  salesAmt: 'money',
  saleQty: 'amount',
  perSalePrice: 'price',
  liveImg: 'img',
  videoId: 'link'
}
export default {
  tour: {},
  name: '鲸宸数据',
  description: '淘宝主播商家、主播、MCN优选的淘宝直播AI数据平台',
  company: {
    email: 'bd@jingchendata.com',
    tel: '13372543376 (董先生)',
    addr: '浙江省杭州市滨江区秋溢路606号2号楼402室',
    name: '杭州瀚斯科技有限公司',
    icp: '浙ICP备19017467号',
    gip: '浙公网安备 33010602010329号'
  },
  keywords: [],
  notify: {
    msg: '点击关注服务号，可接收更多资讯哦！'
  },
  imgs: {
    logo: require('@/assets/img/logo2.png'),
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
    whale: require('@/assets/img/whale3.png'),
    collapse: require('@/assets/img/home/collapse.png'),
    dimandyellow: require('@/assets/img/vip/dimandyellow.png'),
    dimandblue: require('@/assets/img/vip/dimandblue.png'),
    dimandgray: require('@/assets/img/vip/dimandgray.png'),
    check: require('@/assets/img/vip/check.png'),
    gongzhonghao: require('@/assets/img/gongzhonghao.jpg'),
    coop: require('@/assets/img/service.jpg'),
    weixin: require('@/assets/img/weixin.png')
  },
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
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Enter/components/login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      redirect: to => ({ name: 'Enter' })
    }
  ],
  charts: {
    watch: [
      {
        title: '观看次数(PV)',
        name: 'uvpv',
        api: 'charts/watch',
        props: ['pv']
      },
      {
        title: '开播场次/开播主播数',
        name: 'shownum',
        api: 'charts/watch',
        props: ['liveCnt', 'anchorsCnt']
      },
      {
        title: '新增主播数',
        name: 'hostnum',
        api: 'charts/watch',
        props: ['addAnchorsCnt']
      },
      {
        title: '直播商品数/品牌数',
        name: 'goodnum',
        api: 'charts/watch',
        props: ['goodsCnt', 'brandsCnt']
      }
    ],
    hostvalue: [
      {
        title: '粉丝变化趋势',
        name: 'fansflow',
        api: 'host/value',
        names: '新增粉丝数/总粉丝数',
        props: ['addFansNum', 'fansNum']
      },
      {
        title: '观看UV/观看PV',
        name: 'uvpv',
        api: 'host/value',
        props: ['totalUv', 'totalPv']
      },
      {
        title: '点赞数',
        name: 'favonum',
        api: 'host/value',
        props: ['totalPraiseNum']
      },
      {
        title: '评论数',
        name: 'commentnum',
        api: 'host/value',
        props: ['totalCommentNum']
      },
      {
        title: '销售额(估)/销量(估)',
        name: 'moneyamount',
        api: 'host/value',
        props: ['totalSaleAmt', 'totalSaleQty']
      }
    ],
    bar: {},
    fanspicture: [
      {
        title: '性别比例',
        name: 'fansgender',
        api: 'charts/fanspicture/gender',
        props: {
          name: {
            label: 'attribute'
          },
          value: {
            label: 'value'
          }
        }
      },
      {
        title: '年龄分布',
        name: 'fansage',
        api: 'charts/fanspicture/age',
        props: {
          name: {
            label: 'attribute'
          },
          value: {
            label: 'value'
          }
        }
      },
      {
        title: '消费偏好',
        name: 'fanscost',
        api: 'charts/fanspicture/career',
        props: {
          name: {
            label: 'attribute'
          },
          value: {
            label: 'value'
          }
        }
      },
      {
        title: '生活偏好',
        name: 'fanshobby',
        api: 'charts/fanspicture/interest',
        props: {
          name: {
            label: 'attribute'
          },
          value: {
            label: 'value'
          }
        }
      },
      {
        title: '城市分布',
        name: 'fansdistrct',
        api: 'charts/fanspicture/area',
        props: {
          name: {
            label: 'attribute'
          },
          value: {
            label: 'value'
          }
        }
      }
    ],
    ring: [
      {
        title: '主播类型',
        name: 'typeofhost',
        api: 'charts/ring/typeofhost',
        props: {
          name: {
            label: 'anchorType',
            map: ['', '达人无店铺', '达人有店铺', '商家']
          },
          value: {
            label: 'anchorTypeNum'
          },
          unit: '位'
        }
      },
      {
        title: '主播等级分布',
        name: 'levelofhost',
        api: 'charts/ring/levelofhost',
        props: {
          name: {
            label: 'anchorRank',
            map: ['', 'Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5']
          },
          value: {
            label: 'anchorRankNum'
          },
          unit: '位'
        }
      }
    ],
    map: [
      {
        title: '直播间地区分布',
        name: 'district',
        api: 'charts/map/district',
        props: {
          name: {
            label: 'liveRoomArea'
          },
          value: {
            label: 'liveCnt'
          }
        }
      }
    ],
    keyword: [
      {
        title: '直播间标题词云分布',
        name: 'roomtitle',
        api: 'charts/keyword/roomtitle',
        props: {
          name: {
            label: 'keyWords'
          },
          value: {
            label: 'keyWordsCnt'
          }
        }
      }
    ],
    hybird: [
      {
        title: '直播流量分析',
        name: 'liveofflow',
        api: 'charts/liveofflow',
        props: {
          skilledField: () => ({ type: 'xAxis', name: '领域' }),
          liveCnt: () => ({ type: 'line', name: '直播场次' }),
          totalPv: () => ({ type: 'bar', name: '观看次数(PV)' }),
          totalUv: () => ({ type: 'bar', name: '观看人数(UV)' })
        }
      }
    ]
  },
  tables: {
    hostslist: {
      defaultSort: 'fansNum,desc',
      events: {
        // brief.vue 的 follow 方法也引用此函数
        follow ({ row }) {
          const follow = row.follow
          this.user_followornot({
            host: row.premiereInfoDto || row,
            vm: this
          }).then(res => {
            // 关注或取消关注 成功
            if (res.code === 200) {
              this[res.not ? 'msgSuccess' : '$myalert'](res.obj + '！')
              row.follow = !res.not
            } else {
              // 关注或取消关注 失败
              if (res.obj) {
                this.$myalert(res.obj + '！')
              }
              // 取消操作
              row.follow = follow
            }
          })
        },
        detail ({ row }) {
          this.$router.push({ name: 'hostDetail', params: { host_id: row.id } })
        }
      },
      api: 'tables/hostslist',
      column: [
        {
          key: 'anchorName',
          title: '主播信息',
          custom: [
            {
              tag: 'img',
              src: 'anchorImg',
              props: {
                size: 'large'
              },
              style: {
                cursor: 'pointer'
              },
              events: {
                click: 'detail'
              }
            },
            {
              tag: 'span',
              text: 'anchorName'
            }
          ],
          minWidth: 200
        },
        { key: 'fansNum', title: '粉丝数', sortable: 'custom', minWidth: 120 },
        {
          key: 'liveCnt',
          title: '开播场次',
          sortable: 'custom',
          minWidth: 120
        },
        { key: 'favorNum', title: '最爱TA', sortable: 'custom', minWidth: 120 },
        {
          key: 'totalPraiseNum',
          title: '点赞数',
          sortable: 'custom',
          minWidth: 120
        },
        { key: 'anchorArea', title: '所属区域', minWidth: 100 },
        { key: 'anchorType', title: '主播类型', minWidth: 120 },
        { key: 'skilledField', title: '擅长领域', minWidth: 100 },
        {
          key: 'saleAmtPerLive30d',
          title: '近30天销售额(估)',
          sortable: 'custom',
          width: 170
        },
        {
          key: 'saleQtyPerLive30d',
          title: '近30天销量(估)',
          sortable: 'custom',
          width: 160
        },
        {
          key: 'perSalePricePerLive30d',
          title: '近30天客单价(估)',
          sortable: 'custom',
          width: 170
        },
        {
          key: 'pvPerLive30d',
          title: '近30天场均观看次数',
          sortable: 'custom',
          width: 170
        },
        {
          key: 'commentNumPerLive30d',
          title: '近30天场均评论数',
          sortable: 'custom',
          width: 170
        },
        {
          key: 'praiseNumPerLive30d',
          title: '近30天场均点赞数',
          sortable: 'custom',
          width: 170
        },
        {
          key: 'action',
          title: '操作',
          minWidth: 120,
          // action: [
          //   {
          //     change: 'follow',
          //     event: 'follow',
          //     classes: ['fa fa-star-o', 'fa fa-star'],
          //     on: 'click',
          //     tooltips: ['关注', '取消关注']
          //   },
          //   {
          //     event: 'detail',
          //     class: 'fa fa-ellipsis-h',
          //     on: 'click',
          //     tooltip: '查看详情'
          //   }
          // ]
          custom: [
            {
              tag: 'a',
              style: { display: 'block' },
              dyna: {
                param: 'follow',
                fn (follow) {
                  return follow ? '不再关注' : '关注TA'
                }
              },
              events: {
                click: 'follow'
              }
            },
            {
              tag: 'a',
              raw: '查看详情',
              events: {
                click: 'detail'
              }
            }
          ]
        }
      ]
    },
    hostrecord: {
      events: {
        playlive ({ row }) {
          window.open(
            'https://taobaolive.taobao.com/room/index.htm?feedId=' + row.topic
          )
        }
      },
      api: 'host/record',
      column: [
        {
          key: 'liveinfo',
          title: '直播信息',
          width: 240,
          custom: [
            {
              tag: 'img',
              src: 'img',
              props: {
                size: 'large'
              }
            },
            { tag: 'span', text: 'liveinfo' }
          ]
        },
        { key: 'livetime', title: '直播时间', width: 200 },
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
          // action: [
          //   {
          //     event: 'playlive',
          //     class: 'fa fa-play',
          //     on: 'click',
          //     tooltip: '观看直播'
          //   }
          // ],
          custom: [
            {
              tag: 'a',
              raw: '观看直播',
              events: {
                click: 'playlive'
              }
            }
          ]
        }
      ]
    },
    hostgood: {
      events: {
        link ({ row }) {
          window.open(
            'https://item.taobao.com/item.htm?ft=t&id=' + row.taobaoGoodsId
          )
        }
      },
      api: 'host/good',
      column: [
        {
          key: 'taobaoGoodsName',
          title: '商品',
          custom: [
            {
              tag: 'img',
              src: 'goodsImg',
              events: {
                click: 'link'
              }
            },
            {
              tag: 'a',
              class: 'lines',
              text: 'taobaoGoodsName',
              events: {
                click: 'link'
              }
            }
          ],
          width: 300
        },
        { key: 'brandName', title: '品牌', minWidth: 100 },
        {
          key: 'liveCnt',
          title: '直播次数',
          sortable: 'custom',
          minWidth: 100
        },
        {
          key: 'saleQty',
          title: '直播销量(估)',
          sortable: 'custom',
          minWidth: 140
        },
        {
          key: 'saleAmt',
          title: '直播销售额(估)',
          sortable: 'custom',
          minWidth: 140
        },
        {
          key: 'rel_anchorsCnt',
          title: '关联主播数',
          sortable: 'custom',
          minWidth: 140
        },
        {
          key: 'rel_liveCnt',
          title: '关联直播数',
          sortable: 'custom',
          minWidth: 160
        },
        {
          key: 'totalSaleQty',
          title: '累计直播销量(估)',
          sortable: 'custom',
          minWidth: 170
        },
        {
          key: 'totalSaleAmt',
          title: '累计直播销售额(估)',
          sortable: 'custom',
          minWidth: 170
        }
      ]
    },
    inslist: {
      defaultSort: 'mechanismFansNum,desc',
      events: {
        detail ({ anchorId, anchorFlag }) {
          if (anchorFlag) {
            this.$myalert('该大咖未直播过!')
          } else {
            const fn = this.myauth.inst.columnEvent
            if (fn && fn.call(this)) return
            this.$router.push({
              name: 'hostDetail',
              params: { host_id: anchorId }
            })
          }
        },
        modal (param) {
          const fn = this.myauth.inst.columnEvent2
          if (fn && fn.call(this)) return
          this.tables_setcelldata({ ...param, name: 'inst' })
        },
        modal2 (data, row) {
          data.inst = row.mechanismName
          this.$store.commit('tables/instHosts', data)
        }
      },
      api: 'tables/inslist',
      column: [
        {
          key: 'mechanismName',
          title: '机构信息',
          align: 'left',
          className: 'margin-left',
          width: 240,
          custom: [
            {
              tag: 'img',
              src: 'mechanismLogo',
              props: {
                size: 'large'
              }
            },
            { tag: 'span', text: 'mechanismName' }
          ]
        },
        { key: 'mechanismScore', title: '机构得分', sortable: 'custom' },
        { key: 'mechanismFansNum', title: '覆盖粉丝数量', sortable: 'custom' },
        {
          key: 'mechanismGoodsCnt',
          title: '合作商品数',
          sortable: 'custom',
          custom: [
            {
              tag: 'a',
              text: 'mechanismGoodsCnt',
              events: {
                click: 'modal'
              }
            }
          ]
        },
        {
          key: 'mechanismShopsCnt',
          title: '合作店铺数',
          sortable: 'custom',
          custom: [
            {
              tag: 'a',
              text: 'mechanismShopsCnt',
              events: {
                click: 'modal'
              }
            }
          ]
        },
        {
          key: 'anchorInfoDtos',
          title: '旗下大咖',
          width: 320,
          async: {
            event: 'detail',
            tooltip: 'anchorName',
            slice: 4,
            el: {
              tag: 'img',
              src: 'anchorImg',
              on: 'click',
              param: 'anchorId'
            }
          }
        }
      ]
    },
    goodslist: {
      defaultSort: 'totalSaleAmt,desc',
      events: {
        modal (param) {
          const fn = this.myauth.goods.columnEvent2
          if (fn && fn.call(this)) return
          this.tables_setcelldata({ ...param, name: 'goods' })
        },
        link ({ row }) {
          window.open(
            'https://item.taobao.com/item.htm?ft=t&id=' + row.taobaoGoodsId
          )
        }
      },
      api: 'tables/goodslist',
      column: [
        {
          key: 'taobaoGoodsName',
          title: '商品',
          custom: [
            {
              tag: 'img',
              src: 'goodsImg',
              events: {
                click: 'link'
              }
            },
            {
              tag: 'a',
              class: 'lines',
              text: 'taobaoGoodsName',
              events: {
                click: 'link'
              }
            }
          ],
          width: 320
        },
        { key: 'rootCategoryName', title: '一级类目' },
        { key: 'brandName', title: '品牌' },
        {
          key: 'anchorsCnt',
          title: '关联主播数',
          sortable: 'custom',
          custom: [
            {
              tag: 'a',
              text: 'anchorsCnt',
              events: {
                click: 'modal'
              }
            }
          ]
        },
        {
          key: 'liveCnt',
          title: '关联直播数',
          sortable: 'custom',
          custom: [
            {
              tag: 'a',
              text: 'liveCnt',
              events: {
                click: 'modal'
              }
            }
          ]
        },
        { key: 'totalSaleQty', title: '直播销量(估)', sortable: 'custom' },
        { key: 'totalSaleAmt', title: '直播销售额(估)', sortable: 'custom' }
      ]
    },
    livelist: {
      defaultSort: 'pv,desc',
      events: {
        modal (param) {
          const fn = this.myauth.hotlive.columnEvent2
          if (fn && fn.call(this)) return
          this.tables_setcelldata({ ...param, name: 'hotlive' })
        }
      },
      api: 'tables/hotlive',
      column: [
        {
          key: 'liveinfo',
          title: '直播信息',
          width: 260,
          custom: [
            {
              tag: 'img',
              src: 'img',
              props: {
                size: 'large'
              }
            },
            { tag: 'span', text: 'liveinfo' }
          ]
        },
        { key: 'anchorName', title: '主播' },
        { key: 'uv', title: '观看人数', sortable: 'custom' },
        { key: 'pv', title: '观看次数', sortable: 'custom' },
        { key: 'addFansNum', title: '直播涨粉数', sortable: 'custom' },
        {
          key: 'goodsCnt',
          title: '商品数',
          sortable: 'custom',
          custom: [
            {
              tag: 'a',
              text: 'goodsCnt',
              events: {
                click: 'modal'
              }
            }
          ]
        },
        { key: 'salesAmt', title: '销售额(估)', sortable: 'custom' },
        { key: 'saleQty', title: '销量(估)', sortable: 'custom' },
        { key: 'perSalePrice', title: '客单价(估)', sortable: 'custom' }
      ]
    }
  },
  forms: {
    richFilter: [
      {
        name: 'fansNum',
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
        name: 'liveCnt',
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
        name: 'saleAmtPerLive30d',
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
        name: 'saleQtyPerLive30d',
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
        name: 'pvPerLive30d',
        label: '近30天场均观看次数',
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
        name: 'perSalePricePerLive30d',
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
        name: 'commentNumPerLive30d',
        label: '近30天场均评论数',
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
        name: 'praiseNumPerLive30d',
        label: '近30天场均点赞数',
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
        name: 'anchorType',
        label: '播主类型',
        rule: [],
        component: 'select',
        attrs: {
          multiple: false,
          clearable: true
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
        name: 'anchorArea',
        label: '所属地区',
        rule: [],
        component: 'cascader',
        attrs: {
          props: { checkStrictly: true, emitPath: false },
          clearable: true
        },
        type: 'attrs',
        pipe: function (res) {
          const options = {}
          res.forEach(({ label, value }) => {
            const o = (options[label] = options[label] || {
              label,
              value: label,
              children: []
            })
            o.children.push({
              label: value,
              value
            })
          })
          return {
            options: Object.values(options),
            props: { checkStrictly: true, emitPath: false },
            clearable: true
          }
        }
      },
      {
        name: 'anchorRank',
        label: '播主等级',
        rule: [],
        component: 'select',
        attrs: {
          multiple: false,
          clearable: true
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
        name: 'skilledField',
        label: '擅长领域',
        rule: [],
        component: 'select',
        attrs: {
          multiple: false,
          clearable: true
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
    hotlistfilter: [
      {
        label: '销售额(估)',
        name: 'salesAmt',
        value: [0, 9999],
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
        label: '销量(估)',
        name: 'saleQty',
        component: 'range',
        value: [0, 9999],
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        label: '客单价',
        name: 'perSalePrice',
        component: 'range',
        value: [0, 9999],
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        label: '观看次数',
        name: 'pv',
        component: 'range',
        value: [0, 9999],
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        name: 'addFansNum',
        label: '直播涨粉数',
        value: [0, 9999],
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
        name: 'goodsCnt',
        label: '单场直播商品数',
        value: [0, 9999],
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
        name: 'liveTitle',
        label: '直播标题',
        component: 'input',
        attrs: {
          size: 'small'
        }
      }
    ],
    catalog: {
      api: 'forms/catalog/first',
      label: '一级类目',
      name: 'rootCategoryName',
      value: '',
      attrs: {
        mode: [0]
        // mode: [0, 1] //单选多选
      }
    },
    goodrelative: [
      {
        label: '关联主播数量',
        name: 'anchorsCnt',
        component: 'range',
        value: [0, 9999],
        attrs: {
          value: [0, 9999],
          min: -Infinity,
          max: Infinity
        },
        type: 'attrs',
        pipe: calcRange
      },
      {
        label: '关联直播数量',
        name: 'liveCnt',
        component: 'range',
        value: [0, 9999],
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
      meta: { title: '主播', icon: 'icon-ren1' },
      children: [
        {
          path: '/home/hosts/detail/:host_id',
          name: 'hostDetail',
          component: () => import('@/views/Home/components/hostDetail.vue'),
          meta: { title: '主播详情', second: true },
          beforeEnter (to, from, next) {
            if (to.params.host_id) {
              localStorage.host_id = to.params.host_id
            }
            this.commit('host/hostId', localStorage.host_id)
            this.dispatch('host/setacthost').then(res => {
              to.meta.title = res
              document.title = to.meta.title
            })
            next()
          }
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
      meta: { title: '我的关注', icon: 'icon-guanzhu1' }
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
        component: 'carousel-card'
      },
      button: { name: '查看更多', link: '' }
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
