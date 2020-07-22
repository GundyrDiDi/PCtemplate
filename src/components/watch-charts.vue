<template>
<div class="watch-charts flex-col">
  <el-tabs v-model="actTab">
    <el-tab-pane
      v-for="v in chartdata"
      :key="v.name"
      :name="v.name"
      :label="v.title"
    ></el-tab-pane>
  </el-tabs>
  <div ref="c" class="chart animated" v-loading="l" :class="l?'':'fadeIn'">
  </div>
</div>
</template>

<script>
export default {
  name: 'watch-charts',
  props: ['chartdata', 'param'],
  data () {
    return {
      l: false,
      actTab: '',
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
          color: item,
          borderColor: '#f1f1f1',
          borderWidth: 1
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
            shadowColor: 'rgba(0,0,0, .3)',
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
      const tab = this.chartdata.find(v => v.name === this.actTab)
      const data = await this.chart_getdata(tab)
      this.l = false
      this.ct.clear()
      this.option.legend.data = data.map(v => v.name)
      this.option.series = data.map((v, i) => {
        v.data.forEach(v1 => (v1.value = [v1.name, v1.value]))
        return {
          ...v,
          ...this.lineStyle[i]
        }
      })
      this.option.yAxis = data.map(v => this.option._yAxis(v.name))
      console.log(this.option.yAxis)
      this.ct.setOption(this.option)
    }
  },
  watch: {
    async actTab () {
      this.getdata()
    }
  },
  mounted () {
    this.actTab = this.chartdata[0].name
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
        left: '3%',
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
          splitNumber: 4,
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
        item: '#3eb5dd',
        line: ['#57b3e5', '#31a9ea'],
        area: [[0, 0.6], [0.6, 0.2], [0.8, 0.1]]
      },
      {
        item: '#ff6b71',
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
<style>
.el-tabs__item {
  font-size: var(--xs2font);
  text-align: center;
}
</style>
