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
    <div>

    </div>
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
@url:require('@/assets/img/circle.png')
  #entermain{
    height:200%;
    background:url()
  }
  .el-row{
    height:50%;
    .el-col{
      height:100%;
    }
  }
  .description{
    font-size:var(--xmfont);
    color:#bbb;
    margin:.8rem 0 2.3rem 0;
  }
  .el-button{
    margin-right: 1.5rem;
  }
</style>
