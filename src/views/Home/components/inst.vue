<template>
  <div id="inst">
    <div class="module-box flex-ter module-bar">
      <div class="t-title">机构月榜</div>
      <el-date-picker
        class="date"
        v-model="time"
        type="month"
        size="small"
        value-format="yyyy-MM"
        placeholder="选择月"
        :clearable="false"
        :editable="false"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
        <input-suggestion class="searchbox"
          size="small"
          placeholder="搜索机构或主播"
          itemName="mechanismName"
          :request="request"
          @search="search"
        >
          <!-- <template #suffix>
            <el-input
              style="width:7rem;margin-right:1rem;"
              size="small" clearable
              v-model="anchorName"
              placeholder="主播名"
            ></el-input>
          </template> -->
          <div class="suggestions flex-ter" slot-scope="{ item }">
            <img :src="item.mechanismLogo"/>
            <div>{{item.mechanismName}}</div>
            <el-tag type="success">{{item.mechanismScore}}分</el-tag>
          </div>
        </input-suggestion>
    </div>
    <!-- auth -->
    <table-paganation
    :listvalid="myauth.inst.list"
    ref="table" class="module-box inslist" :condition="condition" v-bind="inslist"></table-paganation>
    <modal-table></modal-table>
    <modal-list></modal-list>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/util'
export default {
  name: 'inst',
  data () {
    return {
      anchorName: '',
      trustWord: '',
      time: formatDate(new Date(), 'yyyy-MM'),
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    condition () {
      return {
        monthId: this.time,
        mechanismName: this.trustWord,
        anchorName: this.anchorName
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
</style>
