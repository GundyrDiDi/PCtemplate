<template>
  <div class="grid">
    <div class="module-box flex-center">
      <date-pick></date-pick>
    </div>
    <div class="module-box">
      <watch-charts></watch-charts>
    </div>
    <div class="module-box"></div>
    <div class="module-box"></div>
    <div class="module-box"></div>
    <div class="module-box"></div>
    <div class="module-box"></div>
  </div>
</template>

<script>
import datePick from '@/components/date-pick'
import watchCharts from '@/components/watch-charts'
export default {
  name: '',
  components: {
    datePick,
    watchCharts
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3rem 1fr 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  height:75vw;
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
