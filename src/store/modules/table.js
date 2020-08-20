import config, { MAP } from '@/.config.js'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
const Map = {
  inst: {
    condition: ['mechanismId', 'monthId'],
    column: [
      null,
      {
        key: 'cooperate_cnt',
        title: '本月合作次数',
        sortable: 'custom'
      },
      {
        key: 'sale_amt',
        title: '销售额(估)',
        sortable: 'custom'
      },
      {
        key: 'sale_qty',
        title: '销量(估)',
        sortable: 'custom'
      }
    ],
    mechanismGoodsCnt: {
      name: '合作商品洞察',
      column: [
        {
          key: 'taobao_goods_name',
          title: '商品信息',
          custom: [
            {
              tag: 'img',
              src: 'goods_img'
            },
            { tag: 'span', text: 'taobao_goods_name' }
          ],
          width: 300
        }
      ],
      api: 'tables/inslist/rltgood'
    },
    mechanismShopsCnt: {
      name: '合作商家洞察',
      column: [
        {
          key: 'taobao_shop_name',
          title: '店铺信息',
          custom: [
            {
              tag: 'img',
              src: 'shop_img'
            },
            { tag: 'span', text: 'taobao_shop_name' }
          ],
          width: 300
        }
      ],
      api: 'tables/inslist/rltshop'
    }
  },
  goods: {
    condition: ['taobaoGoodsId', 'monthId'],
    column: [
      null,
      {
        key: 'anchor_name',
        title: '主播',
        custom: [
          {
            tag: 'img',
            src: 'anchor_img'
          },
          {
            tag: 'div',
            children: [
              { tag: 'span', text: 'anchor_name' },
              { tag: 'label', text: 'fans_num', raw: ' 粉丝' }
            ]
          }
        ],
        width: 300
      },
      {
        key: 'sale_amt',
        title: '销售额(估)',
        sortable: 'custom'
      },
      {
        key: 'sale_qty',
        title: '销量(估)',
        sortable: 'custom'
      }
    ],
    anchorsCnt: {
      name: '直播商品洞察',
      column: [],
      api: 'tables/goodslist/rlthost'
    },
    liveCnt: {
      name: '直播商品洞察',
      column: [
        {
          key: 'live_title',
          title: '直播信息',
          custom: [
            {
              tag: 'img',
              src: 'live_img'
            },
            {
              tag: 'div',
              children: [
                { tag: 'span', text: 'live_title' },
                { tag: 'label', text: 'live_date' }
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
    condition: ['liveId'],
    column: [
      {
        key: 'taobaoGoodsName',
        title: '商品信息',
        custom: [
          {
            tag: 'img',
            src: 'goodsImg'
          },
          { tag: 'span', text: 'taobaoGoodsName' }
        ],
        width: 300
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
  }
}
export default {
  namespaced: true,
  state: {
    ...config.tables,
    celldata: null
  },
  getters: {},
  mutations: {},
  actions: {
    _setcelldata (store, { row, column, name }) {
      console.log(row)
      const key = column.key
      const data = Map[name]
      const cellcolumn = [...data.column]
      const condition = data.condition
      let i = 0
      data[key].column.forEach(v => {
        while (cellcolumn[i]) i++
        cellcolumn[i] = v
      })
      store.commit('celldata', {
        ...data[key],
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
            if (!/id/i.test(k) && /^[0-9.]+$/.test(v2)) {
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
          })
        })
        return {
          data: res.content,
          total: res.totalElements
        }
      })
    }
  }
}
