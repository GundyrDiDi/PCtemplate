<template>
  <div id="entermain">
    <el-row>
      <el-col :span="12" class="flex-center">
        <img class="whale" :src="imgs.whale" alt="">
      </el-col>
      <el-col :span="12" class="flex-ter">
        <div>
          <div class="h-title">{{logoname}}</div>
          <div class="description">{{enterdescription}}</div>
          <div>
            <el-button type="light" @click="$router.push({name:'Login'})">注册账户</el-button>
            <a href="#" class="link bolder" @click="$router.push({name:'Login'})">已有帐户 ?</a>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tabs flex-center">
      <img class="bg" :src="imgs.circle" alt="">
        <div class="grid" v-observe:4="[countstart]">
            <div v-for="v in livedata" :key="v.name" v-observe.parent="animateClass" class="tab flex-center">
              <div class="s-title">{{v.name}}</div>
              <div>
                <count-to
                :startVal="0"
                :endVal="v.value"
                class="h-title"
                ref="count"
                :autoplay="false"
                :duration="5000"/>
                <span class="f-title">{{v.unit}}</span>
              </div>
              <router-link v-if="v.link" class="link" :to="v.link">查看更多</router-link>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { addNumberUnit } from '@/plugins/util'
export default {
  name: 'entermain',
  data () {
    return {
      animateClass: 'animated flipInX'
    }
  },
  methods: {
    countstart () {
      this.$refs.count.forEach(v => v.start())
    }
  },
  async mounted () {
    const keys = ['pv', 'liveCnt', 'goodsCnt', 'saleQty']
    const days = ['今', '昨', '前']
    await this.$store.dispatch('user/getnewdate')
    const date = await Axios.get('user/newdate')
    const prev = Math.floor((Date.now() - Date.parse(date)) / (1000 * 3600 * 24))
    Axios.get('charts/watch', {
      dateId: date.replace(/-/g, '')
    }).then(res => {
      console.log(res[0])
      keys.forEach((v, i) => {
        const [num, unit] = addNumberUnit(res[0][v], [
          { value: '万', wei: 4 }
        ], 3).split(/\b(?=\D$)/)
        this.livedata[i].name = this.livedata[i].name.replace(/([\d-]+)|(.{1})/, days[prev] ? days[prev] : date)
        this.livedata[i].value = isNaN(Number(num)) ? 0 : Number(num)
        this.livedata[i].unit = unit
      })
    })
  }
}
</script>

<style scoped lang="less">
  #entermain{
    height:200%;
  }
  .el-row{
    height:50%;
    .el-col{
      height:100%;
    }
  }
  @keyframes float {
    0%{
      transform: translateY(5px);
    }
    100%{
      transform: translateY(-5px);
    }
  }
  .whale{
    border-radius: 1.6rem;
    // box-shadow: 0 2px 2px rgba(0,0,0,.3);
    filter:drop-shadow(0 2px 2px rgba(0,0,0,.3));
    width:50%;
    margin-left:10%;
    animation: float 2s ease-in-out infinite alternate;
  }
  .description{
    font-size:var(--xmfont);
    color:#bbb;
    margin:.8rem 0 2.3rem 0;
  }
  .el-button{
    margin-right: 1.5rem;
  }
  @radio:80%;
  .tabs{
    height:50%;
    .bg{
      height:@radio;
      transform: scale(1);
    }
    .grid{
      height:@radio;
      width:1000px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      justify-content: space-between;
      align-content:space-between;
      grid-row-gap: 8%;
      grid-column-gap: 5%;
    }
    .tab{
      background:#fff;
      border-radius:1rem;
      box-shadow:var(--boxshadow);
      padding:1.5rem;
      position:relative;
    }
    .h-title{
      letter-spacing: 0;
      margin-right:1rem;
      font-weight: 600;
      color:#ff4b15;
    }
    .f-title{
      font-weight: 400;
      display:inline-block;
      transform:translateY(-.3rem)
    }
    .s-title{
      position:absolute;
      top:1.5rem;
      border-left:.5rem solid #42a1f2;
      left:1.5rem;
      padding-left:.6rem;
      padding-bottom:2px;
    }
    .link{
      position:absolute;
      bottom:1.5rem;
      right:2rem;
    }
  }
</style>
