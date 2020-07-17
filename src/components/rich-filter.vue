<template>
  <Modal v-model="_show" width="50vw">
    <header slot="header" class="p-title">
      高级筛选器
    </header>
    <section>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="flex-col"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <footer slot="footer">
      <div class="flex-center">
        <el-button type="primary">确认</el-button>
        <el-button type="default">重置</el-button>
      </div>
      <div class="auth-des">
        <div>剩余使用次数：<span class="count">5次</span>升级标准版会员可无限次使用</div>
        <div>高级版以上会员才可以使用销售数据相关筛选</div>
      </div>
    </footer>
  </Modal>
</template>

<script>
export default {
  name: 'rich-filter',
  props: ['show'],
  data () {
    return {
      form: {},
      rules: {}
    }
  },
  computed: {
    _show: {
      get () {
        return this.show
      },
      set (value) {
        this.$emit('update:show', value)
      }
    }
  }
}
</script>

<style scoped lang="less">
section{
  .flex-col{
    height:300px;
    flex-wrap: wrap;
    >div{
      height:50px;
    }
  }
}
footer{
  padding-top:1rem;
  .flex-center{
    .el-button{
      margin:0 1rem;
      font-size:var(--sfont);
      padding:.5rem 1.4rem;
    }
  }
  .auth-des{
    div{
      padding:.2rem 0;
    }
  }
}
</style>
<style>
  .ivu-modal{
    min-width:660px;
  }
</style>
