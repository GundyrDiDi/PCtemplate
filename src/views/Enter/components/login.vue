<template>
  <div id="login" class="flex-center">
    <div class="content flex">
      <div class="logo">
        <img :src="imgs.login" alt />
      </div>
      <div class="form">
        <div class="group flex-center flex-col">
          <div class="t-title" style="margin-bottom:2rem;font-weight:600">微信扫码登录</div>
          <img class="qrcode" :src="qrcode" alt @click="reload" />
          <div class="bottom">欢迎使用鲸宸数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      wxlogin: null,
      qrcode: '',
      ticket: ''
    }
  },
  methods: {
    login (val) {
      this.User.level = val
      this.User.auth = ['免费版', '标准版', '高级版'][val]
      console.log(this.User)
      this.$router.push({ name: 'overview' })
    },
    reload () {
      if (!this.qrcode) {
        this.getqr()
      }
    },
    getqr () {
      let timer
      Axios.get('user/qrcode').then((res) => {
        console.log(res)
        this.qrcode = res.qrcode
        this.ticket = res.ticket
        setTimeout(() => {
          this.qrcode = ''
          clearInterval(timer)
        }, 1000 * 60 * 3)
      }).then(res => {
        timer = setInterval(() => {
          Axios.get('user/polling', {
            ticket: this.ticket
          }).then((res) => {
            console.log('polling=>', res)
            if (res[200]) {
              clearInterval(timer)
            }
          })
        }, 1000)
      })
    }
  },
  mounted () {
    this.$store.commit('init', true)
    this.getqr()
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
    overflow: hidden;
  }
  .logo {
    img {
      width: 100%;
      height: 100%;
    }
    height: 100%;
    width: 40%;
    box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  }
  .form {
    flex: 1;
    text-align: center;
    padding: 2rem 0;
    .group {
      height: 100%;
    }
  }
  .qrcode {
    height: 10rem;
    width: 10rem;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .bottom {
    width: 50%;
    border-top: 1px solid #ddd;
    margin-top: 1rem;
    padding-top: 1rem;
    font-size: var(--xs2font);
  }
}
</style>
