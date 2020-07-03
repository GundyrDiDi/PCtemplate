<template>
  <div id="Enter">
    <el-row class="nav">
      <el-col :span="12" class="flex-ter logo">{{logoname}}</el-col>
      <el-col :span="9">
        <el-menu
        class="menu"
        mode="horizontal"
        :default-active="activemenu"
        active-text-color="#34aaff"
        >
          <el-menu-item v-for="v in enternavs" :key="v.name" :index="v.name" @click="moveto(v.name)">
            {{v.meta.title}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" class="flex-ter">
        <!-- <el-button type="primary" size="small">登录/注册</el-button> -->
      </el-col>
    </el-row>
    <!-- content -->
    <div class="content">
      <component v-for="v in enternavs" :key="v.name" :is="v.component" :ref="v.name"></component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enter',
  data () {
    return {
      activemenu: ''
    }
  },
  // :is 赋值函数 ()=>import 可以动态注册组件
  // components: config.enternavs.reduce((comp, v) => ({ ...comp, ...{ [v.name]: v.component } }), {}),
  methods: {
    moveto (name) {
      this.$refs[name][0].$el.scrollIntoView(true)
    }
  },
  async mounted () {
    await Promise.all(this.enternavs.map(v => v.component()))
    const ob = new IntersectionObserver(entries => {
      console.log(ob.takeRecords())
      entries.forEach(v => {
        if (v.isIntersecting) {
          console.log(v.target.id)
          this.activemenu = v.target.id
        }
      })
    }, { threshold: 0.2 })
    this.enternavs.forEach((v) => {
      ob.observe(this.$refs[v.name][0].$el)
    })
  }
}
</script>

<style scoped lang="less">
@height:60px;
.nav{
  height:@height;
  box-shadow:0 0px 2px 1px rgba(0,0,0,.2);
  background:#fff;
  >div{
    height:100%;
  }
  >.logo {
    font-size: var(--xxlfont);
    font-weight: 600;
  }
  .menu{
    height:@height;
    .el-menu-item{
      font-size:var(--mfont);
      padding-left:30px;
      padding-right:30px;
    }
  }
}
.content{
  height:calc(100vh - @height );
  overflow: auto;
  scroll-behavior: smooth;
}
</style>
