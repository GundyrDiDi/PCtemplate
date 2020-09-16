<template>
  <Modal v-model="_show" width="40vw" style="text-align:center" footer-hide>
    <header slot="header" class="p-title">
      申请开票
    </header>
    <div class="flex-wrap" style="max-height:460px;overflow:auto">
        <el-form ref="form" :model="form" :rules="rules"
        label-width="7rem" style="width:80%;">
            <el-form-item v-for="v in taxForm" :key="v.name"
            :label="v.label" :prop="v.name">
                <component :is="'el-'+v.component"
                v-model="form[v.name]" v-bind="v.attrs">
                    <template v-if="v.slot">
                        <component v-for="v in v.slot" :key="v.name"
                        :is="'el-'+v.component"></component>
                    </template>
                </component>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确认</el-button>
                <el-button type="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </Modal>
</template>

<script>
import { arraytoObject } from '@/plugins/util'
export default {
  name: 'modal-form',
  data () {
    return {
      form: {},
      rules: {}
    }
  },
  created () {
    this.form = arraytoObject(this.taxForm, 'name', v => v.value || '')
    this.rules = arraytoObject(this.taxForm, 'name', v => {
      const rule = v.rule
      rule.forEach(r => {
        if (r.required && !r.message) {
          r.message = '请输入' + v.label
          r.trigger = 'blur'
        }
      })
      return rule
    })
    console.log(this.rules)
  },
  computed: {
    _show: {
      get () {
        return !!this.taxOrder
      },
      set () {
        requestAnimationFrame(() => {
          this.$store.commit('tables/taxOrder', null)
        })
      }
    }
  },
  methods: {
    cancel (v) {
      this._show = false
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        console.log(valid)
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-form-item {
    margin-bottom: 1rem;
  }
</style>
