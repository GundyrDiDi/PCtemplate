<template>
  <div id="hotlive">
    <div class="module-box flex-ter">
      <div class="t-title">人气直播</div>
      <date-pick class="flex-center date" :time.sync="time"></date-pick>
      <div class="flex-ter rich-filter">
        <el-button type="primary" size="small" @click="filterModal = true">高级筛选器</el-button>
      </div>
    </div>
    <rich-filter @update="getlabel($event)" :show.sync="filterModal"
    :formrule="hotlistfilter"></rich-filter>
    <transition-group
      tag="div" name="list"
      class="module-box filter-label flex"
      v-if="filterLabel.length"
    >
      <div v-for="(v,i) in filterLabel" :key="v.name" class="label">
        {{v.label}}：
        <div v-html="format(v)"></div>
        <i class="el-icon-close" @click="removelabel(v,i)"></i>
      </div>
    </transition-group>
    <table-paganation
    :sortvalid="myauth.hotlive.sort"
    :listvalid="myauth.hotlive.list"
    :lockvalid="myauth.hotlive.lock"
    ref="table"
    :condition="condition"
    class="module-box livelist"
    v-bind="livelist"></table-paganation>
    <modal-table></modal-table>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/util'
export default {
  name: 'hotlive',
  data () {
    const newdate = this.$store.state.user.newdate
    return {
      time: [
        formatDate(new Date(newdate - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        formatDate(new Date(newdate), 'yyyy-MM-dd')
      ],
      filterModal: false,
      filterLabel: [],
      condition: {}
    }
  },
  watch: {
    // auth
    time (newval, oldval) {
      const fn = this.myauth.hotlive.time
      if (fn && fn.call(this, newval, oldval, 'time')) return
      this.condition = {
        liveStartTime: this.time[0],
        liveEndTime: this.time[1],
        ...this.filterLabel.reduce((acc, v) => {
          acc[v.name] = {
            type: v.component,
            value: v.value,
            base: v.attrs.base
          }
          return acc
        }, {})
      }
    },
    filterLabel (v) {
      this.condition = {
        liveStartTime: this.time[0],
        liveEndTime: this.time[1],
        ...this.filterLabel.reduce((acc, v) => {
          acc[v.name] = {
            type: v.component,
            value: v.value,
            base: v.attrs.base
          }
          return acc
        }, {})
      }
    }
  },
  methods: {
    format (v) {
      if (Array.isArray(v.value)) {
        if (v.component === 'range') {
          return v.value.map((v2) => v2 + v.attrs.unit).join(' - ')
        } else if (v.component === 'select') {
          return v.slot
            .filter((v2) => v.value.some((v3) => v3 === v2.attrs.value))
            .map((v) => `<span>${v.attrs.label}</span>`)
            .join('')
        }
      } else {
        return v.value
      }
    },
    getlabel (val) {
      if (val.length) {
        // auth
        if (this.valid && this.valid()) return
        this.$store.commit('user/queryType', 'hotlive,filter')
      }
      this.filterLabel = val
    },
    removelabel (v, i) {
      v.value = ''
      this.filterLabel.splice(i, 1)
    }
  },
  created () {
    // 不重复请求
    this.condition = {
      ...this.condition,
      liveStartTime: this.time[0],
      liveEndTime: this.time[1]
    }
  },
  async mounted () {
    if (!this.hotlistfilter.loaded) {
      await this.forms_gethotfilter().then(data => {
        this.hotlistfilter.forEach(v => {
          const res = data[v.name]
          if (v.type === 'attrs') {
            v.attrs = v.pipe(res, v)
          }
        })
      })
    }
    this.loaded = this.hotlistfilter.loaded = true
    // auth
    this.valid = this.myauth.hotlive.filter2
  }
}
</script>

<style scoped lang="less">
.date {
  margin-right: 8rem;
  flex:1;
  justify-content: start;
}
.rich-filter {
  transform: translateY(1px);
}
.module-box {
  margin-bottom: 1rem;
}
</style>
<style lang="less">
#hotlive {
  .filter-label {
    .label {
      color: #999;
      margin: 0.3rem;
      padding: 0.1rem 0.5rem;
      font-size: var(--xs2font);
      border: 1px dashed var(--prcol);
      border-radius: 2px;
      > div {
        display: inline-block;
        color: var(--prcol);
      }
      span {
        display: inline-block;
        margin: 0 0.15rem;
      }
    }
  }
  .el-icon-close {
    margin-left: 3px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
