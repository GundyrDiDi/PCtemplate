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
          <div class="title">{{logoname}}</div>
          <div class="description">{{description}}</div>
          <div>
            <el-button type="light">注册账户</el-button>
            <a class="el-link">已有帐户 ?</a>
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
  .title{
    font-size:2.5rem;
    font-weight: 600;
    letter-spacing: 3px;
  }
  .description{
    font-size:var(--lfont);
    color:#ddd;
    margin:.5rem 0 1.8rem 0;
  }
  .el-button{
    @color:rgba(114, 203, 255,.3);
    background:@color;
    border:none;
    color:#187cb7;
    font-size:var(--lfont);
    margin-right:1.5rem;
    padding:1rem 2rem;
    border-radius:10px;
    &:hover{
      background:darken(@color,20%);
    }
    &:active{
      background:darken(@color,30%);
      box-shadow:0 1px 2px rgba(0,0,0,.3);
    }
  }
  .el-link{
    font-size:var(--xxlfont);
    color:#187cb7;
    position:relative;
    top:-3px;
    &:hover{
      color:desaturate(#187cb7,50%);
    }
  }
</style>
