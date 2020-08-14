<template>
  <div id="inst">
    <div class="module-box flex-ter">
      <div class="s-title">机构月榜</div>
      <el-date-picker
        class="date"
        v-model="time"
        type="month"
        size="small"
        value-format="yyyy-MM"
        placeholder="选择月">
      </el-date-picker>
        <input-suggestion class="searchbox"
          size="small"
          placeholder="搜索机构或主播"
          itemName="mechanismName"
          :request="request"
          @search="search"
        >
          <div class="suggestions flex-ter" slot-scope="{ item }">
            <img :src="item.mechanismLogo"/>
            <div>{{item.mechanismName}}</div>
            <el-tag type="success">{{item.mechanismScore}}分</el-tag>
          </div>
        </input-suggestion>
    </div>
    <table-paganation
    ref="table" class="module-box inslist" :condition="condition" v-bind="inslist"></table-paganation>
  </div>
</template>

<script>
// import { formatDate } from '@/plugins/util'
export default {
  name: 'inst',
  data () {
    return {
      trustWord: '',
      time: '' // formatDate(new Date(), 'yyyy-MM')
    }
  },
  computed: {
    condition () {
      return {
        monthId: this.time,
        mechanismName: this.trustWord
      }
    }
  },
  methods: {
    request (param) {
      const { api } = this.inslist
      const condition = { ...this.condition, ...param }
      return this.tables_getdata({ api, page: 1, size: 6, condition })
    },
    search (trustWord) {
      // auth
      const fn = this.myauth.inst.search
      if (fn && fn.call(this)) return
      this.$refs.table.resetParam()
      this.trustWord = trustWord
    }
  },
  mounted () {
    this.$refs.table.request()
  }
}
</script>

<style scoped lang="less">
.flex-ter{
  >div{
    margin-right:1rem;
  }
  .date{
    width:7rem;
  }
  .searchbox{
    width:18rem;
    font-size:var(--xs2font);
  }
}
.module-box{
  margin-bottom:1rem;
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
}
</style>
<style lang="less">
  .searchbox {
    .el-input__inner {
      border-radius: 4px 0 0 4px;
      font-size:var(--xs2font)
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
</style>
