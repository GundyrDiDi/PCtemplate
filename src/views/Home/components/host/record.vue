<template>
  <div class="record">
    <div class="flex-center">
      <div class="t-title">直播记录</div>
      <date-pick class="flex-center" :time.sync="time"></date-pick>
    </div>
    <table-paganation class="table" ref="table" :condition="condition" v-bind="hostrecord"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      time: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      condition: {}
    }
  },
  watch: {
    time (newval, oldval) {
      const fn = this.myauth.hostDetail.time2
      if (fn && fn.call(this, newval, oldval, 'time')) return
      this.$refs.table.resetParam()
      this.condition = {
        liveStartTime: this.time[0],
        liveEndTime: this.time[1]
      }
    }
  }
}
</script>

<style scoped lang="less">
.flex-center{
  position:relative;
  >.t-title{
    position:absolute;
    left:1rem;
  }
}
  .table{
    margin:1rem 0;
  }
</style>
