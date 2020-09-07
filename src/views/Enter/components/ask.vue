<template>
  <div id="ask" class="con-cen">
    <div class="contact flex-ter">
      <div>
        <div class="s-title">联系我们</div>
        <div v-for="(v,i) in order" :key="v.name" class="flex-ter">
          <div>
            <img :style="{transform:`scale(${1+(i/8)})`}" class="icon" :src="imgs[v.name]" alt />
          </div>
          <div class="bolder">{{v.text}}</div>
          <div class="bolder">{{company[v.name]}}</div>
        </div>
      </div>
      <div class="flex qr">
        <div class="flex-ter flex-col">
          <a>商务微信</a>
        <img :src="imgs.gongzhonghao" alt="">
        </div>
        <div class="flex-ter flex-col">
          <a>服务号</a>
        <img class="bigimg" :src="imgs.fuwuhao" alt="">
        </div>
      </div>
      <img class="bg" :src="imgs.bubble1" alt="">
    </div>
    <div class="company con-cen yahei">
      <!-- <div>
        <img class="logo" :src="imgs.logo" alt />
        <img :src="imgs.jingchen" alt />
      </div> -->
      <div class="bold">
      {{company.name}}
        <span style="display:inline-block;width:1.2rem"></span>
      <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery" target="_blank">{{company.icp}}</a></div>
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
  margin-top:10vh;
  height: 100vh;
  @contact:80%;
  @width:90%;
  .contact{
    height:@contact;
    width:@width;
    position: relative;
    >div{
      margin-left:9rem;
    }
    .bg{
      top:0;
      left:-1rem;
    }
    .f-title{
      padding:2rem 0;
    }
    .flex-ter{
      padding:.4rem 0;
    }
    .flex-ter>div{
      font-size:var(--mfont);
      &:first-child{
        margin-right:.5rem;
        height:var(--xlfont);
        width:calc(var(--base) * 3);
        text-align: center;
      }
      &:nth-child(2){
        margin-right:.2rem;
      }
    }
    .icon{
      height:var(--lfont);
      position:relative;
      top:.3rem;
    }
    .qr{
      margin-left:4rem;
      margin-right:4rem;
      justify-content: space-around;
      flex:1;
      a{
        color:#666;
      }
      img{
        height:10rem;
      }
      .bigimg{
        transform: scale(.9);
      }
    }
  }
  .company {
    height:calc(100% - @contact);
    width:@width;
    border-top: 1px solid #aaa;
    text-align: center;
    padding-top:3rem;
    .logo{
      height: calc(var(--base) * 2);
      margin:0 1rem 1.5rem 0;
    }
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
