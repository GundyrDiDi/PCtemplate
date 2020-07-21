<template>
  <div>
    <Table :loading="loading" size="small" :columns="column" :data="data"></Table>
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
export default {
  name: 'table-paganation',
  props: ['column', 'api', 'param', 'events', 'condition'],
  data () {
    return {
      data: [],
      total: 0,
      loading: false
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
    this.column.forEach(v => {
      if (v.action) {
        v.render = (h, param) => {
          return h('div', { class: 'table-action' },
            v.action.map(v2 => {
              return h('el-tooltip', {
                props: {
                  placement: 'top',
                  content: v2.tooltip,
                  openDelay: 400
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
      }
    })
  },
  methods: {
    dispatch ({ row, column }, event) {
      this.events[event].call(this, row, column)
    },
    async request () {
      this.loading = true
      const { api, param } = this
      const { data, total } = await this.tables_getdata({
        api,
        param
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
    i{
      margin-right:.5rem;
      font-size:var(--mfont);
      cursor: pointer;
        text-shadow: 0 1px 1px rgba(0,0,0,.3);
      &:hover{
        text-shadow: 0 1px 2px rgba(0,0,0,.5);
      }
    }
    .fa-star,.fa-star-o{
      color:#ffd334;
    }
    .fa-ellipsis-h{
      color:var(--prcol)
    }
  }
</style>
