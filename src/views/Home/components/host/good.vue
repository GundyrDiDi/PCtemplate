<template>
  <div>
    <table-paganation ref="table" v-bind="hostgood" :condition="{}"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'good',
  data () {
    return {}
  },
  mounted () {
    this.$refs.table.request()
  }
}
</script>

<style scoped lang="less">

</style>
