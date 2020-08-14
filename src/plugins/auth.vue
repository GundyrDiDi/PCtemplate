<template>
  <div>
    <div class="f-title">{{label}}</div>
    <div>
      <img :src="imgs.hotlive1" />
    </div>
    <div class="des">
      <i class="el-icon-warning"></i>
      该功能为
      <span class="userlevel">标准版</span>
      以上会员使用，
      <span class="warning" @click="$router.push({name:'vip'})">点击了解套餐详情</span>
    </div>
    <el-button @click="emit" type="primary">查看示例</el-button>
  </div>
</template>
<script>
export default {
  name: 'auth',
  props: ['name', 'label'],
  data () {
    return {}
  },
  methods: {
    emit () {
      this.$emit('example')
    }
  }
}
</script>
<style scoped lang="less">
  img{
    width:50%;
  }
  .des{
    font-size:var(--xsfont);
    margin:.5rem
  }
  .el-icon-warning{
    font-size:var(--sfont);
    color: #E6A23C;
  }
  .warning{
    color: #E6A23C;
    cursor: pointer;
  }
  .userlevel{
    color:var(--prcol)
  }
</style>
