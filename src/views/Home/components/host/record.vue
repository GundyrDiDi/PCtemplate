<template>
  <div class="record">
    <date-pick class="flex-center" :time.sync="time"></date-pick>
    <table-paganation ref="table" :condition="condition" v-bind="hostrecord"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      time: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()]
    }
  },
  watch: {
    time () {
      this.$refs.table.resetParam()
    }
  },
  computed: {
    condition () {
      return {
        liveStartTime: this.time[0],
        liveEndTime: this.time[1]
      }
    }
  }
}
</script>

<style scoped lang="less">
  .flex-center{
    margin-bottom:1rem;
  }
</style>
