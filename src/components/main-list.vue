<template>
  <div class="main-list">
    <div class="box flex-center">
      <el-carousel height="100%" arrow="never" :interval="5000">
        <el-carousel-item
        v-for="item in 5"
        :key="item"
        >
          <el-table :data="_liverlist">
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
                <img class="head" v-if="c.img" :src="imgs[c.img]" alt="">
                <img class="crown" v-if="c.img&&scope.$index<2" :src="imgs.crown" alt="">
                <el-tag v-if="c.slot" effect="dark" type="primary">{{scope.row[prop]}}</el-tag>
                <div v-else>{{scope.row[prop]}}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-list',
  data () {
    return {
      columns: {
        nick: { label: '主播昵称', img: 'head', width: '160px' },
        fansnum: { label: '粉丝数' },
        lovest: { label: '最爱TA' },
        zan: { label: '点赞数' },
        dist: { label: '所属地区' },
        label: { label: '标签', slot: true }
      }
    }
  },
  computed: {
    _liverlist () {
      return new Array(3).fill(this.liverlist).flat()
    }
  }
}
</script>

<style scoped lang="less">
.box {
  height: 26rem;
  width: 100%;
  border-radius: 1.2rem;
  padding: 2rem;
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
.main-list{
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
  }
  .com-column>div{
    display: flex;
    align-items: center;
  }
  thead th:nth-child(6)>div{
    transform: translateX(1rem);
  }
}
</style>
