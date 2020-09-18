<template>
  <div class="flex-center">
    <slot></slot>
    <div class="chart" ref="chart" :style="{transform:`scale(${scale})`}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'main-chart',
  data () {
    return {
      scale: 1
    }
  },
  props: ['chartData'],
  async mounted () {
    this.echart = echarts.init(this.$refs.chart)
    const ff = this[this.chartData]
    this.echart.setOption(ff)
    requestAnimationFrame(() => {
      this.scale = 0.5
    })
  }
}
</script>

<style scoped lang="less">
.flex-center{
  position: relative;
}
.chart {
  top:-6rem;
  position:absolute;
  height: 600px;
  width: 600px;
}
</style>
