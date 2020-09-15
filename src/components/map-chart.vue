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
  name: 'map-chart',
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
    async getdata () {
      this.l = true
      const data = await this.chart_getkeydata({ ...this.chartdata, ...this.condition, example: { num: 40 } })
      this.l = false
      this.ct.clear()
      this.ct.setOption(this.option({
        data: data.map(v => {
          return v || 0
        }),
        name: '直播场次',
        min: data.reduce((acc, v) => Math.min(acc, v.value), Infinity),
        max: data.reduce((acc, v) => Math.max(acc, v.value), 0)
      }))
    }
  },
  mounted () {
    this.ct = this.$echarts(this.$refs.c)
    this.events = {
      mouseover () {}
    }
    Object.entries(this.events).forEach(([event, fn]) => {
      this.ct.on(event, fn)
    })
    this.option = function (
      {
        name = '',
        mapType = 'china',
        rangeColor = ['rgba(159,205,253,0.1)', '#0b6fbc'],
        min = 0,
        max = 500,
        shadowColor = '#60ACFC',
        areaColor = '#fff',
        emphColor = '#ff90cdcc',
        data = []
      }
    ) {
      return {
        tooltip: {
          trigger: 'item',
          formatter: function (e) {
            return `${e.name}<br/>${e.seriesName} : ${e.value}`
          }
        },
        visualMap: {
          type: 'continuous',
          min,
          max,
          left: 0,
          itemWidth: 12,
          itemHeight: 60,
          //   seriesIndex: [0, 2],
          //   text: ['多', '少'],
          dimension: 0,
          realtime: false,
          calculable: true,
          inRange: {
            color: rangeColor,
            symbolSize: [100, 100]
          },
          outOfRange: {
            color: ['#eeeeee'],
            symbolSize: [100, 100]
          }
        },
        series: [{
          type: 'map',
          name,
          mapType,
          data,
          left: 'center',
          width: '100%',
          // roam: true,
          zoom: 1,
          label: {
            emphasis: {
              textStyle: {
                color: 'transparent',
                fontWeight: 'bold'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor,
              borderColor: '#fff',
              shadowColor,
              shadowBlur: 1,
              shadowOffsetY: 1
            },
            emphasis: {
              areaColor: emphColor
            }
          }
        }]
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
