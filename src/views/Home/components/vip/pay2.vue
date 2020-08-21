<template>
  <div id="pay">
    <div class="t-title flex-ter">
      {{version.label}}
      <!-- <img class="dimand" :src="imgs[version.icon]" alt /> -->
    </div>
    <div>
      <div class="title">购买时长</div>
      <div class="tabs flex-ter flex-bwn">
        <div
          class="tab flex-center"
          v-for="v in times"
          :key="v.name"
          :class="v===version.time?'active':''"
          @click="a(v,'time')"
        >{{v.name}}</div>
      </div>
    </div>
    <div>
      <div class="title">支付方式</div>
      <div class="tabs flex-ter flex-bwn">
        <div
          class="tab flex-center"
          v-for="v in ways"
          :key="v.name"
          :class="v===version.way?'active':''"
          @click="a(v,'way')"
        >
          <img :src="imgs[v.icon]" alt />
        </div>
      </div>
    </div>
    <div v-if="version.time">
      <div class="title">订单详情</div>
      <div class="mingxi">
        <div class="flex-bwn">
          <div>版本类型</div>
          <div>{{version.label}}</div>
        </div>
        <div class="flex-bwn">
          <div>购买时长</div>
          <div>{{version.time.name}}</div>
        </div>
        <div class="flex-bwn">
          <div>支付方式</div>
          <div>{{version.way.name}}</div>
        </div>
        <div class="flex-bwn">
          <div>有效期至</div>
          <div>{{calcdate(version.time.value)}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        <div class="flex-bwn flex-ter mingxi">
          <div>应付金额</div>
          <div class="money">{{formatNumber(version.time.value*parseFloat(version.price))}} 元</div>
        </div>
      </div>
      <div>
        <el-button type="primary" style="padding:12px 30px;margin:5px">立即支付</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate, formatNumber } from '@/plugins/util'
export default {
  name: 'pay',
  props: ['version'],
  data () {
    return {
      times: [
        { name: '12个月', value: 12 },
        { name: '6个月', value: 6 },
        { name: '3个月', value: 3 }
      ],
      ways: [{ name: '微信支付', icon: 'weixin' }],
      formatNumber
    }
  },
  watch: {
    version (v) {
      v.time || (v.time = this.times[0])
      v.way || (v.way = this.ways[0])
    }
  },
  methods: {
    a (v, prop) {
      this.$set(this.version, prop, v)
      this.$forceUpdate()
    },
    calcdate (month) {
      const date = new Date()
      date.setMonth(date.getMonth() + month)
      return formatDate(date, 'yyyy年MM月dd日')
    }
  }
}
</script>
<style lang="less">
#vip .ivu-modal-mask {
  background: rgba(0, 0, 0, 0);
}
#pay{
    padding-bottom:10px;
}
#pay .title {
  font-weight: 200;
  margin-top: 0.7rem;
  padding: 0.5rem 0;
  border-top: 1px solid #f2f2f2;
}
.t-title {
  .dimand {
    height: 1.2rem;
    margin-left: 0.4rem;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
  }
}
.tabs {
  padding: 0 1rem;
  .tab {
    border: 1px solid #ddd;
    border-radius: 3px;
    width: 28%;
    height: 50px;
    text-align: center;
    font-size: var(--sfont);
    cursor: pointer;
    &.active {
      border-color: var(--prcol);
      background: var(--lbgcol);
    }
    img {
      height: 45%;
      margin-right: 5px;
    }
  }
}
.mingxi {
  width: 240px;
  > .flex-bwn {
    padding: 4px 0;
  }
}
.money{
    color:var(--dacol);
    font-size:18px;
}
</style>
