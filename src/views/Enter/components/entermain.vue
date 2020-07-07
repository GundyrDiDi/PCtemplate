<template>
  <div id="entermain">
    <el-row>
      <el-col :span="12" class="flex-ter">
        <div>
          <img src="../" alt="">
        </div>
      </el-col>
      <el-col :span="12" class="flex-ter">
        <div>
          <div class="h-title">{{logoname}}</div>
          <div class="description">{{description}}</div>
          <div>
            <el-button type="light">注册账户</el-button>
            <a href="#" class="link bolder">已有帐户 ?</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'entermain',
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped lang="less">
  #entermain{
    height:100%;
  }
  .el-row{
    height:100%;
    .el-col{
      height:100%;
    }
  }
  .description{
    font-size:var(--xmfont);
    color:#bbb;
    margin:.8rem 0 2.3rem 0;
  }
  @color:rgba(114, 203, 255,.3);
  @fontcolor:#0b96cc;
  .el-button{
    background:@color;
    border:none;
    color:@fontcolor;
    font-size:var(--mfont);
    margin-right:1.5rem;
    padding:.8rem 2rem;
    border-radius:6px;
    font-weight:600;
    &:hover{
      background:darken(@color,20%);
    }
    &:active{
      background:darken(@color,30%);
      box-shadow:0 1px 2px rgba(0,0,0,.2);
    }
  }
  .link{
    font-size:var(--xmfont);
    color:@fontcolor;
    position:relative;
    &:hover{
      color:desaturate(@fontcolor,50%);
    }
  }
</style>
