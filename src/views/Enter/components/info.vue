<template>
  <div id="info" class="flex-col flex-ter">
    <div v-for="(v,i) in enterinfo" :key="v.title" class="info-part flex-center" :class="classlist[i]">
      <div class="media">
        <div class="h-title" v-html="v.title"></div>
        <div class="msg" v-html="v.msg"></div>
        <el-button v-if="v.button" type="light">{{v.button.name}}</el-button>
      </div>
      <div class="display">
        <component :is="v.tab.component" v-bind="v.tab.props"></component>
      </div>
      <img class="bg" :src="imgs[icons[i]]" :style="offsets[i]" alt="">
    </div>
    <img class="bg blueline" :src="imgs.blueline" alt="">
  </div>
</template>

<script>
import multiBox from '@/components/multi-box.vue'
import mainList from '@/components/main-list.vue'
import mainCards from '@/components/main-cards.vue'
export default {
  name: 'info',
  data () {
    return {
      icons: [
        'bubble2',
        'bubble3',
        'bubble3'
      ],
      classlist: [
        'part1 flex-col',
        'part2',
        'part3 flex-rev'
      ],
      offsets: [
        { top: '-3rem', left: '-5%' },
        { top: '-3rem', left: '-5%' },
        { top: '-3rem', left: '-5%' }
      ]
    }
  },
  components: {
    multiBox,
    mainList,
    mainCards
  },
  mounted () {}
}
</script>

<style scoped lang="less">
  #info{
    position:relative;
    padding-bottom:5rem;
    .blueline{
      bottom:0;
      width:90%;
      left:5%;
      transform: scale(1);
    }
  }
  .info-part{
    padding:3rem 0;
    position:relative;
    width:80%;
    >div{
      text-align: center;
    }
    .h-title{
      line-height: 3.6rem;
    }
    .msg{
      padding:0 15%;
      margin:1rem 0 6rem 0;
      line-height:2rem;
      font-size:var(--xmfont);
      color:#bbb;
    }
    .display{
      width:100%;
    }
  }
  .part2{
    >div{
      padding-top:5rem;
      text-align: left;
      .msg{
        padding:0;
        margin-bottom:4rem;
      }
    }
    >div:first-child{
      width:50%;
    }
  }
  .part3{
    >div{
      padding-top:5rem;
      text-align: right;
      .msg{
        padding:0;
        margin-bottom:4rem;
      }
    }
    >div:first-child{
      width:43%;
    }
  }
</style>
