<template>
  <div id="inst">
    <div class="module-box flex-ter">
      <div class="s-title">机构月榜</div>
      <el-date-picker
        class="date"
        v-model="time"
        type="month"
        size="small"
        placeholder="选择月">
      </el-date-picker>
      <div class="flex searchbox">
            <el-input size="small" placeholder="搜索机构或主播" v-model="insWord"></el-input>
            <el-button size="small" type="primary">搜索</el-button>
      </div>
    </div>
    <table-paganation class="module-box inslist" :condition="condition" v-bind="inslist"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'inst',
  data () {
    return {
      insWord: '',
      time: new Date()
    }
  },
  computed: {
    condition () {
      return { month: this.time }
    }
  }
}
</script>

<style scoped lang="less">
.flex-ter{
  >div{
    margin-right:1rem;
  }
  .date{
    width:7rem;
  }
  .searchbox{
    width:16rem;
    font-size:var(--xs2font);
  }
}
.module-box{
  margin-bottom:1rem;
}
</style>
<style lang="less">
  .searchbox {
    .el-input__inner {
      border-radius: 4px 0 0 4px;
      font-size:var(--xs2font)
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
  //表格列class
  .text-center{
    >div{
      width:100%;
      text-align: center;
    }
  }
</style>
