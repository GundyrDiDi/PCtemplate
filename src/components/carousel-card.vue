<template>
  <div class="card">
    <!-- <div
      class="item"
      v-for="(item,i) in 3"
      :key="item"
      :class="classlist[i]"
      :style="{background:colors[i]}"
    ></div>-->
    <div class="item" v-for="(item,i) in 3" :key="item" :class="classlist[i]">
      <div class="box2 flex-center">
          <el-table :data="data">
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
                <div v-else>{{scope.row[prop]}}</div>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
    <i class="gogo el-icon-arrow-left" @click="roll(1)"></i>
    <i class="gogo el-icon-arrow-right" @click="roll(-1)"></i>
  </div>
</template>

<script>
import axios from 'axios'
import { formatNumber, addNumberUnit } from '@/plugins/util.js'
export default {
  name: 'carousel-cards',
  data () {
    return {
      classlist: ['prev', 'center', 'next'],
      columns: {
        nick: { label: '直播信息', img: 'head', width: '160px' },
        fansnum: { label: '主播' },
        lovest: { label: '观看次数' },
        zan: { label: '商品数' }
      },
      data: []
    }
  },
  methods: {
    roll (val) {
      const len = this.classlist.length
      this.classlist = this.classlist
        .slice(val)
        .concat(this.classlist.slice(0, (len + val) % len))
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
          zan: formatNumber(addNumberUnit(v.goodsCnt))
        }
      })
    })
  }
}
</script>
<style lang="less" scoped>
.box2 {
  height: 100%;
  background: #fff;
  border-radius: 1.2rem;
  padding: 0rem;
  box-shadow: var(--boxshadow);
  // img {
  //   height: 100%;
  //   width: 100%;
  // }
  >div{
    padding:2rem;
  }
}
.card .gogo {
  color: rgba(0, 153, 255, 0.4);
  font-size: var(--xxxlfont);
  font-weight: bold;
  &:hover {
    color: rgb(0, 153, 255);
  }
}
</style>
<style lang="less" scoped>
.card {
  height: 34rem;
  width: 60%;
  left: -5%;
  position: relative;
  margin: auto;
}
.item {
  transition: all ease-in-out 0.3s;
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  // overflow:hidden;
}
.center {
  z-index: 2;
}
.prev {
  transform: translateX(-40%) scale(0.8);
  z-index: 0;
}
.next {
  transform: translateX(40%) scale(0.8);
  z-index: 1;
}
i {
  position: absolute;
  top: 40%;
  z-index: 4;
  cursor: pointer;
  &:first-of-type {
    left: -44%;
  }
  &:last-of-type {
    right: -44%;
  }
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
</style>
<style lang="less">
.card{
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
}
</style>
