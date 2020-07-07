<template>
  <div>
    <slot></slot>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'main-chart',
  data () {
    return {
      chart: null
    }
  },
  props: ['type'],
  mounted () {
    this.echart = echarts.init(this.$refs.chart)
    this.echart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          type: 'category',
          data: ['2011', '2012', '2013', '2018', '2019', '2020'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'Ⅳ～Ⅴ类',
          type: 'line',
          data: [40.11, 39.56, 36.96, 37.05, 35.71, 25.33],
          lineStyle: {
            normal: {
              width: 8,
              color: {
                type: 'linear',

                colorStops: [
                  {
                    offset: 0,
                    color: '#A9F387' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#48D8BF' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderWidth: 40,
              /* shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100, */
              borderColor: '#A9F387'
            }
          },
          smooth: true
        }
      ]
    })
  }
}
</script>

<style scoped lang="less">
.chart {
  height: 300px;
  width: 100%;
}
</style>
