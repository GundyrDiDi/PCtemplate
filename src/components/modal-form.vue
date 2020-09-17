<template>
  <Modal v-model="_show" width="40vw" style="text-align:center" footer-hide>
    <header slot="header" class="p-title">
      申请开票
    </header>
    <div class="flex-wrap" style="max-height:460px;overflow:auto">
        <el-form ref="form" :model="form" :rules="rules"
        label-width="7rem" style="width:80%;">
            <el-form-item v-for="v in formlist" :key="v.name"
            :label="v.label" :prop="v.name">
                <component :is="'el-'+v.component"
                v-model="form[v.name]" v-bind="v.attrs" v-on="v.listeners">
                    <template v-if="v.slot">
                        <component v-for="v in v.slot" :key="v.value"
                        :is="'el-'+v.component" :label="v.label"></component>
                    </template>
                </component>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" :disabled="submiting">确认</el-button>
                <el-button style="margin-left:2rem" type="default" @click="cancel">取消</el-button>
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
      rules: {},
      temp: 0,
      formlist: [],
      submiting: false
    }
  },
  watch: {
    temp () {
      this.createFrom()
    },
    taxOrder (v) {
      this.form.invoiceMoney = v.money + ' 元'
      this.$set(this.taxForm[1].attrs, 'title', v.money + ' 元')
    }
  },
  created () {
    this.createFrom()
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
        console.log(this.form)
        if (valid) {
          const status = {
            普通发票: 0,
            专用发票: 1,
            个人发票: 2
          }
          this.submiting = true
          Axios.post('user/tax', {
            ...this.form,
            invoiceStatus: status[this.form.invoiceStatus],
            id: this.taxOrder.id,
            orderId: this.taxOrder.orderId
          }).then(res => {
            this.submiting = false
            if (res === '成功') {
              this.msgSuccess('开票成功，我们将邮寄的方式发送给您，请注意查收！', 4)
              this.taxOrder.status = '1'
              this.cancel()
            }
          })
        }
      })
    },
    createFrom () {
      this.formlist = this.taxForm.filter(v => {
        if (v.listeners) {
          for (const k in v.listeners) {
            v.listeners[k] = v.listeners[k].bind(this)
          }
        }
        return v.temp !== undefined ? v.temp === this.temp : true
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-form-item {
    margin-bottom: 1rem;
  }
  .el-alert{
      padding:0;
  }
</style>
