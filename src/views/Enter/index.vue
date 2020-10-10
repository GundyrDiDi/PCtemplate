<template>
  <div id="Enter">
    <el-row class="nav">
      <el-col :span="12" class="flex-ter">
        <img class="logo" :src="imgs.logo" alt="">
        <img class="jingchen" :src="imgs.jingchen" alt="">
      </el-col>
      <el-col :span="9">
        <el-menu
        class="menu"
        mode="horizontal"
        :default-active="activemenu"
        active-text-color="#34aaff"
        >
          <el-menu-item v-for="(v,i) in enternavs" :key="v.name" :index="v.name" @click="moveto(i)">
            {{v.meta.title}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" class="flex-ter">
        <el-button type="primary" size="small" @click="login">登录/注册</el-button>
      </el-col>
    </el-row>
    <!-- content -->
    <div class="content" ref="main">
      <component v-for="v in enternavs" :key="v.name" :is="v.component" ref="menu"></component>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import carouselCard from '@/components/carousel-card.vue'
export default {
  name: 'Enter',
  data () {
    return {
      activemenu: 'entermain',
      un: false
    }
  },
  components: {
    carouselCard
  },
  // :is 赋值函数 ()=>import 可以动态注册组件
  // components: config.enternavs.reduce((comp, v) => ({ ...comp, ...{ [v.name]: v.component } }), {}),
  methods: {
    moveto (i) {
      this.un = true
      setTimeout(e => {
        this.un = false
      }, 800)
      this.$refs.main.scrollTo(0, this.$refs.menu[i].$el.offsetTop + 20)
    },
    login () {
      this.user_logout()
      this.$router.push({ name: 'Login' })
    }
  },
  async mounted () {
    console.log(this.$route.query)
    axios.get('/oauth/access_token?code=' + this.$route.query.code).then(res => {
      console.log(res)
    })
    await Promise.all(this.enternavs.map(v => v.component()))
    this.$refs.menu.sort((a, b) =>
      a.$el.offsetTop - b.$el.offsetTop
    )
    const offsetTops = this.$refs.menu.map(v => v.$el.offsetTop)
    this.$refs.main.addEventListener('scroll', e => {
      const scrollTop = e.target.scrollTop
      if (!this.un) {
        offsetTops.forEach((v, i) => {
          if (v <= scrollTop) {
            this.activemenu = this.enternavs[i].name
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="less">
// @font-face {
//   font-family: '幼圆';
//   src: url('./static/font/SIMYOU.TTF');
// }
@height:calc(var(--base) * 3.5);
#Enter{
  font-family: "幼圆";
  letter-spacing: 1px;
}
.nav{
  height:@height;
  box-shadow:var(--lineshadow);
  background:#fff;
  z-index:2;
  >div{
    height:100%;
  }
  .logo {
    height:calc(var(--base) * 2);
    margin-left:8rem;
  }
  .jingchen {
    height:calc(var(--base) * 2);
    margin-left:1rem;
  }
  .menu{
    height:@height;
    .el-menu-item{
      font-size:var(--sfont);
      height:@height;
      line-height: @height;
      padding-left:2rem;
      padding-right:2rem;
      color: #909399;
    }
  }
}
.content{
  position: relative;
  height:calc(100vh - @height );
  overflow: auto;
  scroll-behavior: smooth;
}
</style>
