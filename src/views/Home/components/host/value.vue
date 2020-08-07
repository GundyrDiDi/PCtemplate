<template>
  <div class="value">
    <date-pick class="flex-center" :time.sync="time"></date-pick>
    <watch-charts :chartdata="charts.hostvalue" :condition="time"></watch-charts>
  </div>
</template>

<script>
export default {
  name: 'value',
  data () {
    return {
      time: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()]
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
</style>
