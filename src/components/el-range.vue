<template>
  <div class="flex el-range">
    <el-input-number :controls="false" v-model="input_0" :min="$attrs.min"></el-input-number>
    <el-slider v-model="_value" v-bind="$attrs" range></el-slider>
    <el-input-number :controls="false" v-model="input_1" :max="$attrs.max"></el-input-number>
  </div>
</template>

<script>
export default {
  name: 'el-range',
  props: ['value'],
  data () {
    return {}
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        // 组件绑定v-model本质是注册input事件,这里触发input事件
        this.$listeners.input(value)
      }
    },
    ...['input_0', 'input_1'].reduce((acc, v) => {
      const i = v.split('_')[1]
      acc[v] = {
        get () {
          return this.value[i]
        },
        set (val) {
          const value = [...this.value]
          value.splice(i, 1, val)
          value.sort((a, b) => a - b)
          this.$listeners.input(value)
        }
      }
      return acc
    }, {})
  }
}
</script>

<style scoped lang="less">
.el-input-number {
  width: 3.5rem;
}
.el-slider {
  flex: 1;
  margin:0 .5rem;
}
</style>
<style lang="less">
    .el-range{
        input{
            height:1.8rem;
            line-height:1.8rem;
            padding-left: 2px !important;
            padding-right: 2px !important;
        }
    }
</style>
