<template>
  <div class="value">
    <div class="flex-center">
      <div class="t-title">主播数据</div>
      <date-pick class="flex-center" :time.sync="time"></date-pick>
    </div>
    <watch-charts
      :tabvalid="myauth.hostDetail.tabs"
      :chartdata="charts.hostvalue" :condition="condition"></watch-charts>
  </div>
</template>

<script>
export default {
  name: 'value',
  data () {
    return {
      time: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      condition: {}
    }
  },
  watch: {
    time (newval, oldval) {
      const fn = this.myauth.hostDetail.time
      if (fn && fn.call(this, newval, oldval, 'time')) return
      this.condition = {
        startTime: newval[0],
        endTime: newval[1]
      }
    }
  }
}
</script>

<style scoped lang="less">
.value{
  .watch-charts{
    height:20rem;
    margin:1rem 4rem;
  }
}
.flex-center{
  position:relative;
  >.t-title{
    position:absolute;
    left:1rem;
  }
}
</style>
