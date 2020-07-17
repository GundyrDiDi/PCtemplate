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
    series () {
    },
    async getdata () {
      this.l = true
      const data = await this.chart_getdata(this.chartdata)
      this.l = false
      this.ct.clear()
      console.log(data)
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
    }
  }
}
</script>

<style scoped lang="less">
.chart{
  flex:1;
}
</style>
