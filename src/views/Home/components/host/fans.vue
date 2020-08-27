<template>
  <div class="fans">
    <div class="t-title">
      粉丝画像
    </div>
    <el-alert v-show="example" type="warning"
      title="以下数据来源淘宝直播“雪梨_Cherie”，仅作为示例展示。">
    </el-alert>
    <transition enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
    mode="out-in"
    >
      <div v-if="!hide" key="t">
        <div class="flex">
          <template v-for="v in charts.fanspicture.slice(0,4)">
            <ring-chart :chartdata="v" :key="v.name"></ring-chart>
          </template>
        </div>
        <race-chart class="race-chart" :chartdata="charts.fanspicture[4]" @wrong="del"></race-chart>
      </div>
      <div v-else key="t2">
        <component :is="component" :label="label" :name="name" @example="setexample"></component>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'fans',
  props: ['name', 'label', 'index'],
  data () {
    return {
      hide: false,
      component: null,
      example: false
    }
  },
  methods: {
    setexample () {
      this.hide = false
      this.example = true
      const e = { anchorId: '791105148' } // 雪梨
      this.charts.fanspicture.forEach(v => {
        this.$set(v, 'example', e)
      })
    },
    del () {
      this.$set(this.hostDisplay, this.index, {
        ...this.hostDisplay[this.index],
        error: true
      })
    }
  },
  mounted () {
    const fn = this.myauth.hostDetail.hide
    if (fn) {
      const { hide, component } = fn(this.name)
      this.hide = hide
      this.component = component
    }
  }
}
</script>

<style scoped lang="less">
  .fans{
    min-height:20rem;
  }
  .flex{
    flex-wrap: wrap;
    >div{
      height:16rem;
      padding:0 1rem;
      width:50%
    }
  }
  .race-chart{
    margin-top:2rem;
    height:16rem;
    padding:0 5rem;
  }
  .t-title{
    padding-left:1rem;
    padding-bottom:.1rem;
    margin-bottom:.5rem;
    margin-right:0 !important;
    text-align: left;
    border-bottom:1px solid #ddd;
  }
      .el-alert{
        margin-bottom:.3rem;
      }
</style>
