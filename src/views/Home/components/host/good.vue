<template>
<div class="good">
  <div class="t-title">
    商品分析
  </div>
  <el-alert v-show="example" type="warning"
    title="以下数据来源淘宝直播“雪梨_Cherie”,仅作为示例展示。">
  </el-alert>
  <transition enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
    mode="out-in"
    >
    <div v-if="!hide" key="t">
      <table-paganation ref="table" v-bind="hostgood" :condition="example?example:{}"></table-paganation>
    </div>
    <div v-else key="t2">
      <component :is="component" :label="label" :name="name" @example="setexample"></component>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'good',
  props: ['name', 'label'],
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
      this.example = { anchorId: '791105148' } // 雪梨
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
  .good{
    min-height:20rem;
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
