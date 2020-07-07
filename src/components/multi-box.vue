<template>
  <div class="flex-bwn flex-ter">
    <div
      class="box"
      v-for="(v,i) in inset"
      :key="v.title"
      :class="{c:i==parseInt(inset.length/2)}"
    >
      <div class="bolder">{{v.title}}</div>
      <div class="suffix">{{v.suffix}}</div>
      <component :is="v.component"></component>
      <div class="link">查看更多</div>
    </div>
  </div>
</template>

<script>
import mainChart from '@/components/main-chart.vue'
export default {
  name: 'multi-box',
  data () {
    return {}
  },
  components: {
    mainChart
  },
  props: ['inset']
}
</script>

<style scoped lang="less">
.flex-bwn {
  height: 480px;
}
.box {
  position:relative;
  border-radius: 7px;
  background: #fff;
  margin: 0 1rem;
  width: 28%;
  height: 100%;
  box-shadow:
  0 0 2px 7px rgba(0, 0, 0, 0.02),
  0 0 2px 14px rgba(0, 0, 0, 0.02),
  0 0 2px 21px rgba(0, 0, 0, 0.02);
  padding: 3rem 1rem 2rem 1rem;
  &:last-child {
    text-align: left;
  }
  .suffix {
    color: #2e5ad6;
    font-size: var(--xsfont);
    padding-top: 0.5rem;
  }
  .link {
    right:2rem;
    position: absolute;
    bottom:2rem;
    color:#bbb;
    font-size:var(--sfont);
  }
}
.c {
  height: 120%;
  width: 32%;
  transform: translateY(-0.5rem);
  .link{
      bottom:3rem;
      color:#53a8e3;
  }
}
</style>
