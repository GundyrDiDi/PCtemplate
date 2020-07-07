<template>
  <div id="info" class="flex-col flex-ter">
    <div v-for="(v,i) in enterinfo" :key="v.title" class="info-part flex-center" :class="classlist[i]">
      <div class="media">
        <div class="h-title" v-html="v.title"></div>
        <div class="msg">{{v.msg}}</div>
        <el-button v-if="v.button" type="primary">{{v.button.name}}</el-button>
      </div>
      <div class="display">
        <component :is="v.tab.component" v-bind="v.tab.props"></component>
      </div>
      <img class="bg" :src="imgs[icons[i]]" :style="offsets[i]" alt="">
    </div>
  </div>
</template>

<script>
import multiBox from '@/components/multi-box.vue'
export default {
  name: 'info',
  data () {
    return {
      icons: [
        'bubble2',
        'bubble3',
        'blueline'
      ],
      classlist: [
        'flex-col',
        'flex-rev',
        'flex-col'
      ],
      offsets: [
        { top: '-3rem', left: '-15%' },
        { top: '-3rem', left: '-15%' },
        { bottom: '0', transform: 'scale(1)', width: '100%' }
      ]
    }
  },
  components: {
    multiBox
  },
  mounted () {}
}
</script>

<style scoped lang="less">
  .info-part{
    padding:3rem 0;
    position:relative;
    width:70%;
    >div{
      text-align: center;
    }
    .msg{
      padding:0 10%;
      margin:2rem 0 6rem 0;
      font-size:var(--xmfont);
      color:#bbb;
    }
    .display{
      width:100%;
    }
  }
  .flex-rev{
    >div{
      padding-top:5rem;
      text-align: right;
      .msg{
        padding:0;
        margin-bottom:3rem;
      }
    }
    >div:first-child{
      width:50%;
    }
  }
</style>
