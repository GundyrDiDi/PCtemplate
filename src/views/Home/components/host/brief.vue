<template>
  <div class="brief flex">
    <div class="flex-ter">
      <img class="head avator-shadow" :src="actHost.img" alt="">
      <div class="attribute">
        <div class="s-title">{{actHost.name}}</div>
        <div class="flex info">
          <div>擅长领域：
            <span class="bolder">{{actHost.goodat}}</span>
          </div>
          <div v-show="actHost.ins">签约机构：
            <span class="bolder">{{actHost.ins}}</span>
          </div>
        </div>
        <div class="flex info">
          <div>地区：
            <span class="bolder">{{actHost.district}}</span>
          </div>
          <div>主播类型：
            <span class="bolder">{{actHost.type}}</span>
          </div>
          <div>等级：
            <span class="bolder">{{actHost.level}}</span>
          </div>
        </div>
        <div>
          <el-button :type="actHost.follow?'primary':'default'" @click="follow(actHost)">{{actHost.follow?'取消关注':'关注TA'}}</el-button>
          <el-button @click="showQRcode=true">合作咨询</el-button>
        </div>
      </div>
      <div class="follow flex-col-cen">
        <div>粉丝数
          <div class="num t-title">{{actHost.fansnum}}</div>
        </div>
        <div>最爱TA
          <div class="num t-title">{{actHost.favonum}}</div>
        </div>
      </div>
    </div>
    <div class="ability">
      <div>
        以下数据为近
        <el-dropdown trigger="click" placement="bottom-start" @command="command">
          <el-button size="small" type="primary">{{trustmenu}}</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="v in dropmenu" :key="v" :command="v">{{v}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        天数据
      </div>
      <div class="flex">
        <div class="item" v-for="v in ability" :key="v.label">
          <div>{{v.label}}</div>
          <div class="t-title" style="margin-right:0">
          <count-to
          :startVal="0"
          :duration="800"
          v-bind="getbind(v.name)"
          ></count-to>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showQRcode"
      width="360px"
      :show-close="false"
      :append-to-body="true"
      center
      custom-class="qrcode"
    >
      <img :src="imgs.coop" class="qr">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'brief',
  data () {
    return {
      ability: [
        { label: '场均观看PV', name: 'pvPerLive' },
        { label: '场均观看UV', name: 'uvPerLive' },
        { label: '场均点赞', name: 'praiseNumPerLive' },
        { label: '场均评论', name: 'commentNumPerLive' },
        { label: '开播场次', name: 'liveCnt' },
        { label: '场均销售额(估)', name: 'saleAmtPerLive' },
        { label: '场均销量(估)', name: 'saleQtyPerLive' },
        { label: '场均客单价(估)', name: 'perSalePricePerLive' }
      ],
      dropmenu: [
        7, 15, 30, 60, 90
      ],
      trustmenu: 30,
      showQRcode: false
    }
  },
  methods: {
    follow (v) {
      this.hostslist.events.follow.call(this, { row: v })
    },
    command (a) {
      const fn = this.myauth.hostDetail.change
      if (fn && fn.call(this)) return
      this.trustmenu = a
    },
    getbind (name) {
      if (this.actHost[`${name}${this.trustmenu}d`]) {
        const [num, unit] = this.actHost[`${name}${this.trustmenu}d`].toString().split(/\b(?=\D$)/)
        return {
          endVal: Number(num),
          decimals: num.includes('.') ? 2 : 0,
          suffix: unit
        }
      } else {
        return { endVal: 0 }
      }
    }
  }
}
</script>

<style scoped lang="less">
.brief{
  >div{
    flex:1;
    border-right:1px dashed #ddd;
  }
  .head{
    height:6rem;
    width:6rem;
    margin-right:1.5rem;
    border-radius:50%;
  }
  .attribute{
    flex:1;
    font-size:var(--xxsfont);
    text-align: left;
    >div{
      padding:.2rem 0;
    }
  }
  .follow{
    margin-top:2rem;
    width:7rem;
    text-align: left;
  }
  .ability{
    >div:first-child{
      font-size:var(--xs2font);
      color:#666;
      height:2rem;
      .el-button{
        padding: 0.2rem 0.5rem;
        font-weight:600;
      }
    }
    .flex{
      flex-wrap: wrap;
    }
    .item{
      width:25%;
    }
  }
}
.info>div{
  margin-right:5%;
}
.qr{
  width:300px;
  border-radius:6px;
}
.t-title{
  margin:0.2rem 0;
}
</style>
