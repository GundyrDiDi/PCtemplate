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
          <span class="payhistory">
            我的购买记录(
            <span>{{0}}</span>)
          </span>
        </div>
      </div>
      <div class="paylist flex">
        <div class="description">
          <div class="s-title">{{paylist.label}}</div>
          <template v-for="(v,i) in paylist.catalog">
            <div :key="v.label">
              <div class="coll-title" @click="collapsedetail(i)">
                <span class="pointer">{{v.label}}
                <i class="el-icon-arrow-down"></i>
                </span>
              </div>
              <div ref="detail">
                <div class="line" v-for="v in v.children" :key="v.label">{{v.label}}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="price flex">
          <div v-for="v in levels" :key="v.label">
            <div class="s-title">
              <div>{{v.label}}</div>
              <div class="pricenum">{{v.price}}</div>
              <el-button type="warning" class="buy" size="small">
                立即购买
              </el-button>
            </div>
            <template v-for="(v,i) in paylist.catalog">
            <div :key="v.label">
              <div class="coll-title"></div>
              <div :style="{height:heights[i]}">
                <div class="line" v-for="v in v.children" :key="v.label">{{v.label}}</div>
              </div>
            </div>
          </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      paylist: {
        name: '',
        label: '功能权限',
        catalog: [
          {
            name: '',
            label: '首页',
            children: [
              { name: '', label: '直播商品数/品牌数' },
              { name: '', label: '新增主播数/总主播数' },
              { name: '', label: '开播场次/开播主播数' },
              { name: '', label: '观看人数/ 观看次数' },
              { name: '', label: '自由选择时间段' },
              { name: '', label: '主播分级' },
              { name: '', label: '直播间分布' },
              { name: '', label: '直播间标题词云分布' },
              { name: '', label: '直播流量与销售分布' }
            ]
          },
          {
            name: '',
            label: '主播',
            children: [
              { name: '', label: '排序功能' },
              { name: '', label: '高级筛选' },
              { name: '', label: '销售数据(估)' }
            ]
          },
          {
            name: '',
            label: '主播详情',
            children: [
              { name: '', label: '切换时间维度' },
              { name: '', label: '合作咨询' },
              { name: '', label: '关注TA' },
              { name: '', label: '粉丝变化' },
              { name: '', label: '每日引导' },
              { name: '', label: '评论数趋势' },
              { name: '', label: '点赞数趋势' },
              { name: '', label: '直播记录' },
              { name: '', label: '商品分析' },
              { name: '', label: '粉丝画像' },
              {
                name: '',
                label: '直播销售数据(估)',
                sub: '销售商品、对应销售额、销售量、客单价'
              }
            ]
          },
          {
            name: '',
            label: '机构',
            children: [
              { name: '', label: '机构月榜' },
              { name: '', label: '筛选' },
              { name: '', label: '查看机构主播' },
              { name: '', label: '观看人数/观看次数' },
              { name: '', label: '查看商品明细' },
              { name: '', label: '查看销售额明细' },
              { name: '', label: '查看销量明细' }
            ]
          },
          {
            name: '',
            label: '直播商品',
            children: [
              { name: '', label: '查看' },
              { name: '', label: '查看销售数据(估)' },
              { name: '', label: '排序' },
              { name: '', label: '筛 选' },
              { name: '', label: '搜索' }
            ]
          },
          {
            name: '',
            label: '关注',
            children: [
              { name: '', label: '关注数' },
              { name: '', label: '开播提醒' }
            ]
          }
        ]
      },
      levels: [
        { label: '免费版', price: '免费使用' },
        { label: '标准版', price: '999/月', btn: '' },
        { label: '高级版', price: '1499/月', btn: '' }
      ],
      heights: []
    }
  },
  methods: {
    collapsedetail (i) {
      this.$refs.detail[i].style.height = '0px'
      this.$refs.detailvalue[i].style.height = '0px'
    }
  },
  mounted () {
    this.$refs.detail.forEach((v, i) => {
      const height = v.getBoundingClientRect().height
      this.heights[i] = height
      v.style.height = height + 'px'
      // this.$refs.detailvalue[i].style.height = height + 'px'
    })
    console.log(this.$refs.detailvalue)
  }
}
</script>

<style scoped lang="less">
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
  }
  .line{
    padding:1rem 0;
    background:var(--lbgcol)
  }
  .line:nth-child(even){
    background:#fff;
  }
  .s-title {
    height:5rem;
  }
  .coll-title {
    color: var(--prcol);
    padding: 0.2rem 0;
    line-height:2rem;
    height:2.4rem;
    &+div{
      overflow:hidden;
      transition:all .6s;
    }
  }
  .price{
    width:75%;
    >div{
      flex:1
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
