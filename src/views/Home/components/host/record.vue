<template>
  <div class="record" id="record">
    <div class="flex-center">
      <div class="t-title">直播记录</div>
      <date-pick class="flex-center" :time.sync="time"></date-pick>
    </div>
    <table-paganation
    class="table" ref="table"
    :condition="condition"
    v-bind="hostrecord"
    :lockvalid="myauth.hostDetail.lock"
    ></table-paganation>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/util'
export default {
  name: 'record',
  data () {
    const newdate = this.$store.state.user.newdate
    return {
      time: [
        new Date(newdate - 7 * 24 * 60 * 60 * 1000),
        new Date(newdate)
      ].map(v => formatDate(v, 'yyyy-MM-dd')),
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
  },
  created () {
    // 不重复请求
    this.condition = {
      liveStartTime: this.time[0],
      liveEndTime: this.time[1]
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
