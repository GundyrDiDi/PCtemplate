<template>
  <div class="flex select" :style="con">
    <div class="label">{{label}}</div>
    <div class="operate flex-ter">
      <i
        @click="collapse=!collapse"
        v-if="overheight"
        class="el-icon-arrow-down"
        :style="{transform:`scaleY(${collapse?1:-1})`}"
      ></i>
      <span v-if="attrs.mode.length>1">
        <span @click="multiple=!multiple">
          {{!multiple?'多选':'单选'}}
          <i :class="!multiple?'el-icon-plus':'el-icon-check'"></i>
        </span>
      </span>
    </div>
    <div class="options">
      <div class="flex-wrap" ref="option" v-if="!multiple">
        <div
          @click="select(v)"
          v-for="v in options"
          :key="v.label"
          :class="{active:val===v.label}"
        >{{v.label||'全部'}}</div>
      </div>
      <el-checkbox-group ref="checkgroup" class="flex-wrap" v-if="multiple" v-model="val">
        <template v-for="v in options">
            <div :key="v.label" v-if="v.label">
                <el-checkbox :label="v.label"></el-checkbox>
            </div>
        </template>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-collapse',
  props: ['api', 'label', 'attrs', 'value', 'valid'],
  data () {
    return {
      multiple: false,
      options: [],
      val: '',
      collapse: true,
      overheight: false,
      minheight: 0,
      maxheight: 0
    }
  },
  computed: {
    con () {
      return {
        height: (this.collapse ? this.minheight : this.maxheight) + 'px',
        borderBottomWidth: this.collapse ? 0 : '1px'
      }
    }
  },
  watch: {
    multiple (m) {
      this.val = m ? [] : ''
      this.calcHeight()
    },
    val (val) {
      this.$listeners.input(val)
    },
    value (v) {
      this.val = v
    }
  },
  methods: {
    select (v) {
      if (this.valid && this.valid()) return
      this.val = v.label
    },
    calcHeight () {
      requestAnimationFrame(() => {
        this.minheight = this.$el.children[0].getBoundingClientRect().height
        const ref = this.multiple ? this.$refs.checkgroup.$el : this.$refs.option
        this.maxheight = ref.getBoundingClientRect().height
        this.overheight = this.maxheight - this.minheight > 0
      })
    }
  },
  async mounted () {
    const { api } = this
    this.options = await this.forms_getdata({ api }).then(res => {
      return res.map(v => ({ label: v }))
    })
    this.options.unshift({ label: '' })
    this.calcHeight()
  }
}
</script>

<style scoped lang="less">
.select {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  border-bottom: 1px solid #f2f2f2;
}
.label {
  line-height: 1.4rem;
  height: 1.7rem;
  text-align: left;
  margin-right: 0.5rem;
  white-space: nowrap;
}
.options {
  flex: 1;
  .flex-wrap > div {
    cursor: pointer;
    color: #aaa;
    margin: 0 .5rem 0.3rem 0.5rem;
    line-height: 1.4rem;
    padding: 0 0.6rem;
    border-radius: 2rem;
    &:hover {
      color: #666;
    }
    &.active {
      background: var(--prcol);
      color: #fff;
    }
  }
}
.operate {
  line-height: 1.3rem;
  height: 1.3rem;
  color: var(--prcol);
  > i {
    transition: all 0.3s ease-in-out;
    font-size: var(--sfont);
    font-weight: bold;
    cursor: pointer;
    margin-right:.3rem;
  }
  span {
    line-height: 1.4rem;
    cursor: pointer;
  }
}
</style>
