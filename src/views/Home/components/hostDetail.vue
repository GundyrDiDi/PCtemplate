<template>
  <anchor-menu id="hostDetail" :tabs="hostDisplay" :nav-class="'module-box'" :threshold="200">
    <template v-slot:nav>
      <el-breadcrumb class="crumb">
        <el-breadcrumb-item v-for="v in crumb" :key="v.name" :to="v.path">{{v.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template class="content" v-for="v in proxy" v-slot:[v.name]>
      <component class="module-box" :key="v.name" :is="v.component" v-bind="v"></component>
    </template>
  </anchor-menu>
</template>

<script>
export default {
  name: 'hostDetail',
  data () {
    return {
      index: 0,
      top: 0,
      crumb: [],
      proxy: []
    }
  },
  created () {
    const match = this.myroute.history.slice(-2)
    this.crumb = match.length === 1 ? match[0].matched.slice(-2) : match

    this.proxy = this.hostDisplay.slice(0, 2)
    setTimeout(e => {
      this.proxy = this.hostDisplay
    }, 1000)
  }
}
</script>

<style scoped lang="less">
#hostDetail {
  height: calc(100% + 2rem);
  width: calc(100% + 2rem) !important;
  top: -1rem;
  left: -1rem;
}
.crumb {
  line-height: 1rem;
}
</style>
<style lang="less">
#hostDetail {
  .module-box {
    margin: 1rem;
    position:relative;
    z-index:0;
    > .menu {
      width: 25rem;
    }
  }
}
</style>
