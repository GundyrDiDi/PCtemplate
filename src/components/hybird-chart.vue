<template>
<div class="flex-col">
    <div class="p-title flex-ter">
        {{chartdata.title}}
    </div>
  <div class="chart animated" ref="c" v-loading="l" :class="l?'':'fadeIn'">
  </div>
</div>
</template>

<script>
export default {
  name: 'hybird-chart',
  props: ['chartdata', 'condition'],
  data () {
    return {
      l: false,
      ct: null
    }
  },
  watch: {
    chartdata: {
      handler () {
        this.getdata()
      }
      // immediate: true
    },
    condition () {
      this.getdata()
    }
  },
  methods: {
    series ({ item, line, area }, i) {
      return {
        type: 'bar',
        smooth: true,
        yAxisIndex: i
        // showSymbol: false,
        // itemStyle: {
        //   color: item,
        //   borderColor: '#f1f1f1',
        //   borderWidth: 1
        // }
      }
    },
    async getdata () {
      this.l = true
      let data = await this.chart_getkeydata({ ...this.chartdata, ...this.condition })
      // console.log(data)
      data = data.map(v => {
        delete v.totalUv
        return v
      })
      if (!data.length) return
      this.l = false
      this.ct.clear()
      const legend = []
      let axis = []
      const series = []
      let i = 0
      Object.entries(data[0]).reverse().forEach(([k, v]) => {
        if (!/Axis/.test(v.type)) {
          legend.push(v.name)
          series.push({
            name: v.name,
            type: v.type,
            smooth: true,
            barWidth: 30,
            yAxisIndex: Math.min(i++, 1),
            data: data.map(v2 => v2[k].value)
          })
        } else {
          axis = data.map(v2 => v2[k].value)
        }
      })
      this.option.legend.data = legend
      this.option.xAxis[0].data = axis
      this.option.series = series
      const name = [...legend]
      this.option.yAxis = name.map((v, i) => {
        const option = this.option._yAxis(v)
        option.nameTextStyle = {
          color: this.option.color[i]
        }
        option.axisLine = {
          lineStyle: {
            color: this.option.color[i]
          }
        }
        return option
      })
      this.ct.setOption(this.option)
    }
  },
  mounted () {
    this.ct = this.$echarts(this.$refs.c)
    this.events = {
      click (item) {
        console.log(item)
      }
    }
    Object.entries(this.events).forEach(([event, fn]) => {
      this.ct.on(event, fn)
    })
    this.option = {
      color: ['#b6a2de', '#2ec7c9', '#5ab1ef'],
      legend: {
        data: null
      },
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
        top: '12%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false }
        }
      ],
      _yAxis (name) {
        return {
          name,
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,.1)'
            }
          }
        }
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
