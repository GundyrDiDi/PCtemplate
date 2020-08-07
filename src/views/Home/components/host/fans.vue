<template>
  <div>
    <div class="flex">
      <ring-chart v-for="v in charts.fanspicture.slice(0,4)" :key="v.name" :chartdata="v"></ring-chart>
    </div>
    <race-chart class="race-chart" :chartdata="charts.fanspicture[4]"></race-chart>
  </div>
</template>

<script>
export default {
  name: 'fans',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .flex{
    flex-wrap: wrap;
    >div{
      height:16rem;
      padding:0 1rem;
      width:50%
    }
  }
  .race-chart{
    margin-top:2rem;
    height:20rem;
    padding:0 5rem;
  }
</style>
