<template>
<div class="good">
  <div class="t-title">
    商品分析
  </div>
  <transition enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
    mode="out-in"
    >
    <div v-if="!hide" key="t">
      <table-paganation ref="table" v-bind="hostgood" :condition="{}"></table-paganation>
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
      component: null
    }
  },
  methods: {
    setexample () {
      this.hide = false
    }
  },
  mounted () {
    const fn = this.myauth.hostDetail.hide
    if (fn) {
      const { hide, component } = fn(this.name)
      this.hide = hide
      this.component = component
    }
    this.$refs.table.request()
  }
}
</script>

<style scoped lang="less">
  .good{
    min-height:20rem;
  }
  .t-title{
    margin-left:1rem;
    margin-bottom:.5rem;
    text-align: left;
  }
</style>
