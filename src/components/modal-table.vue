<template>
  <Modal v-model="_show" width="70vw" style="text-align: center">
    <header slot="header" class="p-title">
      {{ celldata && celldata.name }}
    </header>
    <section style="max-height: 60vh; overflow: auto">
      <div class="flex-bwn header" v-if="celldata && celldata.header">
        <div v-for="v in celldata.header" :key="v.name">
          <template v-if="v.name">
            <div>{{ v.name }}</div>
            <div>{{ v.value }}</div>
          </template>
          <img style="height: 4rem" v-else :src="v.value" alt="" />
        </div>
      </div>
      <table-paganation
        v-if="celldata"
        v-bind="celldata"
        ref="table"
      ></table-paganation>
    </section>
    <footer slot="footer"></footer>
  </Modal>
</template>

<script>
export default {
  name: 'modal-table',
  data () {
    return {}
  },
  computed: {
    _show: {
      get () {
        return !!this.celldata
      },
      set () {
        this.$store.commit('tables/celldata', null)
      }
    }
  },
  watch: {
    celldata (newval) {
      if (newval) {
        // requestAnimationFrame(() => {
        //   this.$refs.table.request()
        // })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  margin-bottom: 1rem;
  width:99%;
  padding: 0.3rem 1% 0.2rem 1%;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  div>div:first-child{
    font-weight: 600;
    line-height:2.5rem;
  }
  font-size:var(--xs2font)
}
</style>
