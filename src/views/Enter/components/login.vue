<template>
  <div id="login" class="flex-center">
    <div class="content flex">
      <div class="logo">
        <img :src="imgs.login" alt="">
      </div>
      <div class="form">
        <div class="t-title">微信扫码登录</div>
        <div class="flex-center group">
          <div>
            <el-button @click="login(0)">免费版</el-button>
            <el-button @click="login(1)" type="primary">标准版</el-button>
            <el-button @click="login(2)" type="warning">高级版</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      wxlogin: null
    }
  },
  methods: {
    login (val) {
      this.User.level = val
      this.User.auth = ['免费版', '标准版', '高级版'][val]
      console.log(this.User)
      this.$router.push({ name: 'overview' })
    }
  },
  mounted () {
    this.$store.commit('init', true)
    this.wxlogin = new WxLogin({
      self_redirect: true,
      id: 'login_container',
      appid: '',
      scope: '',
      redirect_uri: '',
      state: '',
      style: '',
      href: ''
    })
  }
}
</script>

<style scoped lang="less">
#login {
  height: 100vh;
  width: 100vw;
  background: #f0f6fe;
  .content {
    width: 50%;
    height: 70%;
    box-shadow: var(--boxshadow);
    background: #fff;
    border-radius: 4px;
    overflow:hidden;
  }
  .logo{
    img{
      width:100%;
      height:100%;
    }
    height:100%;
    width:40%;
    box-shadow:1px 0 3px rgba(0,0,0,.1)
  }
  .form{
    flex:1;
    text-align: center;
    padding:2rem 0;
    .group{
      height:100%;
      padding-bottom:2rem;
    }
  }
}
</style>
