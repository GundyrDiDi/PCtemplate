<template>
  <Modal v-model="_show" width="70vw" style="text-align:center">
    <header slot="header" class="p-title">
      {{celldata&&celldata.name}}
    </header>
    <section style="max-height:60vh;overflow:auto">
        <table-paganation v-if="celldata" v-bind="celldata" ref="table"></table-paganation>
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

<style>

</style>
