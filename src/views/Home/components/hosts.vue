<template>
  <div id="host" class="flex">
    <transition
      enter-active-class="animated fast fadeInLeft"
      leave-active-class="animated fast fadeOutLeft"
    >
      <div v-show="$route.name==='hosts'">
        <div class="module-box flex">
          <div class="flex searchbox">
            <el-input placeholder="搜索主播名称" v-model="hostWord"></el-input>
            <el-button type="primary">搜索主播</el-button>
          </div>
          <div class="flex-ter rich-filter">
            <el-button type="default" size="small" @click="showFilter=true">高级筛选器</el-button>
          </div>
        </div>
        <rich-filter @update="filterLabel=$event" :show.sync="showFilter" :formrule="richFilter"></rich-filter>
        <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        >
          <transition-group tag="div"
          enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster"
          class="module-box filter-label flex" v-if="filterLabel.length">
            <div v-for="(v,i) in filterLabel" :key="v.name" class="label">
              {{v.label}}：
              <div v-html="format(v)"></div>
              <i class="el-icon-close" @click="removelabel(v,i)"></i>
            </div>
          </transition-group>
        </transition>
        <table-paganation :condition="filterLabel" class="module-box hostslist" v-bind="hostslist"></table-paganation>
      </div>
    </transition>
    <transition
      enter-active-class="animated fast fadeInRight"
      leave-active-class="animated fast fadeOutRight"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'hosts',
  data () {
    return {
      hostWord: '',
      showFilter: false,
      filterLabel: []
    }
  },
  methods: {
    format (v) {
      if (Array.isArray(v.value)) {
        if (v.component === 'range') {
          return v.value.map(v2 => v2 + v.attrs.unit).join(' - ')
        } else if (v.component === 'select') {
          return v.slot
            .filter(v2 => v.value.some(v3 => v3 === v2.attrs.value))
            .map(v => `<span>${v.attrs.label}</span>`)
            .join('')
        }
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
#host {
  position: relative;
  height:100%;
  width:100%;
  > div {
    position: absolute;
    width: 100%;
  }
}
.rich-filter {
  flex: 1;
  padding-left: 2rem;
}
.module-box {
  margin-bottom: 1rem;
}
.hostslist {
  min-height: 60vh;
}
</style>
<style lang="less">
#host {
  .searchbox {
    width: 40%;
    .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
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
