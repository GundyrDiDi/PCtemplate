<template>
  <div class="flex-ter el-range" @click="block">
    <el-input-number :disabled="disable" :controls="false" v-model="input_0" :min="$attrs.min"></el-input-number>
    <el-slider :disabled="disable" v-model="_value" v-bind="$attrs" range></el-slider>
    <el-input-number :disabled="disable" :controls="false" v-model="input_1" :max="$attrs.max"></el-input-number>
    <Dropdown trigger="click" @on-click="changeunit">
          <a>{{$attrs.unit}}</a>
          <DropdownMenu slot="list" style="min-width:50px;">
              <DropdownItem v-for="v in _units" :key="v.name" :name="v.name">{{v.name}}</DropdownItem>
          </DropdownMenu>
      </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'el-range',
  props: ['value', 'valid', 'parent', 'initbase'],
  data () {
    return {
      units: [
        { name: '亿', val: 10 ** 8 },
        { name: '千万', val: 10 ** 7 },
        { name: '百万', val: 10 ** 6 },
        { name: '万', val: 10 ** 4 },
        { name: '千', val: 10 ** 3 }
      ]
    }
  },
  computed: {
    _units () {
      const index = this.units.findIndex(v => v.val === this.initbase)
      if (index >= 0) {
        return this.units.slice(index, index + 3)
      } else {
        return []
      }
    },
    disable () {
      return !!this.valid
    },
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
  },
  methods: {
    block () {
      if (this.valid) this.valid()
    },
    changeunit (v) {
      const val = this.units.find(v2 => v2.name === v).val
      const times = this.parent.attrs.base / val
      this.$set(this.parent.attrs, 'unit', v)
      this.$set(this.parent.attrs, 'base', val)
      this.$set(this.parent.attrs, 'min', Math.round(this.parent.attrs.min * times))
      this.$set(this.parent.attrs, 'max', Math.round(this.parent.attrs.max * times))
      this.$set(this.parent.attrs, 'value', [this.parent.attrs.min, this.parent.attrs.max])
      this._value = this._value.map(v => Math.round(v * times))
    }
  }
}
</script>

<style scoped lang="less">
.el-input-number {
  width: 3.5rem;
}
.el-slider {
  flex: 1;
  margin: 0 0.5rem;
}
</style>
<style lang="less">
.el-range {
  .el-input-number{
    input {
      height: 1.4rem;
      line-height: 1.4rem;
      padding-left: 2px !important;
      padding-right: 2px !important;
    }
  }
}
.el-slider__runway.disabled {
  .el-slider__bar {
    background-color: #409eff !important;
  }
  .el-slider__button {
    border-color: #409eff !important;
    // cursor: default !important;
  }
}
.el-input.is-disabled .el-input__inner {
  background-color: transparent;
  border-color: #ddd;
  color: #666;
  cursor: default;
}
.ivu-dropdown{
  margin-left: .5rem;min-width:16px;font-size:var(--xs2font)
}
</style>
