<template>
  <div id="ask" class="con-cen">
    <div class="contact flex-ter">
      <div>
        <div class="f-title">联系我们</div>
        <div v-for="(v,i) in order" :key="v.name" class="flex-ter">
          <div>
            <img :style="{transform:`scale(${1+(i/8)})`}" class="icon" :src="imgs[v.name]" alt />
          </div>
          <div class="bolder">{{v.text}}</div>
          <div class="bolder">{{company[v.name]}}</div>
        </div>
      </div>
      <img class="bg" :src="imgs.bubble1" alt="">
    </div>
    <div class="company con-cen yahei">
      <div>
        <img :src="imgs.logo" alt />
      </div>
      <div class="bold">{{company.name}} {{company.icp}}</div>
      <div class="bold">{{company.gip}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ask',
  data () {
    return {
      order: [
        { name: 'email', text: '邮箱：' },
        { name: 'tel', text: '电话：' },
        { name: 'addr', text: '地址：' }
      ]
    }
  },
  mounted () {}
}
</script>

<style scoped lang="less">
#ask {
  height: 100vh;
  @contact:70%;
  @width:90%;
  .contact{
    height:@contact;
    width:@width;
    position: relative;
    >div{
      margin-left:13rem;
    }
    .bg{
      top:0;
      left:5rem;
    }
    .f-title{
      padding:2rem 0;
    }
    .flex-ter{
      padding:.8rem 0;
    }
    .flex-ter>div{
      font-size:var(--xmfont);
      &:first-child{
        margin-right:1rem;
        height:var(--xlfont);
        width:calc(var(--base) * 3);
        text-align: center;
      }
      &:nth-child(2){
        margin-right:.5rem;
      }
    }
    .icon{
      height:var(--xlfont);
    }
  }
  .company {
    height:calc(100% - @contact);
    width:@width;
    border-top: 1px solid #aaa;
    text-align: center;
    padding-top:3rem;
    img {
      height: calc(var(--base) * 3);
      margin-bottom:1rem;
    }
    .bolder {
      font-size: var(--mfont);
      padding: 4px;
    }
  }
}
</style>
