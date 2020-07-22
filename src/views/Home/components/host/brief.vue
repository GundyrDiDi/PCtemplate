<template>
  <div class="brief flex">
    <div class="flex-ter">
      <img class="head" :src="imgs.head" alt="">
      <div class="attribute">
        <div class="s-title">{{actHost.name}}</div>
        <div class="flex info">
          <div>擅长领域：
            <span class="bolder">{{actHost.goodat}}</span>
          </div>
          <div>签约机构：
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
          <el-button @click="follow">关注TA</el-button>
          <el-button @click="coperate">合作咨询</el-button>
        </div>
      </div>
      <div class="follow flex-col-cen">
        <div>粉丝数
          <div class="num s-title">{{actHost.fansnum}}</div>
        </div>
        <div>最爱TA
          <div class="num s-title">{{actHost.favonum}}</div>
        </div>
      </div>
    </div>
    <div class="ability">
      <div>
        以下数据为近
        <el-dropdown trigger="click" placement="bottom-start">
          <el-button size="small" type="primary">30</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>7</el-dropdown-item>
            <el-dropdown-item>30</el-dropdown-item>
            <el-dropdown-item>90</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        天数据
      </div>
      <div class="flex">
        <div class="item" v-for="v in ability" :key="v.label">
          <div>{{v.label}}</div>
          <count-to class="s-title"
          :startVal="0"
          :duration="800"
          :endVal="Number(v.value)"></count-to>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'brief',
  data () {
    return {
      ability: [
        { label: '场均观看PV', value: '28' },
        { label: '场均观看UV', value: '28' },
        { label: '场均点赞', value: '28' },
        { label: '场均评论', value: '28' },
        { label: '开播场次', value: '28' },
        { label: '场均销售额', value: '28' },
        { label: '场均销量', value: '28' },
        { label: '场均客单价(估)', value: '28' }
      ]
    }
  },
  methods: {
    coperate () {},
    follow () {}
  },
  mounted () {}
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
    width:7rem;
    text-align: left;
    >div{
      margin:.4rem 0;
    }
  }
  .ability{
    >div:first-child{
      font-size:var(--xs2font);
      color:#666;
      padding-bottom:1rem;
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
</style>
