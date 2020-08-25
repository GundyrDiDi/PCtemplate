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
                <div>粉丝: {{item.fansNum}}</div>
                <el-tag>{{item.skilledField}}</el-tag>
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
                  <el-checkbox v-for="v in column" :label="v" :key="v.key" :checked="v.checked">{{v.title}}</el-checkbox>
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
      column: [],
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
      }
    },
    getlabel (val) {
      if (val.length) {
        // auth
        if (this.valid && this.valid()) return
        this.$store.commit('user/queryType', 'hosts,filter')
      }
      this.filterLabel = val
    },
    removelabel (v, i) {
      v.value = ''
      this.filterLabel.splice(i, 1)
    },
    columnchange (v) {
      console.log(v)
    }
  },
  async mounted () {
    this.column = [...this.hostslist.column.slice(1, -1)].map(v => {
      v.checked = true
      return v
    })
    console.log(this.column)
    this.$refs.table.request()
    if (!this.richFilter.loaded) {
      await this.forms_getrange().then((data) => {
        console.log(data)
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
    margin-right: 35%;
    flex:1;
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
