<template>
<div class="flex-center">
  <div ref="c" class="chart animated" v-loading="l" :class="l?'':'fadeIn'" style="height:440px">
  </div>
</div>
</template>

<script>
import { debounce } from '@/plugins/util'
export default {
  name: 'watch-charts',
  props: ['chartdata', 'condition'],
  data () {
    return {
      l: false,
      ct: null
    }
  },
  methods: {
    series ({ item, line, area }, i) {
      return {
        type: 'line',
        smooth: true,
        yAxisIndex: i,
        // showSymbol: false,
        itemStyle: {
          color: item
          // borderColor: '#f1f1f1',
          // borderWidth: 1
        },
        lineStyle: {
          normal: {
            width: 3,
            color: {
              type: 'linear',
              colorStops: line.map((v, i, { length }) => {
                return {
                  offset: i / (length - 1),
                  color: v
                }
              }),
              globalCoord: false // 缺省为 false
            },
            shadowColor: 'rgba(0,0,0, .05)',
            shadowBlur: 5,
            shadowOffsetY: 5
          }
        },
        areaStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              area.map(([offset, col]) => {
                return { offset, color: item + (parseInt(col * 255).toString(16).padStart(2, '0')) }
              }),
              false
            )
          }
        }
      }
    },
    async getdata () {
      this.l = true
      const data = await this.chart_getmuldata({ ...this.chartdata, ...this.condition })
      this.l = false
      this.ct.clear()
      console.log(data)
      data.forEach((v, i, arr) => {
        v.data = v.data.sort((a, b) => {
          return new Date(a.name).getTime() - new Date(b.name).getTime()
        })
      })
      this.option.legend.data = data.map(v => v.name)
      if (this.option.legend.data.length < 2) {
        this.option.legend.show = false
      } else {
        this.option.legend.show = true
      }
      // time轴
      this.option.series = data.map((v, i) => {
        v.data.forEach(v1 => (v1.value = [v1.name, v1.value]))
        return {
          ...v,
          ...this.lineStyle[i]
        }
      })
      // category轴
      // this.option.series = data.map((v, i) => {
      //   return {
      //     data: v.data.map(v => v.value),
      //     ...this.lineStyle[i]
      //   }
      // })
      // this.option.xAxis.data = data[0].data.map(v => v.name)
      this.option.yAxis = data.map(v => this.option._yAxis(v.name))
      this.ct.setOption(this.option)
    }
  },
  watch: {
    chartdata: {
      handler () {
        this.getdata()
      }
    },
    condition () {
      this.getdata()
    }
  },
  mounted () {
    this.getdata = debounce.call(this, this.getdata, 300)
    this.ct = this.$echarts(this.$refs.c)
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: null
      },
      grid: {
        left: '-17%',
        right: '3%',
        bottom: '5%',
        top: '12%',
        // 是否包括坐标轴上的label
        containLabel: true
      },
      // dataZoom: [{
      //   type: 'inside',
      //   start: 0,
      //   end: 100
      // }],
      xAxis: {
        type: 'time',
        // type: 'category',
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      _yAxis (name) {
        return {
          name,
          type: 'value',
          show: false,
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,.1)'
            }
          }
        }
      }
    }
    this.lineStyle = [
      {
        item: '#31a9ea',
        line: ['#57b3e5', '#31a9ea'],
        area: [[0, 0.6], [0.6, 0.2], [0.8, 0.1]]
      },
      {
        item: '#ff874b',
        line: ['#ff874b', '#ff6b71'],
        area: [[0, 0.6], [0.6, 0.2], [0.8, 0.1]]
      }
    ].map((v, i) => this.series(v, i))
  }
}
</script>

<style scoped lang="less">
.chart{
  flex:1;
}
</style>
