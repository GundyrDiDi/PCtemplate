<template>
  <Modal v-model="_show" width="60vw">
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
          <component v-model="form[v.name]"
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
export default {
  name: 'rich-filter',
  props: ['show', 'formrule'],
  data () {
    return {
      form: {},
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
      this.reset()
    }
  },
  created () {
    this.updateformrule(this.formrule)
    this.reset()
  },
  methods: {
    async updateformrule (formrule) {
      await Promise.all(formrule.map(v => {
        if (!v.responed) {
          return this.forms_getdata(v).then(res => {
            v.responed = true
            if (v.type === 'slot') {
              res = Array.isArray(res) ? res : [res]
              const attrs = v.slot.attrs
              v.slot = res.map(item => ({
                component: v.slot.component,
                attrs: Object.entries(attrs).reduce((acc, [k, v]) => {
                  const prop = v in item ? v : k
                  acc[k] = item[prop]
                  return acc
                }, {})
              }))
            } else if (v.type === 'attrs') {
              v.attrs = v.pipe(res)
            }
          })
        }
      }))
      this.$emit('update', this.formrule.filter(v => v.value))
    },
    check () {
      this.formrule.forEach(v => {
        if (v.component === 'range') {
          const [min, max] = this.form[v.name]
          if (min === v.attrs.min && max === v.attrs.max) {
            return undefined
          }
          v.value = this.form[v.name]
        } else if (v.component === 'select') {
          const value = this.form[v.name]
          if (value.length === v.slot.length || !value.length) {
            return undefined
          }
          v.value = value
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
  }
}
</script>

<style scoped lang="less">
section{
  .flex{
    flex-wrap: wrap;
    >.el-form-item{
      width:50%;
      padding:.5rem 0;
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
  .ivu-modal{
    min-width:760px;
  }
  .el-form-item>label{
    font-size:var(--xsfont);
    /* text-align: center; */
  }
  .el-form-item:nth-child(odd)>label{
    text-align:left;
  }
</style>
