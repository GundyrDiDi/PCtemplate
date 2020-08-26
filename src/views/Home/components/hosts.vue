<template>
  <div id="host" class="flex">
    <transition
      enter-active-class="animated fast fadeInLeft"
      leave-active-class="animated fast fadeOutLeft"
    >
      <div v-show="$route.name==='hosts'">
        <div class="module-box flex-ter module-bar">
          <div class="t-title">人气主播</div>
          <input-suggestion
            size="small"
            class="searchbox"
            placeholder="搜索主播名称"
            itemName="anchorName"
            btntext="搜索主播"
            :request="request"
            @search="search"
          >
            <template slot-scope="{ item }">
              <div class="suggestions flex-ter">
                <img :src="'http:'+item.anchorImg" alt />
                <div>
                  <div>{{item.anchorName}}</div>
                  <div>{{item.mechanismName}}</div>
                </div>
              </div>
            </template>
          </input-suggestion>
          <el-popover
            placement="bottom"
            width="180"
            trigger="click">
            <template>
              <div>
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                <el-checkbox-group class="columngroup" v-model="checkedColumn" @change="columnchange">
                  <el-checkbox @change="checkboxchange(v,$event)" v-for="v in hostslist.column" :disabled="v.disabled" :label="v" :key="v.key" :checked="v.checked">{{v.title}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
            <el-button slot="reference" size="small">列表设置</el-button>
          </el-popover>
          <el-button style="margin-left:2rem" type="primary" size="small" @click="filterModal=true">高级筛选器</el-button>
        </div>
        <!-- auth -->
        <rich-filter
          v-if="loaded"
          @update="getlabel"
          :show.sync="filterModal"
          :formrule="richFilter"
        ></rich-filter>
        <transition
          enter-active-class="animated fadeIn faster"
          leave-active-class="animated fadeOut faster"
        >
          <transition-group
            tag="div"
            name="list"
            class="module-box filter-label flex-wrap"
            v-if="filterLabel.length"
          >
            <div v-for="(v,i) in filterLabel" :key="v.name" class="label">
              {{v.label}}：
              <div v-html="format(v)"></div>
              <i class="el-icon-close" @click="removelabel(v,i)"></i>
            </div>
          </transition-group>
        </transition>
        <!-- auth -->
        <table-paganation
          ref="table"
          :sortvalid="myauth.hosts.sort"
          :listvalid="myauth.hosts.list"
          :lockvalid="myauth.hosts.lock"
          :condition="condition"
          class="module-box hostslist"
          v-bind="hostslist"
          :column="checkedColumn"
        ></table-paganation>
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
      loaded: false,
      checkedColumn: []
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
    // suggestions
    request (param) {
      const { api } = this.hostslist
      const condition = { ...this.condition, ...param }
      return this.tables_getdata({ api, page: 1, size: 6, condition })
    },
    search (trustWord) {
      // this.$refs.table.resetParam()
      if (trustWord !== this.trustWord) {
        this.trustWord = trustWord
        // auth
        if (this.trustWord) {
          this.$store.commit('user/queryType', 'hosts,search')
        }
      }
    },
    format (v) {
      if (v.component === 'range') {
        return v.value.map((v2) => v2 + v.attrs.unit).join(' - ')
      } else if (v.component === 'select') {
        const value = Array.isArray(v.value) ? v.value : [v.value]
        return v.slot
          .filter((v2) => value.some((v3) => v3 === v2.attrs.value))
          .map((v) => `<span>${v.attrs.label}</span>`)
          .join('')
      } else {
        return v.value
      }
    },
    getlabel (val) {
      if (val.length) {
        // auth
        if (this.valid && this.valid()) return
        this.$store.commit('user/queryType', 'hosts,filter')
      }
      val.forEach(v => {
        const c = this.hostslist.column.find(v2 => v2.key === v.name)
        if (c && !this.checkedColumn.includes(c)) {
          this.$set(c, 'checked', true)
          this.checkedColumn.push(c)
          this.columnchange(this.checkedColumn)
        }
      })
      this.filterLabel = val
    },
    removelabel (v, i) {
      v.value = ''
      this.filterLabel.splice(i, 1)
    },
    columnchange (v) {
      v.sort((a, b) => a.sortIndex - b.sortIndex)
    },
    checkboxchange (c, v) {
      c.checked = v
    }
  },
  created () {
    if (!this.richFilter.loaded) {
      this.hostslist.column.map((v, i, arr) => {
        if (i === 0 || i === arr.length - 1) {
          v.disabled = true
        }
        v.sortIndex = i
        v.checked = true
        return v
      })
    }
  },
  async mounted () {
    this.$forceUpdate()
    this.$refs.table.request()
    if (!this.richFilter.loaded) {
      await this.forms_getrange().then((data) => {
        this.richFilter.forEach((v) => {
          const res = data[v.name]
          if (v.type === 'slot') {
            const attrs = v.slot.attrs
            v.slot = res.map((item) => ({
              component: v.slot.component,
              attrs: Object.entries(attrs).reduce((acc, [k, v]) => {
                const prop = v in item ? v : k
                acc[k] = item[prop]
                return acc
              }, {})
            }))
          } else if (v.type === 'attrs') {
            console.log(v)
            v.attrs = v.pipe(res)
          }
        })
      })
    }
    this.loaded = this.richFilter.loaded = true
    // auth
    this.valid = this.myauth.hosts.filter
  }
}
</script>

<style scoped lang="less">
#host {
  position: relative;
  height: 100%;
  width: 100%;
  > div {
    position: absolute;
    width: 100%;
  }
}
.module-box {
  margin-bottom: 1rem;
}
.hostslist {
  min-height: 60vh;
}
.module-bar button{
  height:32px;
}
.columngroup{
  >*{
    display:block;
    margin:.3rem 0;
  }
}
</style>
<style lang="less">
#host {
  .t-title{
    margin-right: 1rem;
  }
  .searchbox {
    width: 45%;
    margin-right: 45%;
    flex:1;
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
