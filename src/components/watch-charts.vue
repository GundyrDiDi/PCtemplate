<template>
<div>
  <el-tabs v-model="actTab">
    <el-tab-pane
      v-for="v in tabs"
      :key="v.name"
      :name="v.name"
      :label="v.title"
    ></el-tab-pane>
  </el-tabs>
  <div class="chart">
      <!-- 1111111111 -->
  </div>
</div>
</template>

<script>
export default {
  name: 'watch-charts',
  data () {
    return {
      actTab: '',
      tabs: []
    }
  },
  mounted () {
    this.actTab = this.charts.watch[0].name
    this.tabs = this.charts.watch
  },
  watch: {
    async actTab (tab) {
      // let data=await this.chart_getdata(this.tabs.find(v => v.name === tab))

    }
  }
}
</script>

<style scoped lang="less">

</style>
<style>
.el-tabs__item {
  font-size: var(--xs2font);
  text-align: center;
}
</style>
