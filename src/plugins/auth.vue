<template>
  <div>
    <!-- <div class="f-title">{{label}}</div> -->
    <div>
      <img :src="imgs[img]" />
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
    return {
      img: 'shili1'
    }
  },
  methods: {
    emit () {
      this.$emit('example')
    }
  },
  mounted () {
    console.log(this.name)
    if (this.name === 'good') {
      this.img = 'shili2'
    }
  }
}
</script>
<style scoped lang="less">
  img{
    padding:1rem;
    width:60%;
    margin-top:2rem;
    box-shadow:0 2px 4px 2px rgba(0,0,0,.1)
  }
  .des{
    font-size:var(--xsfont);
    margin:1rem
  }
  .el-icon-warning{
    font-size:var(--sfont);
    color: #E6A23C;
  }
  .warning{
    color: rgb(255 141 0);
    cursor: pointer;
  }
  .userlevel{
    color:var(--prcol)
  }
  .el-button{
    margin-bottom:2rem;
  }
</style>
