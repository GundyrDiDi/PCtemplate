<template>
  <div id="inst">
    <div class="module-box">
      <div class="flex-ter nav">
        <div class="s-title">直播商品月榜</div>
        <el-date-picker
          class="date"
          v-model="time"
          type="month"
          value-format="yyyy-MM"
          size="small"
          placeholder="选择月"
        ></el-date-picker>
        <!-- <div class="flex searchbox">
              <el-input size="small" placeholder="商品ID或标题"
              v-model="goodsWord" clearable></el-input>
              <el-input class="middle" size="small" placeholder="商品品牌"
              v-model="brandWord" clearable></el-input>
              <el-button size="small" type="primary">搜索</el-button>
        </div>-->
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
            <el-input class="middle" size="small" placeholder="商品品牌"
                v-model="brandWord" clearable></el-input>
          </template>
        </input-suggestion>
        <el-button size="small" type="default" @click="reset">重置</el-button>
      </div>
      <div class="filter">
        <select-collapse v-model="catalog.value" v-bind="catalog"></select-collapse>
        <div class="flex">
          <div v-for="v in goodrelative" :key="v.name" class="range flex">
            <div class="flex-ter">{{v.label}}</div>
            <el-range v-bind="v.attrs" v-model="v.value"></el-range>
          </div>
        </div>
      </div>
    </div>
    <table-paganation
      ref="table"
      class="module-box goodslist"
      :debounce="300"
      :condition="condition"
      v-bind="goodslist"
    ></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'goods',
  data () {
    return {
      goodsWord: '',
      brandWord: '',
      time: ''
    }
  },
  computed: {
    condition () {
      return {
        monthId: this.time,
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
    reset () {
      this.goodsWord = ''
      this.brandWord = ''
      this.time = ''
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
          v.attrs = v.pipe(res)
        })
      })
    }
    this.loaded = this.goodrelative.loaded = true
  }
}
</script>

<style scoped lang="less">
.nav {
  > div {
    margin: 0 1rem;
  }
  .date {
    width: 7rem;
  }
  .searchbox {
    width: 26rem;
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
.suggestions{
  font-size:var(--xxsfont);
  line-height:1rem;
  justify-content: space-around;
  padding:0.2rem 0;
  img{
    width:2rem;
    margin:2px 5px;
    border-radius:50%;
  }
  .suggestions-title{
    width:calc(100% - 2rem);
    white-space: normal;
  }
}
</style>
<style lang="less">
.searchbox {
  .middle {
    width: 6rem;
    .el-input__inner {
      border-radius: 0;
      border-left-width: 0;
      &:focus {
        box-shadow: -1px 0 1px var(--prcol);
      }
    }
  }
  .el-input__inner {
    border-radius: 4px 0 0 4px;
    font-size: var(--xs2font);
  }
  .el-button {
    border-radius: 0 4px 4px 0;
  }
}
</style>
