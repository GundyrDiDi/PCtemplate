<template>
  <div id="pay">
    <div class="t-title">订单详情</div>
    <div>
      <span class="auth-des">如需发票，请在支付完成后，在我的购买记录中提交申请</span>
    </div>
    <div class="title flex-ter">
      <div>套餐版本</div>
      <el-radio-group v-model="version.level" size="medium">
        <el-radio-button v-for="v in levels" :key="v.label" :label="v.level"
        :disabled="v.level<User.level"
        >{{v.label}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="title flex-ter">
      <div>套餐时长</div>
      <el-radio-group v-model="time" size="medium" @change="changeTime">
        <el-radio-button v-for="v in times" :key="v.name" :label="v.value">
          {{v.name}}
          <span v-show="v.onsale"></span>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="title flex-ter">
      <div>有效期至</div>
      <div>{{calcdate(time)}}</div>
    </div>
    <div class="title flex-ter">
      <div>支付方式</div>
      <img :src="imgs.weixin" alt />
    </div>
    <div class="title flex-ter">
      <div>应付金额</div>
      <div class="money">
        {{cost}} 元
        <!-- 0.01 元 -->
        <!-- <span style="font-size:10px;" class="bolder">（ 限时优惠 ）</span> -->
      </div>
    </div>
    <div>
      <el-button type="primary" style="padding:12px 30px;" @click="paymoney">立即支付</el-button>
      <el-dialog
      :append-to-body="true"
      top="24vh"
      :show-close="false"
      :visible.sync="toggleQC" width="300px">
        <template #title>
          <img :src="imgs.weixin" alt style="margin-left:53px"/>
        </template>
        <div ref="qc" id="qrcode" class="flex-center" style="transform:translateY(-15px)"></div>
        <div style="font-size: var(--xs2font);margin-top:10px" class="flex-cen">使用微信扫描二维码付款</div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { formatDate, formatNumber } from '@/plugins/util'
import QRCode from 'qrcodejs2'
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
      formatNumber,
      qrcode: '',
      toggleQC: false,
      timer: null,
      cost: 0
    }
  },
  watch: {
    version: {
      handler (v) {
        this.getcost()
      },
      deep: true,
      immediate: true
    },
    toggleQC (v) {
      if (!v) {
        clearTimeout(this.timer)
      }
    }
  },
  methods: {
    changeTime (v) {
      this.getcost()
    },
    getcost () {
      Axios.post('vip/price', {
        timeLength: this.time,
        vipLevel: this.version.level
      }).then(res => {
        console.log(res)
        this.cost = res ? res.money : 0
      })
    },
    calcdate (month) {
      const date = new Date()
      date.setDate(date.getDate() + month)
      return formatDate(date, 'yyyy年MM月dd日')
    },
    paymoney () {
      console.log(this.version)
      Axios.post('user/createCost', {
        goodsName: '鲸宸数据会员套餐',
        timeLength: this.time,
        vipLevel: this.version.level
      }).then(res => {
        this.toggleQC = true
        requestAnimationFrame(() => {
          this.$refs.qc.innerHTML = ''
          const qrcode = new QRCode('qrcode', {
            width: 168,
            height: 168
          })
          qrcode.makeCode(res.obj.code_url)
        })
        const st = () => {
          this.timer = setTimeout(() => {
            Axios.get('user/checkPaid').then(res => {
              console.log(res)
              if (res) {
                this.$myalert('支付成功，刷新页面后即可体验！')
                setTimeout(e => {
                  location.reload()
                }, 2000)
              } else {
                st()
              }
            })
          }, 1000)
        }
        st()
      })
    }
  }
}
</script>
<style lang="less">
// #vip .ivu-modal-mask {
//   background: rgba(0, 0, 0, 0);
// }
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
