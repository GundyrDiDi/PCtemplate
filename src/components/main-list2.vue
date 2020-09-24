<template>
  <div class="main-list">
    <div class="box flex-center">
      <el-carousel height="100%" arrow="never" :interval="10000">
        <el-carousel-item
        v-for="(item,m) in data"
        :key="m"
        >
          <el-table :data="item">
            <el-table-column
            v-for="(c,prop) in columns"
            :key="prop"
            :prop="prop"
            :label="c.label"
            :width='c.width'
            class-name="com-column bold"
            label-class-name="boldest"
            >
              <template slot-scope="scope">
                <img class="head" v-if="c.img" :src="scope.row.img" alt="">
                <img class="crown" v-if="c.img&&scope.$index<2" :src="imgs.crown" alt="">
                <el-tag v-if="c.slot&&scope.row[prop]" effect="dark" type="primary">{{scope.row[prop]}}</el-tag>
                <div v-else class="pri-text">{{scope.row[prop]}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
export default {
  name: 'main-list',
  data () {
    return {
      columns: {
        nick: { label: '直播信息', img: 'head', width: '240px' },
        fansnum: { label: '主播' },
        lovest: { label: '观看次数' },
        addFansNum: { label: '直播涨粉数' },
        zan: { label: '商品数' }
      },
      data: []
    }
  },
  computed: {
    _liverlist () {
      return new Array(3).fill(this.liverlist).flat()
    }
  },
  mounted () {
    axios.get('/api/liveRoom/findPopularLiveInfoByPage?openid=&page=0&size=10&sort=pv,desc').then(res => {
      this.data = res.data.obj.content.map(v => {
        return {
          img: v.liveImg,
          nick: v.liveTitle,
          fansnum: v.anchorName,
          lovest: formatNumber(addNumberUnit(v.pv)),
          addFansNum: formatNumber(addNumberUnit(v.addFansNum)),
          zan: formatNumber(addNumberUnit(v.goodsCnt))
        }
      })
      this.data = [this.data.slice(0, 5), this.data.slice(5)]
    })
  }
}
</script>

<style scoped lang="less">
.box {
  height: 24rem;
  width: 100%;
  border-radius: 1.2rem;
  padding: 2rem 1rem;
}
.el-carousel,
.el-carousel-item {
  height: 100%;
  width: 100%;
}
.el-tag{
  padding:0 1rem;
  height:1.4rem;
  line-height: calc(1.4rem - 2px);
  border-radius:1rem;
}
.head{
  height:1.6rem;
  width:1.6rem;
  margin-right:.5rem;
  border-radius:50%;
}
.crown{
  position:absolute;
  top:3px;
  left:3px;
  height:1rem;
  width:1rem;
  transform: rotate(-45deg);
}
.pri-text{
  white-space: nowrap;
}
</style>
<style lang="less">
.main-list{
  background:#fff;
  .el-carousel__indicator {
    padding: 12px 10px;
  }
  .el-carousel__button {
    background: #ccc;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
  .is-active .el-carousel__button {
    background: rgb(7, 148, 241);
  }
  .com-column {
    color: #000;
    white-space: nowrap;
  }
  .com-column>div{
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  thead th:nth-child(6)>div{
    transform: translateX(1rem);
  }
}
.boldest{
}
</style>
