<template>
  <div id="inst">
    <div class="module-box">
      <div class="flex-ter">
        <div class="s-title">直播商品月榜</div>
        <el-date-picker
          class="date"
          v-model="time"
          type="month"
          size="small"
          placeholder="选择月">
        </el-date-picker>
        <div class="flex searchbox">
              <el-input size="small" placeholder="商品ID或标题" v-model="goodsWord" clearable></el-input>
              <el-input class="middle" size="small" placeholder="商品品牌" v-model="brandWord" clearable></el-input>
              <el-button size="small" type="primary">搜索</el-button>
        </div>
        <el-button size="small" type="default">重置</el-button>
      </div>
      <div class="filter">
        <select-collapse v-model="filters.catalog1" v-bind="catalog"></select-collapse>
        <select-collapse v-model="filters.catalog1" v-bind="catalog"></select-collapse>
        <select-collapse v-model="filters.catalog1" v-bind="catalog"></select-collapse>
        <div class="flex">
          <div v-for="v in goodrelative" :key="v.name" class="range flex">
            <div class="flex-ter">{{v.label}}</div>
            <el-range v-bind="v.attrs" v-model="filters[v.name]"></el-range>
          </div>
        </div>
      </div>
    </div>
    <table-paganation class="module-box goodslist" :condition="condition" v-bind="goodslist"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'goods',
  data () {
    return {
      goodsWord: '',
      brandWord: '',
      time: new Date(),
      filters: {
        catalog1: '',
        relativehost: [],
        relativelive: []
      }
    }
  },
  watch: {
    filters: {
      handler (f) {
        console.log(f)
      },
      deep: true
    }
  },
  computed: {
    condition () {
      return { month: this.time }
    }
  },
  methods: {
    async updateformrule (formrule) {
      await Promise.all(formrule.map(v => {
        if (!v.responed) {
          return this.forms_getdata(v).then(res => {
            v.responed = true
            v.attrs = v.pipe(res)
          })
        }
      }))
      formrule.reduce((acc, v) => {
        acc[v.name] = (v.value || v.attrs.value) || ''
        return acc
      }, this.filters)
    }
  },
  created () {
    this.updateformrule(this.goodrelative)
  }
}
</script>

<style scoped lang="less">
.flex-ter{
  >div{
    margin:0 1rem;
  }
  .date{
    width:7rem;
  }
  .searchbox{
    width:24rem;
    font-size:var(--xs2font);
  }
}
.filter{
  border-top:1px dashed #ddd;
  font-size:var(--xsfont);
  margin-top:.5rem;
  >div{
    margin-top:1rem;
  }
  .range{
    width:40%;
    margin-right:9%;
    .el-range{
      margin-left:3%;
      flex:1;
    }
  }
}
.module-box{
  margin-bottom:1rem;
}
</style>
<style lang="less">
  .searchbox {
    .middle{
      width:12rem;
      .el-input__inner {
        border-radius: 0;
        border-left-width:0;
        &:focus{
          box-shadow:-1px 0 1px var(--prcol);
        }
      }
    }
    .el-input__inner {
      border-radius: 4px 0 0 4px;
      font-size:var(--xs2font)
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
</style>
