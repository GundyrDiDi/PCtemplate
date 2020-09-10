<template>
  <div id="inst">
    <div class="module-box">
      <div class="flex-ter nav module-bar">
        <div class="t-title">直播商品月榜</div>
        <el-date-picker
          class="date"
          v-model="time"
          type="month"
          value-format="yyyy-MM"
          size="small"
          placeholder="选择月"
          :clearable="false"
          :editable="false"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <input-suggestion
          size="small"
          class="searchbox"
          placeholder="商品ID或标题"
          itemName="taobaoGoodsName"
          :request="request"
          @search="search"
        >
          <template slot-scope="{ item }">
            <div class="suggestions flex-ter">
              <img :src="item.goodsImg"/>
              <div class="suggestions-title">{{item.taobaoGoodsName}}</div>
            </div>
          </template>
          <template #suffix>
            <el-select
              v-model="brandWord"
              filterable
              clearable
              remote
              :remote-method="remoteMethod"
              size="small"
              class="middle"
              placeholder="商品品牌"
              no-match-text="无匹配品牌"
              popper-class="custom-options">
              <el-option
                v-for="v in brands"
                :key="v.name"
                :label="v.name"
                :value="v.name">
                <div class="flex-ter">
                  <span>{{v.name}}</span>
                </div>
              </el-option>
            </el-select>
          </template>
        </input-suggestion>
        <el-button size="small" type="default" @click="reset">重置</el-button>
      </div>
      <div class="filter">
        <select-collapse :valid="valid" v-model="catalog.value" v-bind="catalog"></select-collapse>
        <div class="flex">
          <div v-for="v in goodrelative" :key="v.name" class="range flex">
            <div class="flex-ter">{{v.label}}</div>
            <el-range :valid="valid" v-bind="v.attrs" v-model="v.value"></el-range>
          </div>
        </div>
      </div>
    </div>
    <!-- auth -->
    <table-paganation
      ref="table"
      class="module-box goodslist"
      :debounce="300"
      :condition="condition"
      :sortvalid="myauth.goods.sort"
      :listvalid="myauth.goods.list"
      :lockvalid="myauth.goods.lock"
      v-bind="goodslist"
    ></table-paganation>
    <modal-table></modal-table>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/util'
export default {
  name: 'goods',
  data () {
    return {
      goodsWord: '',
      brandWord: '',
      brands: [],
      time: formatDate(new Date(), 'yyyy-MM'),
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now()
        }
      },
      valid: false
    }
  },
  computed: {
    condition () {
      return {
        monthId: this.time,
        brandName: this.brandWord,
        [/^\d{3,}$/.test(this.goodsWord) ? 'taobaoGoodsId' : 'taobaoGoodsName']: this.goodsWord,
        [this.catalog.name]: this.catalog.value,
        ...this.goodrelative.reduce((acc, v) => {
          if (v.attrs.base) {
            acc[v.name] = {
              type: v.component,
              value: v.value,
              base: v.attrs.base
            }
          }
          return acc
        }, {})
      }
    }
  },
  methods: {
    request (param) {
      const { api } = this.goodslist
      const condition = { ...this.condition, ...param }
      return this.tables_getdata({ api, page: 1, size: 5, condition })
    },
    search (trustWord) {
      this.$refs.table.resetParam()
      this.goodsWord = trustWord
    },
    async remoteMethod (word) {
      if (word) {
        this.brands = await this.forms_getbrand(word)
      } else {
        this.brands = []
      }
    },
    reset () {
      this.goodsWord = ''
      this.brandWord = ''
      this.time = formatDate(new Date(), 'yyyy-MM')
      this.catalog.value = ''
      this.goodrelative.forEach((v) => {
        v.value = [v.attrs.min, v.attrs.max]
      })
    }
  },
  async mounted () {
    if (!this.goodrelative.loaded) {
      await this.forms_getrelative().then((data) => {
        this.goodrelative.forEach((v) => {
          const res = data[v.name]
          v.attrs = v.pipe(res, v)
        })
      })
    }
    this.loaded = this.goodrelative.loaded = true
    // auth
    this.valid = this.myauth.goods.filter2
  }
}
</script>

<style scoped lang="less">
.nav {
  > div {
    margin-right:1rem;
  }
  .date {
    width: 7rem;
  }
  .searchbox {
    width: 28rem;
    font-size: var(--xs2font);
  }
}
.filter {
  border-top: 1px dashed #ddd;
  font-size: var(--xsfont);
  margin-top: 0.5rem;
  > div {
    margin-top: 1rem;
  }
  .range {
    width: 40%;
    margin-right: 9%;
    .el-range {
      margin-left: 3%;
      flex: 1;
    }
  }
}
.module-box {
  margin-bottom: 1rem;
}
</style>
<style lang="less">
.custom-options{
  .el-select-dropdown__item{
    font-size:var(--xs2font)
  }
}
.searchbox {
  .middle {
    width: 8rem;
    margin-right:1rem;
  }
}
</style>
