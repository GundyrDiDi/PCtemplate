import config, { MAP } from '@/.config.js'
import { formatNumber, addNumberUnit, formatDate } from '@/plugins/util.js'
function link ({ row }) {
  const link = row.taobao_goods_id ? row.taobao_goods_id : row.taobaoGoodsId
  window.open('https://item.taobao.com/item.htm?ft=t&id=' + link)
}
// 单元格关联表
const Map = {
  inst: {
    events: {
      link
    },
    condition: ['mechanismId', 'monthId'],
    defaultSort: 'saleAmt,desc',
    column: [
      null,
      {
        key: 'cooperateCnt',
        title: '本月合作次数',
        sortable: 'custom'
      },
      {
        key: 'saleAmt',
        title: '销售额(估)',
        sortable: 'custom'
      },
      {
        key: 'saleQty',
        title: '销量(估)',
        sortable: 'custom'
      }
    ],
    mechanismGoodsCnt: {
      name: '合作商品洞察',
      column: [
        {
          key: 'taobaoGoodsName',
          title: '商品信息',
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
        }
      ],
      api: 'tables/inslist/rltgood'
    },
    mechanismShopsCnt: {
      name: '合作商家洞察',
      column: [
        {
          key: 'taobaoShopName',
          title: '店铺信息',
          custom: [
            // {
            //   tag: 'img',
            //   src: 'shopImg'
            // },
            { tag: 'span', text: 'taobaoShopName' }
          ],
          width: 300
        }
      ],
      api: 'tables/inslist/rltshop'
    }
  },
  goods: {
    condition: ['taobaoGoodsId', 'monthId'],
    defaultSort: 'saleAmt,desc',
    column: [
      null,
      {
        key: 'saleAmt',
        title: '销售额(估)',
        sortable: 'custom'
      },
      {
        key: 'saleQty',
        title: '销量(估)',
        sortable: 'custom'
      }
    ],
    anchorsCnt: {
      name: '关联主播',
      column: [
        {
          key: 'anchorName',
          title: '主播',
          custom: [
            {
              tag: 'img',
              src: 'anchorImg'
            },
            {
              tag: 'div',
              children: [
                { tag: 'span', text: 'anchorName' },
                { tag: 'label', text: 'fansNum', raw: ' 粉丝' }
              ]
            }
          ],
          width: 300
        }
      ],
      api: 'tables/goodslist/rlthost'
    },
    liveCnt: {
      name: '关联直播',
      column: [
        {
          key: 'liveTitle',
          title: '直播信息',
          custom: [
            {
              tag: 'img',
              src: 'liveImg'
            },
            {
              tag: 'div',
              children: [
                { tag: 'span', text: 'liveTitle' },
                { tag: 'label', text: 'liveDate' }
              ]
            }
          ],
          width: 300
        }
      ],
      api: 'tables/goodslist/rltlive'
    }
  },
  hotlive: {
    events: {
      link
    },
    defaultSort: 'saleAmt,desc',
    condition: ['liveId'],
    column: [
      {
        key: 'taobaoGoodsName',
        title: '商品信息',
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
      {
        key: 'saleAmt',
        title: '销售额(估)',
        sortable: 'custom'
      },
      {
        key: 'saleQty',
        title: '销量(估)',
        sortable: 'custom'
      },
      {
        key: 'salePrice',
        title: '客单价(估)',
        sortable: 'custom'
      }
    ],
    goodsCnt: {
      name: '直播商品洞察',
      column: [],
      api: 'tables/hotlive/rltgoods'
    }
  },
  vip: {
    condition: [],
    column: [],
    events: {
      tax (param) {
        this.$store.commit('tables/taxOrder', param.row)
      }
    },
    record: {
      name: '购买记录',
      column: [
        // {
        //   key: 'orderId',
        //   title: '订单编号',
        //   width: 250
        // },
        // {
        //   key: 'goodsName',
        //   title: '商品',
        //   width: 200
        // },
        // {
        //   key: 'money',
        //   title: '支付金额',
        //   width: 100
        // },
        {
          key: 'validityTime',
          title: '有效期',
          width: 320,
          custom: [
            {
              tag: 'span',
              style: {
                margin: 'auto',
                float: 'none'
              },
              dyna: {
                param: 'validityTime',
                fn (date, row) {
                  return [new Date(row.rechargeTime), new Date(date)]
                    .map(v => formatDate(v, 'yyyy-MM-dd hh:mm:ss'))
                    .join(' 至 ')
                }
              }
            }
          ]
        },
        {
          key: 'orderState',
          title: '订单说明',
          width: 250
        },
        {
          key: 'id',
          title: '操作',
          width: 100,
          custom: [
            {
              tag: 'a',
              raw: '申请开票',
              events: {
                click: 'tax'
              }
            }
          ]
        }
      ],
      api: 'user/payrecord'
    }
  }
}
export default {
  namespaced: true,
  state: {
    ...config.tables,
    celldata: null,
    instHosts: null,
    taxOrder: null
  },
  getters: {},
  mutations: {},
  actions: {
    _setcelldata (store, { row, column, name }) {
      const key = column.key
      const data = Map[name]
      const events = data.events || {}
      const defaultSort = data.defaultSort || ''
      const cellcolumn = [...data.column]
      const condition = data.condition
      let i = 0
      data[key].column.forEach(v => {
        while (cellcolumn[i]) i++
        cellcolumn[i] = v
      })
      store.commit('celldata', {
        ...data[key],
        defaultSort,
        events,
        column: cellcolumn.filter(v => !!v),
        condition: condition.reduce((acc, v) => {
          acc[v] = row[v]
          return acc
        }, {})
      })
    },
    _getdata (store, { api, page, size, sort, condition }) {
      return Axios.get(api, {
        page: page - 1,
        size,
        sort,
        ...Object.entries(condition).reduce((acc, [k, v]) => {
          if (typeof v === 'object' && v !== null) {
            if (v.type === 'range') {
              acc['small_' + k] = v.value[0] * v.base
              acc['large_' + k] = v.value[1] * v.base
            } else if (v.type === 'select') {
              acc[k] = Array.isArray(v.value) ? v.value.join() : v.value
            } else if (v.type === 'cascader') {
              let arr = [v.value]
              if (v.options) {
                arr = arr.concat(v.options.children.map(v => v.value))
              }
              arr = arr.concat(
                arr.map(v => v.replace(/省|市|县|(自治(区|州))/, ''))
              )
              acc[k] = arr.join()
            } else {
              acc[k] = v.value
            }
          } else if (/^[0-9-/]+$/.test(v)) {
            acc[k] = v.toString().replace(/[-/]/g, '')
          } else if (v) {
            acc[k] = v
          }
          return acc
        }, {})
      }).then(res => {
        if (res.code > 400) {
          return res
        }
        res.content.forEach(v => {
          Object.entries(v).forEach(([k, v2]) => {
            if (!/(id)|(time)/i.test(k) && /^(-)?[0-9.]+$/.test(v2)) {
              v[k] = formatNumber(addNumberUnit(v2))
            }
            if (k === 'anchorType') {
              v[k] = MAP.hosttype[v2]
            }
            if (k === 'anchorId') {
              v.id = v2
            }
            if (k === 'premiereInfoDto') {
              v.follow = !!v2.follow
            }
            if (k in MAP) {
              const m = MAP[k]
              if (typeof m === 'object') {
                v[m.key] = m.pipe(v[k])
              } else {
                v[m] = v[k]
              }
            }
            if (
              typeof v2 === 'string' &&
              v2.length > 50 &&
              /[\u4e00-\u9fa5]+/.test(v2)
            ) {
              v[k] = v2.slice(0, 50) + '...'
            }
          })
        })
        console.log(res)
        return {
          data: res.content,
          total: res.totalElements
        }
      })
    }
  }
}
