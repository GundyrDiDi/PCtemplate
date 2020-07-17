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
  mounted () {
    this.echart = echarts.init(this.$refs.chart)
    this.echart.setOption(this[this.chartData])
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
