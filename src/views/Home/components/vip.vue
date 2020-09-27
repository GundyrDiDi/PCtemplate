<template>
  <div id="vip">
    <div class="module-box">
      <div class="t-title">
        <div>
          恭喜您，已成为
          <strong>{{User.club}}</strong>
        </div>
        <div>如需更加丰富的功能，请购买更高版本</div>
        <div>
          <span class="payhistory" @click="showrecord">
            我的购买记录
            (<span>{{record}}</span>)
          </span>
        </div>
      </div>
      <div class="paylist flex" ref="paylist">
        <div class="description">
          <div class="s-title" :style="top">功能权限</div>
          <template v-for="(v,i) in auths">
            <div :key="v.label">
              <div class="coll-title" @click="collapsedetail(v)">
                <span class="pointer">{{v.label}}
                <i class="el-icon-arrow-down" :style="{transform:`rotate(${v.collapse?-90:0}deg)`}"></i>
                </span>
              </div>
              <div ref="detail" :style="{height:v.collapse?'0px':heights[i]+'px'}">
                <div class="line" v-for="v in v.children" :key="v.label">
                  {{v.label}}
                  <div class="des">{{v.des}}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="price flex">
          <div v-for="(v,l) in levels" :key="v.label" class="level">
            <div class="s-title" :style="top">
              <div>
                <img class="dimand" :src="imgs[v.icon]" alt="">
                {{v.label}}
              </div>
              <div class="pricenum" v-html="l>0?`<b style='color:var(--prcol)'>${v.price}</b> 元/天`:v.price">
              </div>
              <el-button @click="buy(v)" v-if="v.btn" type="warning" class="buy" size="small">
                立即购买
              </el-button>
            </div>
            <template v-for="(v,i) in auths">
            <div :key="v.label">
              <div class="coll-title"></div>
              <div :style="{height:v.collapse?'0px':heights[i]+'px'}">
                <div class="line" v-for="v in v.children" :key="v.label" v-html="format(v.level[l+1].text)"></div>
              </div>
            </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="showpay" width="600px" footer-hide class="flex-center">
      <Pay :version="version" :levels="levels.slice(1)"></Pay>
    </Modal>
    <modal-table></modal-table>
    <modal-form></modal-form>
  </div>
</template>

<script>
import Pay from './vip/pay'
export default {
  name: '',
  components: {
    Pay
  },
  data () {
    return {
      levels: [
        { label: '免费版', level: 1, price: '免费使用', icon: 'dimandgray' },
        { label: '标准版', level: 2, price: '999/月', btn: true, icon: 'dimandblue' },
        { label: '高级版', level: 3, price: '1499/月', btn: true, icon: 'dimandyellow' }
      ],
      heights: [],
      y: '',
      showpay: false,
      version: {},
      record: 0
    }
  },
  computed: {
    top () {
      return {
        transform: `translateY(${this.y}px)`,
        boxShadow: this.y > 0 ? '0 1px 2px rgba(0,0,0,.1)' : 'none'
      }
    }
  },
  methods: {
    buy (v) {
      if (this.User.isWhite) {
        return this.msgFail('您当前属于白名单用户，无需购买会员！')
      }
      if (v.level < this.User.level) {
        return this.msgFail('您当前的会员等级高于购买版本！')
      }
      this.version = { ...v }
      this.showpay = true
    },
    showrecord () {
      this.tables_setcelldata({
        row: {},
        column: { key: 'record' },
        name: 'vip'
      })
    },
    collapsedetail (v) {
      v.collapse = !v.collapse
    },
    format (text) {
      if (typeof text === 'boolean') {
        return `<img style="height:14px" src="${this.imgs.check}">`
      } else {
        return text
      }
    }
  },
  mounted () {
    this.$refs.detail.forEach((v, i) => {
      const height = v.getBoundingClientRect().height
      this.heights[i] = height
      this.$forceUpdate()
    })
    const offsetTop = this.$refs.paylist.offsetTop + this.$el.offsetTop
    this.$el.parentNode.addEventListener('scroll', (e) => {
      this.y = Math.max(0, e.target.scrollTop - offsetTop)
    })
    Axios.get('user/payrecord').then(res => {
      console.log(res)
      this.record = res.totalElements
    })
    this.levels.forEach(v => {
      if (v.level > 1) {
        Axios.post('vip/price', {
          timeLength: 1,
          vipLevel: v.level
        }).then(res => {
          console.log(res)
          this.$set(v, 'price', res.money)
        })
      }
    })
  }
}
</script>

<style>
.flex-center .ivu-modal-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-center .ivu-modal{
  top: 0;
  /* transform: translateY(-50%); */
}
</style>
<style scoped lang="less">
#vip{
  position:relative;
  z-index:0;
}
.t-title {
  strong {
    color: var(--prcol);
  }
  > div {
    padding: 0.3rem 0;
  }
}
.payhistory {
  font-size: var(--xs2font);
  color: var(--wacol);
  cursor: pointer;
  &:hover {
    color: var(--swacol);
  }
}
.paylist {
  margin-top: 1rem;
  border-bottom:1px solid #ddd;
  margin-bottom:2rem;
  > .description {
    width: 25%;
    font-size: var(--xsfont);
    .des{
      font-size:var(--xxsfont);
      color:#aaa;
    }
  }
  .line{
    padding:1rem 0;
    background:var(--lbgcol)
  }
  .line:nth-child(even){
    background:#fff;
  }
  .s-title {
    height:6rem;
    padding-top:.8rem;
    background:#fff;
    position:relative;
    z-index:1;
  }
  .coll-title {
    // border-bottom:1px solid #ddd;
    color: var(--prcol);
    padding: 0.2rem 0;
    line-height:2rem;
    height:2.4rem;
    &+div{
      overflow:hidden;
      transition:all .3s ease-in-out;
    }
    i{
      transition:all .3s ease-in-out;
    }
  }
  .price{
    width:75%;
    font-size: var(--xsfont);
    >div{
      flex:1;
      position: relative;
    }
    .level{
      transition:transform .3s;
      overflow: hidden;
    }
    .level:hover{
      z-index:2;
      // transform: scale(1.001);
      box-shadow:0 1px 3px 1px rgba(0,0,0,.1)
    }
    .dimand{
      height:1.2rem;
      position:absolute;
      top:1.4rem;
      left:4.6rem;
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
    }
    .buy{
      transform:translateY(-.2rem);
      border:none;
      border-radius:2rem;
      padding:.3rem 1rem;
    }
    .pricenum{
      font-size:var(--sfont);
      padding:0;
    }
  }
}
</style>
