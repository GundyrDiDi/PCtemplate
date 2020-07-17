<template>
  <div id="host">
    <div class="module-box flex">
      <div class="flex searchbox">
        <el-input placeholder="搜索主播名称" v-model="hostWord"></el-input>
        <el-button type="primary">搜索主播</el-button>
      </div>
      <div class="flex-ter rich-filter">
        <el-button type="default" size="small" @click="showFilter=true">高级筛选器</el-button>
      </div>
    </div>
    <rich-filter :show.sync="showFilter"></rich-filter>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      hostWord: '',
      showFilter: false
    }
  }
}
</script>

<style scoped lang="less">
</style>
<style lang="less">
#host {
  .searchbox{
    width:40%;
    .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
  .rich-filter{
    flex:1;
    padding-left:2rem;
  }
}
</style>
