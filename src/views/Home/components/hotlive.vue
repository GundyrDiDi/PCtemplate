<template>
  <div id="hotlive">
    <div class="module-box flex-ter flex-bwn">
      <div class="s-title">人气直播</div>
      <date-pick class="flex-center date" :time.sync="time"></date-pick>
      <div class="flex-ter rich-filter">
        <el-button type="primary" size="small" @click="showFilter=true">高级筛选器</el-button>
      </div>
    </div>
    <rich-filter @update="filterLabel=$event" :show.sync="showFilter" :formrule="hotlistfilter"></rich-filter>
    <transition-group
      tag="div"
      enter-active-class="animated zoomIn faster"
      leave-active-class="animated zoomOut faster"
      class="module-box filter-label flex"
      v-if="filterLabel.length"
    >
      <div v-for="(v,i) in filterLabel" :key="v.name" class="label">
        {{v.label}}：
        <div v-html="format(v)"></div>
        <i class="el-icon-close" @click="removelabel(v,i)"></i>
      </div>
    </transition-group>
    <table-paganation :condition="filterLabel" class="module-box livelist" v-bind="livelist"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'hotlive',
  data () {
    return {
      time: [new Date(), new Date()],
      showFilter: false,
      filterLabel: []
    }
  },
  computed: {
    condition () {
      return {}
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
    removelabel (v, i) {
      v.value = ''
      this.filterLabel.splice(i, 1)
    }
  },
  watch: {
    filterLabel (v) {
      console.log(v)
    }
  }
}
</script>

<style scoped lang="less">
.date {
  margin-right: 8rem;
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
