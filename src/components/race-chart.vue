<template>
<div class="flex-col">
    <div class="p-title flex-ter">
        {{chartdata.title}}
    </div>
    <div v-if="nulldata">暂无数据</div>
  <div class="chart animated" ref="c" v-loading="l" :class="l?'':'fadeIn'">
  </div>
</div>
</template>

<script>
export default {
  name: 'race-chart',
  props: ['chartdata'],
  data () {
    return {
      l: false,
      ct: null,
      nulldata: false
    }
  },
  watch: {
    chartdata: {
      handler () {
        this.getdata()
      },
      immediate: true
    }
  },
  methods: {
    series () {
    },
    async getdata () {
      this.l = true
      const data = await this.chart_getkeydata(this.chartdata)
      if ((!data) || (!data.length)) {
        this.$emit('wrong')
      }
      this.l = false
      this.ct.clear()
      this.option.yAxis = {
        type: 'category',
        data: data.map(v => v.name)
      }
      this.option.series = {
        type: 'bar',
        data: data.map(v => v.value)
      }
      this.ct.setOption(this.option)
    }
  },
  mounted () {
    this.ct = this.$echarts(this.$refs.c)
    this.events = {}
    Object.entries(this.events).forEach(([event, fn]) => {
      this.ct.on(event, fn)
    })
    this.option = {
      color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '5%',
        top: '6%',
        // 是否包括坐标轴上的label
        containLabel: true
      },
      xAxis: {
        type: 'value'
      }
    }
  }
}
</script>

<style scoped lang="less">
.chart{
  flex:1;
}
</style>
