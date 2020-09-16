<template>
  <el-form ref="form" :model="form" :rules="rules" class="ddd">
    <el-form-item prop="time">
      <el-date-picker
        class="date-pick"
        v-model="form.time"
        size="small"
        type="daterange"
        align="left"
        unlink-panels
        :value-format="format"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false"
        :picker-options="pickerOptions"
        :readonly="auth"
        @focus="valid"
      ></el-date-picker>
      <el-button-group class="btns">
        <el-button
          size="small"
          v-for="v in buttons"
          :key="v.name"
          :type="v===btn?'primary':'default'"
          @click="quicksetvalue(v)"
        >{{v.name}}</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { formatDate, throttle } from '@/plugins/util.js'
export default {
  name: 'date-pick',
  props: ['time'],
  data () {
    return {
      form: {
        time: ''
      },
      rules: {
        time: [
          {
            validator: (rule, value, callback) => {
              const [start, end] = value || []
              if (!start) {
                callback(new Error('请选择时间范围！'))
              } else if (start instanceof Date) {
                callback()
                this.$emit('update:time', value.map(v => formatDate(v, this.format)))
              } else if (
                new Date(end).toDateString() === new Date(this.originDate).toDateString()
              ) {
                const ms = Date.parse(start) - Date.parse(end)
                this.btn = this.buttons.find(v => v.time === ms)
                callback()
                this.$emit('update:time', value)
              } else {
                this.btn = null
                if (Date.parse(start) > this.originDate || Date.parse(end) > this.originDate) {
                  callback(new Error('选择的时间范围内含有暂未抓取的日期数据，请重新输入！'))
                } else {
                  this.$emit('update:time', value)
                }
              }
            },
            required: true,
            trigger: 'change'
          }
        ]
      },
      format: 'yyyy-MM-dd',
      btn: null,
      originDate: this.$store.state.user.newdate,
      buttons: [
        { name: '近7天', time: -(7 * 24 * 60 * 60 * 1000) },
        { name: '近15天', time: -(15 * 24 * 60 * 60 * 1000) },
        { name: '近30天', time: -(30 * 24 * 60 * 60 * 1000) },
        { name: '近60天', time: -(60 * 24 * 60 * 60 * 1000) },
        { name: '近90天', time: -(90 * 24 * 60 * 60 * 1000) }
      ]
    }
  },
  computed: {
    // auth
    auth () {
      return this.user.User.level < 3
    },
    pickerOptions () {
      const shortcuts = this.buttons.map(v => {
        return {
          text: v.name,
          onClick: picker => {
            picker.$emit('pick', this.quickset(v))
          }
        }
      })
      return {
        shortcuts
      }
    }
  },
  methods: {
    valid () {
      this.auth && this.block()
    },
    quickset (v) {
      const end = this.originDate
      const start = end + v.time
      // start.setTime(start + v.time)
      return [start, end].map(v => new Date(v))
    },
    quicksetvalue (v) {
      this.btn = v
      this.form.time = this.quickset(v)
    }
  },
  watch: {
    time () {
      this.form.time = this.time
    }
  },
  mounted () {
    this.form.time = this.time
    this.block = throttle.call(this, this.$block)
  }
}
</script>

<style scoped lang="less">
.date-pick {
  margin-right:2rem;
  font-size: var(--xxsfont);
}
.btns>button{
  height:32px;
}
</style>
<style lang="less">
.ddd{
  .el-form-item {
    margin: 0;
  }
  .el-range-editor--small .el-range-separator {
    line-height: 1rem;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }
}
.el-range-editor--small .el-range-input{
  font-size: var(--xs2font);
}
</style>
