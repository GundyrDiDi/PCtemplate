<template>
  <div id="info" class="flex-col flex-ter" ref="info">
    <div v-for="(v,i) in enterinfo" :key="v.title" class="info-part flex-center" :class="classlist[i]">
      <div class="media" ref="media">
          <div v-observe.hold.parent="'zoom-in-top'" class="f-title" v-html="v.title"></div>
        <div v-observe.hold.parent="'zoom-in-top'" class="msg" v-html="v.msg"></div>
        <el-button v-if="v.button&&v.button.link" type="light">
          <router-link :to="v.button.link">{{v.button.name}}</router-link>
        </el-button>
      </div>
      <div v-observe.parent="showpart[i].animate" class="display">
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
import carouselCard from '@/components/carousel-card.vue'
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
      ],
      showpart: [
        { animate: 'animated zoomIn' },
        { animate: 'animated slideInRight' },
        { animate: 'animated slideInLeft' }
      ]
    }
  },
  components: {
    multiBox,
    mainList,
    carouselCard
  }
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
  .zoom-in-top{
    transform-origin: center top;
    animation: zoom-in-top .6s cubic-bezier(.23,1,.32,1);
  }
  @keyframes zoom-in-top {
    from{
      transform: scaleY(0);
      opacity: 0;
    }
    to{
      transform: scaleY(1);
      opacity: 1;
    }
  }
</style>
