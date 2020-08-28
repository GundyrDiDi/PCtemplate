<template>
  <el-menu :collapse="collapse" :default-active="activeIndex">
    <el-menu-item v-for="(v,i) in _treemenu" :key="i" :index="i.toString()">
      <div @click="go(v,i)" class="menu-item" :class="{active:i.toString()===activeIndex}">
        <!-- <img :src="imgs[v.name]" alt=""> -->
        <i class="iconfont" :class="v.meta.icon" :style="i>5&&{fontSize:`var(--lfont)`,marginLeft:'-.1rem',marginRight:'.7rem'}"></i>
        <span slot="title" class="menu-title">{{v.meta.title}}</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'tree-menu',
  props: ['menu', 'collapse'],
  data () {
    return {
      activeIndex: '0'
    }
  },
  computed: {
    _treemenu () {
      return this.menu.filter(v => !v.meta.second)
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
  watch: {
    $route () {
      const index = (this._treemenu.findIndex(v => v.name === this.$route.name)).toString()
      if (index !== '-1') {
        this.activeIndex = index
      }
    }
  },
  mounted () {
    this.activeIndex = (this._treemenu.findIndex(v => v.name === this.$route.name)).toString()
  }
}
</script>

<style scoped lang="less">
.menu-item{
    margin: 0 -20px;
    padding: 0 20px;
    border-left:4px solid transparent;
    border-right:4px solid transparent;
    background:#fff;
    &.active{
      border-left-color: var(--prcol);
      background:var(--lbgcol);
      .iconfont{
        color:var(--prcol)
      }
    }
    &:hover{
      background:var(--lbgcol);
    }
    .iconfont{
      font-size:var(--mfont);
      margin-right:1rem;
      color:#666;
    }
    .menu-title{
      font-size:var(--xsfont);
    }
}
</style>
