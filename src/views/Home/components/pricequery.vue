<template>
  <div id="inst">
    <div class="module-box module-bar" style="text-align:left">
      <div class="t-title" style="margin-bottom:.5rem">历史合作价格查询</div>
      <el-form :model="form" label-width="3.8rem" :inline="true" size="small">
        <el-form-item label="商品ID" >
          <el-input v-model="form.goodsID" style="width:7rem"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsName" style="width:10rem"></el-input>
        </el-form-item>
        <el-form-item label="主播名称">
          <!-- <el-input v-model="form.anchorName" style="width:8rem"></el-input> -->
            <el-select
                clearable
                style="width:9rem"
                v-model="form.anchorName"
                filterable
                remote
                @change="handlechange"
                reserve-keyword
                :remote-method="request">
                <el-option
                    v-for="item in anchors"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="直播日期">
            <el-date-picker
                style="width:14rem"
                class="date"
                v-model="form.dateTime"
                type="daterange"
                size="small"
                align="left"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="—"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                :editable="false"
                :picker-options="pickerOptions"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click="searchForm">搜索</el-button>
            <el-button size="small" type="default" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="module-box" style="text-align:left">
        <div class="t-title">查询简报
            <span style="font-size:var(--xxsfont)">以上查询包含</span>
        </div>
        <div class="flex-ard">
            <div v-for="v in biref" :key="v.label">
                <div style="color:var(--prcol);">{{v.label}}</div>
                <div style="font-weight:600;height:1.2rem">{{v.value}}</div>
            </div>
        </div>
    </div>
    <!-- auth -->
    <table-paganation
      :listvalid="myauth.inst.list"
      ref="table"
      class="module-box"
      :condition="condition"
      sortclick="default"
      v-bind="liveprice"
    ></table-paganation>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/util'
export default {
  name: 'inst',
  data () {
    return {
      form: {
        goodsID: '',
        goodsName: '',
        anchorName: '',
        dateTime: []
      },
      anchors: [],
      time: formatDate(new Date(), 'yyyy-MM'),
      pickerOptions: {
        disabledDate (date) {
          return date.getTime() > Date.now()
        }
      },
      condition: {},
      biref: [
        { label: '直播场次', prop: 'liveCnt', value: '' },
        { label: '主播数', prop: 'anchorCnt', value: '' },
        { label: '商品数', prop: 'goodsCnt', value: '' },
        { label: '最高商品原价', prop: 'highestPriceCnt', value: '' },
        { label: '最低商品原价', prop: 'lowestPriceCnt', value: '' }
      ]
    }
  },
  methods: {
    request (word) {
      const { api } = this.hostslist
      this.tables_getdata({
        api,
        page: 1,
        size: 6,
        sort: 'fansNum,desc',
        condition: {
          anchorName: word,
          anchorType: '1,2,3'
        }
      }).then(res => {
        this.anchors = res.data.map(v => {
          return {
            label: v.anchorName,
            value: v.anchorName
          }
        })
      })
    },
    handlechange (v) {
      this.$set(this.condition, 'anchorName', v)
    },
    searchForm () {
      // auth
      console.log(this.form)
      const fn = this.myauth.inst.search
      if (fn && fn.call(this)) return
      this.$refs.table.resetParam()
      this.condition = {
        startTime: this.form.dateTime[0],
        endTime: this.form.dateTime[1],
        taobaoGoodsId: this.form.goodsID,
        taobaoGoodsName: this.form.goodsName,
        anchorName: this.form.anchorName
      }
      this.getBrief()
    },
    resetForm () {
      this.$refs.table && this.$refs.table.resetParam()
      const date = new Date(this.newdate)
      this.form = {
        goodsID: '',
        goodsName: '',
        anchorName: '',
        dateTime: [
          formatDate(date),
          formatDate(date)
        ]
      }
      this.condition = {
        startTime: this.form.dateTime[0],
        endTime: this.form.dateTime[1]
      }
      this.getBrief()
    },
    getBrief () {
      setTimeout(e => {
        const { sizeOpts, ...param } = this.$refs.table.param
        let { startTime, endTime, taobaoGoodsId, taobaoGoodsName, anchorName } = this.condition
        startTime = startTime.replace(/[-/]/g, '')
        endTime = endTime.replace(/[-/]/g, '')
        Axios.get('liveprice/brief', { startTime, endTime, taobaoGoodsId, taobaoGoodsName, anchorName, ...param }).then(res => {
          console.log(res)
          this.biref.forEach(v => {
            this.$set(v, 'value', res[v.prop])
          })
        })
      }, 100)
    }
  },
  created () {
    this.resetForm()
  }
}
</script>

<style scoped lang="less">
.flex-ter {
  > div {
    margin-right: 1rem;
  }
  .date {
    width: 7rem;
  }
  .searchbox {
    width: 18rem;
    font-size: var(--xs2font);
  }
}
.module-box {
  margin-bottom: 1rem;
}
.el-input{
    font-size:var(--xs2font)
}
.flex-ard{
    font-size:var(--xs2font);text-align:center;
    padding-top:.5rem;
    line-height:1.2rem;
}
</style>
