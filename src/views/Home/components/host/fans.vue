<template>
  <div class="fans">
    <div class="t-title">
      粉丝画像
    </div>
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
      component: null
    }
  },
  methods: {
    setexample () {
      // this.hide = false
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
    height:20rem;
    padding:0 5rem;
  }
  .t-title{
    margin-left:1rem;
    margin-bottom:.5rem;
    text-align: left;
  }
</style>
