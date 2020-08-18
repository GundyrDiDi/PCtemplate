<template>
  <div id="host" class="flex">
    <transition
      enter-active-class="animated fast fadeInLeft"
      leave-active-class="animated fast fadeOutLeft"
    >
      <div v-show="$route.name==='hosts'">
        <div class="module-box flex">
            <input-suggestion class="searchbox"
              placeholder="搜索主播名称"
              itemName="anchorName"
              btntext="搜索主播"
              :request="request"
              @search="search"
            >
              <template slot-scope="{ item }">
                <div class="suggestions flex-ter">
                  <img :src="'http:'+item.anchorImg" alt="">
                  <div>
                    <div>{{item.anchorName}}</div>
                    <div>{{item.mechanismName}}</div>
                  </div>
                  <div>粉丝: {{item.fansNum}}</div>
                  <el-tag>{{item.skilledField}}</el-tag>
                </div>
              </template>
            </input-suggestion>
          <div class="flex-ter rich-filter">
            <el-button type="default" size="small" @click="showfilter">高级筛选器</el-button>
          </div>
        </div>
        <rich-filter
        v-if="loaded"
        @update="filterLabel=$event"
        :show.sync="filterModal" :formrule="richFilter"></rich-filter>
        <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        >
          <transition-group tag="div" name="list"
          class="module-box filter-label flex-wrap" v-if="filterLabel.length">
            <div v-for="(v,i) in filterLabel" :key="v.name" class="label">
              {{v.label}}：
              <div v-html="format(v)"></div>
              <i class="el-icon-close" @click="removelabel(v,i)"></i>
            </div>
          </transition-group>
        </transition>
        <!-- auth -->
        <table-paganation ref="table"
        :sortvalid="myauth.hosts.sort"
        :condition="condition" class="module-box hostslist" v-bind="hostslist"></table-paganation>
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
      trustWord: '',
      filterModal: false,
      filterLabel: [],
      loaded: false
    }
  },
  computed: {
    condition () {
      return {
        anchorName: this.trustWord,
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
    showfilter () {
      // auth
      const fn = this.myauth.hosts.filter
      if (fn && fn.call(this)) return
      this.filterModal = true
    },
    // suggestions
    request (param) {
      const { api } = this.hostslist
      const condition = { ...this.condition, ...param }
      return this.tables_getdata({ api, page: 1, size: 6, condition })
    },
    search (trustWord) {
      this.$refs.table.resetParam()
      this.trustWord = trustWord
    },
    format (v) {
      if (v.component === 'range') {
        return v.value.map(v2 => v2 + v.attrs.unit).join(' - ')
      } else if (v.component === 'select') {
        const value = Array.isArray(v.value) ? v.value : [v.value]
        return v.slot
          .filter(v2 => value.some(v3 => v3 === v2.attrs.value))
          .map(v => `<span>${v.attrs.label}</span>`)
          .join('')
      }
    },
    removelabel (v, i) {
      v.value = ''
      this.filterLabel.splice(i, 1)
    }
  },
  async mounted () {
    this.$refs.table.request()
    if (!this.richFilter.loaded) {
      await this.forms_getrange().then(data => {
        this.richFilter.forEach(v => {
          const res = data[v.name]
          if (v.type === 'slot') {
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
      })
    }
    this.loaded = this.richFilter.loaded = true
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
.suggestions{
  font-size:var(--xxsfont);
  line-height:1rem;
  justify-content: space-around;
  padding:0.2rem 0;
  img{
    width:2rem;
    border-radius:50%;
  }
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
