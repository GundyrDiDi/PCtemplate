<template>
  <div id="pay">
    <div class="t-title">订单详情</div>
    <div>
      <span class="auth-des">如需发票，请在支付完成后，在我的购买记录中提交申请</span>
    </div>
    <div class="title flex-ter">
      <div>套餐版本</div>
      <el-radio-group v-model="version.level" size="medium" @change="a">
        <el-radio-button v-for="v in levels" :key="v.label" :label="v.level">{{v.label}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="title flex-ter">
      <div>套餐时长</div>
      <el-radio-group v-model="time" size="medium">
        <el-radio-button v-for="v in times" :key="v.name" :label="v.value">
          {{v.name}}
          <span v-show="v.onsale"></span>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="title flex-ter">
      <div>有效期至</div>
      <!-- <div>微信支付</div> -->
      <div>{{calcdate(time)}}</div>
    </div>
    <div class="title flex-ter">
      <div>支付方式</div>
      <!-- <div>微信支付</div> -->
      <img :src="imgs.weixin" alt />
    </div>
    <div class="title flex-ter">
      <div>应付金额</div>
      <div class="money">{{formatNumber(parseInt(time*parseFloat(version.price)))}} 元</div>
    </div>
    <div>
      <el-button type="primary" style="padding:12px 30px;">立即支付</el-button>
    </div>
  </div>
</template>
<script>
import { formatDate, formatNumber } from '@/plugins/util'
export default {
  name: 'pay',
  props: ['version', 'levels'],
  data () {
    return {
      times: [
        { name: '1天', value: 1 },
        { name: '30天', value: 30 },
        { name: '90天', value: 90 },
        { name: '180天', value: 180 },
        { name: '365天', value: 365, onsale: '优惠' }
      ],
      time: 1,
      formatNumber
    }
  },
  watch: {
    version: {
      handler (v) {
        console.log(v)
      },
      deep: true
    },
    time (v) {
      console.log(v)
    }
  },
  methods: {
    a (v) {
      this.version.price = this.levels[v - 2].price
    },
    calcdate (month) {
      const date = new Date()
      date.setDate(date.getDate() + month)
      return formatDate(date, 'yyyy年MM月dd日')
    }
  }
}
</script>
<style lang="less">
#vip .ivu-modal-mask {
  background: rgba(0, 0, 0, 0);
}
#pay {
  padding-bottom: 10px;
  .title {
    font-weight: 200;
  }
  .auth-des {
    font-size: var(--xs2font);
  }
  .title {
    margin: 18px 0;
    height: 36px;
    > div:first-of-type {
      width: 80px;
    }
    img {
      height: 20px;
    }
    .money {
      color: var(--dacol);
      font-size: 18px;
    }
  }
}
</style>
