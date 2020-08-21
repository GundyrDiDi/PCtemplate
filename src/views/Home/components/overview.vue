<template>
  <div class="grid">
    <div class="module-box flex-ter">
      <div class="t-title" style="margin-right:10rem">淘宝直播大盘</div>
      <date-pick :time.sync="time"></date-pick>
    </div>
    <watch-charts class="module-box" :chartdata="charts.watch" :condition="condition"></watch-charts>
    <ring-chart class="module-box" :chartdata="charts.ring[0]" :condition="condition"></ring-chart>
    <ring-chart class="module-box" :chartdata="charts.ring[1]" :condition="condition"></ring-chart>
    <map-chart class="module-box" :chartdata="charts.map[0]" :condition="condition"></map-chart>
    <word-chart class="module-box" :chartdata="charts.keyword[0]" :condition="condition"></word-chart>
    <hybird-chart class="module-box" :chartdata="charts.hybird[0]" :condition="condition"></hybird-chart>
  </div>
</template>

<script>
export default {
  name: 'overview',
  data () {
    return {
      time: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
      condition: {}
    }
  },
  watch: {
    time (newval, oldval) {
      const fn = this.myauth.hostDetail.time
      if (fn && fn.call(this, newval, oldval, 'time')) return
      this.condition = {
        startTime: this.time[0],
        endTime: this.time[1]
      }
    }
  }
}
</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3rem 1fr 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  height:80vw;
  padding-bottom:3rem;
}
.module-box:nth-child(1) {
  grid-area: 1/1/2/4;
}
.module-box:nth-child(2) {
  grid-area: 2/1/3/3;
}
.module-box:nth-child(3) {
  grid-area: 2/3/3/4;
}
.module-box:nth-child(4) {
  grid-area: 3/1/4/span 1;
}
.module-box:nth-child(5) {
  grid-area: 3/2/4/span 1;
}
.module-box:nth-child(6) {
  grid-area: 3/3/4/span 1;
}
.module-box:nth-child(7) {
  grid-area: 4/1/5/4;
}
</style>
