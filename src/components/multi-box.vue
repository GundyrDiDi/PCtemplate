<template>
  <div class="flex-bwn flex-ter">
    <div
      class="box bolder"
      v-for="(v,i) in inset"
      :key="v.title"
      :class="{c:i==parseInt(inset.length/2)}"
    >
      <div class="title">{{v.title}}</div>
      <div class="suffix">{{v.suffix}}</div>
      <component :is="v.component" v-bind="v" :condition="condition"></component>
      <router-link v-if="v.link" class="link" :to="v.link">查看更多</router-link>
    </div>
  </div>
</template>

<script>
import mainChart from '@/components/main-chart.vue'
import { formatDate } from '@/plugins/util.js'
export default {
  name: 'multi-box',
  data () {
    return {
      condition: {}
    }
  },
  components: {
    mainChart
  },
  mounted () {
    const newdate = this.$store.state.user.newdate
    this.condition = {
      startTime: formatDate(new Date(newdate - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      endTime: formatDate(new Date(newdate), 'yyyy-MM-dd')
    }
  },
  props: ['inset']
}
</script>

<style scoped lang="less">
.flex-bwn {
  height: 500px;
}
.box {
  position:relative;
  border-radius: 7px;
  background: #fff;
  width: 28%;
  height: 100%;
  padding: 2.5rem 1rem 2rem 1rem;
  &:last-child {
    // text-align: left;
    .title,.suffix{
      padding-left:1rem
    }
  }
  .suffix {
    color: #1e7fe3;
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
  }
}
</style>
