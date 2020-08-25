<template>
  <div id="home">
      <header class="flex">
        <div class="logo flex-ter">
          <img :src="imgs.logo" alt />
          <span class="s-title">{{logoname}}</span>
          <div class="shrink flex-center" :class="{flip:collapse}" @click="collapse=!collapse">
            <img :src="imgs.collapse" alt="">
          </div>
        </div>
        <div class="notify flex-center">
          <el-button size="small" type="primary" @click="showQRcode=true">{{notify.msg}}</el-button>
        </div>
        <div class="user flex-center">
          <img class="brcircle" :src="imgs.head" alt />
          <div class="info">
            <div>{{User.name}}</div>
            <div>使用权限: {{User.expire}}</div>
          </div>
          <div class="f-r">
            <div class="auth">{{User.auth}}</div>
            <div class="exit" @click="$router.push({name:'Enter'})">退出</div>
          </div>
        </div>
      </header>
    <div class="content flex">
      <tree-menu class="nav-tree" :collapse="collapse" :menu="treemenu"></tree-menu>
      <div class="panel">
        <transition mode="out-in" appear
        name="fade-transform">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
        </transition>
      </div>
    </div>
    <el-dialog :visible.sync="showQRcode"
    width="360px"
    :show-close="false"
    center
    custom-class="qrcode"
    >
      <template v-slot:title>
        <div>
          <div>微信扫一扫</div>
          <div>关注鲸宸数据官方公众号</div>
        </div>
      </template>
      <img :src="imgs.gongzhonghao" class="qr">
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import treeMenu from '@/components/tree-menu'
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      showQRcode: false
    }
  },
  components: {
    treeMenu
  }
}
</script>
<style scoped lang="less">
#home{
  height:100vh;
  background:var(--lbgcol);
}
@height: calc(var(--base) * 3.5);
header {
  background:#fff;
  min-width:760px;
  height: @height;
  box-shadow: var(--lineshadow2);
  position:relative;
  z-index: 10;
  padding: 0 1rem;
  cursor: default;
  .s-title{
    letter-spacing: 2px;
  }
  .logo {
    width:60%;
    >img {
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
  .shrink {
    position: relative;
    top: 0.3rem;
    height: 60%;
    width: 2rem;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: all 0.2s linear;
    &.flip {
      transform: perspective(400px) rotate3d(0, 1, 0, 180deg);
    }
    &:hover {
      color: var(--prcol)
    }
    &:active {
      background: rgba(0, 127, 253, 0.1);
    }
    img{
      height:1rem;
    }
  }
  .notify>.el-button{
    background:var(--prcol);
    border-radius:1rem;
    padding:.2rem .5rem;
  }
  .user{
    flex:1;
    position:relative;
    font-size:var(--xxsfont);
    img{
      height:2rem;
      margin:0 .5rem;
    }
    .f-r{
      position:absolute;
      right:0;
      text-align: right;
    }
    .auth{
      color:var(--dbcol);
      background:var(--prcol);
      border-radius:1rem;
      padding:.3rem .5rem;
      transform:scale(0.9)
    }
    .exit{
      font-size:var(--xxsfont);
      text-align:center;
      cursor: pointer;
      color:#aaa;
      &:hover{
        color:var(--prcol);
      }
    }
  }
}
.content{
  height:calc(100% - @height);
  overflow: auto;
  .nav-tree{
    background:#fff;
    padding-top:.5rem;
    height:100%;
    overflow:auto;
    &:not(.el-menu--collapse){
      width:10rem;
      min-width:3rem;
    }
  }
  .panel{
    position:relative;
    padding:1rem;
    flex:1;
    height:100%;
    overflow:auto;
    min-width:760px;
    background:var(--lbgcol);
    scroll-behavior: smooth;
  }
}
.qr{
  height:300px;
  width:300px;
}
</style>
<style>
.qrcode .el-dialog__header{
  padding-bottom:0px;
}
.qrcode .el-dialog__body{
  padding:0px 30px 10px 30px;
}
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
