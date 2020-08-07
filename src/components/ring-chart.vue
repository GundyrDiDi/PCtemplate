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
import { formatNumber } from '@/plugins/util'
export default {
  name: 'ring-chart',
  props: ['chartdata'],
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
      },
      immediate: true
    }
  },
  methods: {
    series ({ radius = ['35%', '60%'], borderWidth = 3 }) {
      return {
        type: 'pie',
        radius,
        center: ['50%', '45%'],
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth
          }
        },
        label: {
          show: false
        }
      }
    },
    async getdata () {
      this.l = true
      const data = await this.chart_getkeydata(this.chartdata)
      this.l = false
      this.ct.clear()
      this.option.title.text = `{name|总数}\n{val|${formatNumber(data.reduce((acc, v) => acc + parseInt(v.value), 0))}}`
      this.option.series = { ...this.ringStyle, data }
      this.ct.setOption(this.option)
    }
  },
  mounted () {
    this.ct = this.$echarts(this.$refs.c)
    this.events = {
      mouseover (item) {
        console.log(item)
      }
    }
    Object.entries(this.events).forEach(([event, fn]) => {
      this.ct.on(event, fn)
    })
    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}<br />( {d}% )'
      },
      color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
      title: {
        top: '35%',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 16,
              color: '#333',
              padding: [10, 0]
            },
            val: {
              fontSize: 16,
              color: '#299eff'
            }
          }
        }
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        x: 'center',
        y: '85%',
        itemWidth: 13,
        itemHeight: 13,
        align: 'left',
        textStyle: {
          rich: {
            name: {
              fontSize: 13,
              padding: [-2, 10, 0, 3]
            }
          }
        },
        formatter: function (name) {
          return `{name|${name}}`
        }
      }
    }
    this.ringStyle = this.series({})
  }
}
</script>

<style scoped lang="less">
.chart{
  flex:1;
}
</style>
