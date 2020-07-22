<template>
  <div class="flex-bwn">
    <div
      v-for="(v,i) in tabs"
      :key="v.name"
      :class="{active:i===index}"
      @click="$emit('scroll',i)"
    >{{v.label}}</div>
    <b class="line" :style="bottomline"></b>
  </div>
</template>

<script>
export default {
  name: 'anchorNav',
  props: ['tabs', 'index'],
  data () {
    return {}
  },
  computed: {
    bottomline () {
      return {
        width: 100 / this.tabs.length + '%',
        transform: `translateX(${this.index * 100}%)`
      }
    }
  }
}
</script>

<style scoped lang="less">
.flex-bwn {
  justify-content: space-around;
  > div {
    text-align: center;
    font-size: var(--xs2font);
    cursor: pointer;
  }
  .active {
    color: #409eff;
  }
}
.line {
  position: absolute;
  left: 0;
  bottom: -0.4rem;
  height: 2px;
  background: var(--prcol);
  transition: all linear 0.5s;
}
</style>
