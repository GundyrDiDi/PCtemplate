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
  name: 'word-chart',
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
    series () {
    },
    async getdata () {
      this.l = true
      const data = await this.chart_getkeydata({ ...this.chartdata, ...this.condition, num: 40 })
      this.l = false
      this.ct.clear()
      this.option.series[0].data = data.map((v, i) => {
        return {
          ...v,
          textStyle: {
            normal: {
              color: this.color[i % this.color.length]
            }
          }
        }
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
    this.color = [
      '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
      '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    this.option = {
      tooltip: {
        show: true,
        textStyle: {
          fontSize: '16'
        },
        formatter: '{b} <br/> {c}'
      },
      series: [{
        type: 'wordCloud',
        shape: 'cloud',
        name: '关键词排行',
        gridSize: 8,
        sizeRange: [12, 32],
        rotationRange: [0, 45],
        autoSize: {
          enable: true,
          minSize: 6
        }
      }]
    }
  }
}
</script>

<style scoped lang="less">
.chart{
  flex:1;
}
</style>
