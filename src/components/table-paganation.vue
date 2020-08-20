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
  props: ['column', 'api', 'events', 'condition', 'debounce', 'sortvalid', 'listvalid', 'defaultSort'],
  data () {
    return {
      data: [],
      total: 0,
      loading: false,
      param: {}
    }
  },
  computed: {
    sizeOpts () {
      return this.param.sizeOpts
    },
    size: {
      get () { return this.param.size },
      set (val) {
        this.param.page = 1
        this.param.size = val
        this.request()
      }
    },
    page: {
      get () { return this.param.page },
      set (val) {
        const page = this.param.page
        this.param.page = val
        // auth
        const num = (val - 1) * this.param.size
        let p
        if (this.listvalid && (p = this.listvalid(num))) {
          p.then(res => {
            requestAnimationFrame(() => {
              this.param.page = page
            })
          })
          return
        }
        this.request()
      }
    }
  },
  watch: {
    condition () {
      this.request()
    }
  },
  methods: {
    dispatch (event, ...rest) {
      this.events[event].apply(this, rest)
    },
    resetParam () {
      this.param = {
        size: 10,
        sizeOpts: [10, 20, 30, 40],
        page: 1,
        sort: this.defaultSort
      }
    },
    sortchange ({ column, key, order }) {
      // auth
      if (this.sortvalid) {
        this.sortvalid().then(res => {
          document
            .querySelector(`.ivu-icon.ivu-icon-md-arrow-drop${order === 'normal' ? 'up' : order === 'asc' ? 'up.on' : 'down.on'}`)
            .classList.remove('on')
        })
        return
      }
      this.param.sort = order === 'normal' ? this.defaultSort : key + ',' + order
      this.request()
    },
    async request () {
      this.loading = true
      const { api, param, condition } = this
      const { data, total, code } = await this.tables_getdata({
        api,
        condition,
        ...param
      })
      this.loading = false
      // auth
      if (code) {
        return this.$block('您的查询次数已用尽，')
      }
      // auth
      const { size, page } = this.param
      if (data.length > size) {
        this.data = data.slice((page - 1) * size, page * size)
      } else {
        this.data = data
      }
      this.total = total
    }
  },
  created () {
    if (this.debounce) {
      this.request = debounce.call(this, this.request, this.debounce)
    }
    function custom (h, param, v) {
      return v.map(v2 => {
        const { tag, text, props, events, children = [], raw, style = {}, ...attrs } = v2
        for (const k in attrs) {
          attrs[k] = param.row[attrs[k]]
        }
        const on = {}
        for (const k in events) {
          const event = events[k]
          on[k] = () => {
            this.dispatch(event, param)
          }
        }
        return h(tag, {
          class: 'table-' + tag, on, attrs, props, style
        }, [
          text ? param.row[text] : undefined,
          raw || undefined,
          ...custom.call(this, h, param, children)
        ])
      })
    }
    this.column.forEach(v => {
      v.align = v.align || 'center'
      if (v.custom) {
        v.render = (h, param) => {
          return custom.call(this, h, param, v.custom)
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
                      this.dispatch(v2.event, param)
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
                      this.dispatch(event, v2[el.param])
                    }
                  }
                })
              ])
            })
          )
        }
      }
    })
    this.resetParam()
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
  .table-div{
    height: 60px;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    text-align: left;
    label{
      color:#999;
      transform:translateY(-4px);
      font-size:var(--xxsfont);
    }
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
