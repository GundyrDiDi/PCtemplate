<template>
  <el-menu :collapse="collapse" :default-active="activeIndex">
    <el-menu-item v-for="(v,i) in treemenu" :key="i" :index="i.toString()">
      <div @click="go(v,i)" class="menu-item" :class="{active:i.toString()===activeIndex}">
        <!-- <img :src="imgs[v.name]" alt=""> -->
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title" class="menu-title">{{v.meta.title}}</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'tree-menu',
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    go (route, i) {
      if (route.name !== this.$route.name) {
        this.$router.push(route)
        this.activeIndex = i.toString()
      }
    }
  },
  mounted () {
    this.activeIndex = (this.treemenu.findIndex(v => v.name === this.$route.name)).toString()
  },
  props: ['collapse']
}
</script>

<style scoped lang="less">
.menu-item{
    margin: 0 -20px;
    padding: 0 20px;
    border-left:4px solid transparent;
    border-right:4px solid transparent;
    &.active{
      border-left-color: var(--prcol);
      .iconfont{
        color:var(--prcol)
      }
    }
    .iconfont{
      font-size:var(--mfont);
      margin-right:1rem;
      color:#666;
    }
    .menu-title{
      font-size:var(--xsfont);
      font-weight: 600;
    }
}
</style>
