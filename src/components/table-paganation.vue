<template>
  <div>
    <Table :loading="loading" size="small" :columns="column" :data="data"
    @on-sort-change="sortchange"
    ></Table>
    <Page
    v-if="data.length<=total"
    :total="total"
    show-sizer
    show-elevator
    show-total
    :current.sync="page"
    :page-size="size"
    :page-size-opts="sizeOpts"
    @on-page-size-change="size=$event"
    class-name="my-page"
    />
  </div>
</template>

<script>
import { debounce } from '@/plugins/util'
export default {
  name: 'table-paganation',
  props: ['column', 'api', 'events', 'condition', 'debounce'],
  data () {
    return {
      data: [],
      total: 0,
      loading: false,
      param: {
        sort: null,
        size: 10,
        sizeOpts: [10, 20, 30, 40],
        page: 1
      }
    }
  },
  computed: {
    sizeOpts () {
      return this.param.sizeOpts
    },
    size: {
      get () { return this.param.size },
      set (val) {
        this.param.size = val
        this.request()
      }
    },
    page: {
      get () { return this.param.page },
      set (val) {
        this.param.page = val
        this.request()
      }
    }
  },
  watch: {
    condition () {
      this.request()
    }
  },
  created () {
    if (this.debounce) {
      this.request = debounce.call(this, this.request, this.debounce)
    }
    this.column.forEach(v => {
      v.align = v.align || 'center'
      if (v.custom) {
        v.render = (h, param) => {
          return v.custom.map(v2 => {
            const { tag, text, props, ...attrs } = v2
            for (const k in attrs) {
              attrs[k] = param.row[attrs[k]]
            }
            return h(tag, {
              class: 'table-' + tag, attrs, props
            }, text ? param.row[text] : undefined)
          })
        }
      } else if (v.action) {
        v.render = (h, param) => {
          return h('div', { class: 'table-action' },
            v.action.map(v2 => {
              if (v2.change) {
                const i = param.row[v2.change] ? 1 : 0
                v2.tooltip = v2.tooltips[i]
                v2.class = v2.classes[i]
              }
              return h('el-tooltip', {
                props: {
                  placement: 'top',
                  content: v2.tooltip,
                  openDelay: 200,
                  hideAfter: 1000
                }
              }, [
                h('i', {
                  class: v2.class,
                  on: {
                    [v2.on]: () => {
                      this.dispatch(param, v2.event)
                    }
                  }
                })
              ])
            })
          )
        }
      } else if (v.async) {
        const { event, tooltip, el } = v.async
        v.render = (h, param) => {
          return h('div', { class: 'table-async' },
            param.row[v.key].map(v2 => {
              return h('el-tooltip', {
                props: {
                  placement: 'top',
                  content: v2[tooltip],
                  openDelay: 200
                }
              }, [
                h(el.tag, {
                  attrs: {
                    src: v2[el.src]
                  },
                  on: {
                    [el.on]: () => {
                      this.dispatch(v2[el.param], event)
                    }
                  }
                })
              ])
            })
          )
        }
      }
    })
  },
  methods: {
    dispatch (param, event) {
      this.events[event].call(this, param)
    },
    resetParam () {
      this.param = {
        sort: null,
        size: 10,
        sizeOpts: [10, 20, 30, 40],
        page: 1
      }
    },
    sortchange ({ key, order }) {
      this.param.sort = order === 'normal' ? '' : key + ',' + order
      this.request()
    },
    async request () {
      this.loading = true
      const { api, param, condition } = this
      const { data, total } = await this.tables_getdata({
        api,
        condition,
        ...param
      })
      this.loading = false
      this.data = data
      this.total = total
    }
  }
}
</script>

<style scoped lang="less">
  .my-page{
    margin:1rem 0;
  }
</style>
<style lang="less">
  .table-action{
    display: flex;
    justify-content: space-around;
    padding:5px 0;
    i{
      font-size:var(--mfont);
      outline: none;
      cursor: pointer;
        text-shadow: 0 1px 1px rgba(0,0,0,.3);
      &:hover{
        text-shadow: 0 1px 2px rgba(0,0,0,.5);
      }
    }
    .fa-star,.fa-star-o{
      color:#ffd334;
    }
    .fa-play{
      color:var(--prcol)
    }
    .fa-ellipsis-h{
      color:var(--prcol)
    }
  }
  .table-async{
    display: flex;
    justify-content: center;
    >img{
      float:left;
      height:40px;
      width:40px;
      border-radius:50%;
      margin:10px;
      cursor:pointer;
    }
  }
  .ivu-table-cell{
    padding-left:12px;
    padding-right:12px;
  }
  .table-img{
    float:left;
    height:40px;
    width:40px;
    border-radius:50%;
    margin:10px;
  }
  .table-span{
    float:left;
    height:60px;
    width: calc(100% - 60px);
    display: flex;
    text-align:left;
    align-items: center;
  }
</style>
