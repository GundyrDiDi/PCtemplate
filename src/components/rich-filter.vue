<template>
  <Modal v-model="_show" width="60vw" class="rich">
    <header slot="header" class="p-title">
      高级筛选器
    </header>
    <section>
      <el-form ref="form" class="flex"
        :model="form"
        :rules="rules"
        label-width="130px"
      >
        <el-form-item v-for="v in formrule" :key="v.name"
        :label="v.label"
        :prop="v.name">
          <component
          v-model="form[v.name]"
          :is="'el-'+v.component"
          v-bind="v.attrs">
            <template v-if="Array.isArray(v.slot)">
              <component v-for="v2 in v.slot" :key="v2.value"
              :is="'el-'+v2.component"
              v-bind="v2.attrs"
              ></component>
            </template>
          </component>
        </el-form-item>
      </el-form>
    </section>
    <footer slot="footer">
      <div class="flex-center">
        <el-button type="primary" @click="check">确认</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </div>
      <!-- <div class="auth-des">
        <div>剩余使用次数：<span class="count">5次</span>升级标准版会员可无限次使用</div>
        <div>高级版以上会员才可以使用销售数据相关筛选</div>
      </div> -->
    </footer>
  </Modal>
</template>

<script>
import { isdeepsame } from '@/plugins/util'
export default {
  name: 'rich-filter',
  props: ['show', 'formrule'],
  data () {
    return {
      form: {},
      preForm: {},
      rules: this.formrule.reduce((acc, v) => {
        acc[v.name] = v.rule
        return acc
      }, {})
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
  },
  watch: {
    _show () {
      this.preForm = { ...this.form }
      Object.keys(this.preForm).forEach(k => {
        const v = this.preForm[k]
        if (typeof v === 'object') {
          this.preForm[k] = { ...v }
        }
      })
      this.reset()
    }
  },
  methods: {
    check () {
      if (isdeepsame(this.form, this.preForm)) {
        return this.$emit('update:show', false)
      }
      this.formrule.forEach(v => {
        if (v.component === 'range') {
          const [min, max] = this.form[v.name]
          if (min === v.attrs.min && max === v.attrs.max) {
            v.value = undefined
            return
          }
          v.value = this.form[v.name]
        } else if (v.component === 'select') {
          const value = this.form[v.name]
          if (v.attrs.multiple) {
            if (value.length === v.slot.length || !value.length) {
              v.value = undefined
              return
            }
          }
          v.value = value
        } else if (this.form[v.name]) {
          v.value = this.form[v.name]
        }
      })
      this.$emit('update', this.formrule.filter(v => v.value))
      this.$emit('update:show', false)
    },
    reset () {
      this.form = this.formrule.reduce((acc, v) => {
        acc[v.name] = (v.value || v.attrs.value) || ''
        return acc
      }, {})
    }
  },
  created () {
    this.reset()
  }
}
</script>

<style scoped lang="less">
section{
  .flex{
    flex-wrap: wrap;
    >.el-form-item{
      width:50%;
      // border-bottom:1px dotted #ddd;
    }
    .el-select{
      width: 100%;
    }
  }
}
footer{
  padding:.5rem 0;
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
  .rich .ivu-modal{
    min-width:860px;
  }
  .el-form-item>label{
    font-size:var(--xs2font);
    /* text-align: center; */
  }
  .el-form-item:nth-child(odd)>label{
    text-align:left;
  }
</style>
