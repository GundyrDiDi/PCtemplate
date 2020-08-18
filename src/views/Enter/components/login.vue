<template>
  <div id="login" class="flex-center">
    <div class="flex-col flex-ter logo">
      <img :src="imgs.whale" />
      <div class="s-title">鲸宸数据</div>
    </div>
    <div class="content flex-cen">
      <div class="bolder">微信扫码登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped lang="less">
#login{
  height:100vh;
  width:100vw;
  background:#f0f6fe;
  >div{
    margin:0 4rem;
    img{
      width:200px;
      margin-bottom:20px;
    }
  }
  .content{
    padding:50px;
    width:400px;
    height:400px;
    box-shadow:var(--boxshadow);
    background:#Fff;
    border-radius:2px;
  }
}
</style>
