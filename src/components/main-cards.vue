<template>
  <div class="main-cards">
    <el-carousel height="100%" arrow="always" type="card" :interval="8000" indicator-position="none" @change="handlechange">
      <el-carousel-item v-for="(item,i) in 3" :key="item" ref="carousel" :class="classlist[i]">
        <div class="box flex-center">
          <img :src="imgs['hotlive'+item]" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'main-cards',
  data () {
    return {
      classlist: ['', 'next', 'prev']
    }
  },
  computed: {
    _liverlist () {
      return new Array(3).fill(this.liverlist).flat()
    }
  },
  methods: {
    handlechange (now, old) {
      const classlist = this.classlist.map((v, i) => {
        if (now - old === 1 || now - old === -2) {
          return i === now ? '' : i === old ? 'prev' : 'next'
        } else {
          return i === now ? '' : i === old ? 'next' : 'prev'
        }
      })
      setTimeout(e => {
        this.classlist = classlist
      }, 80)
    }
  }
}
</script>

<style scoped lang="less">
.main-cards {
  padding: 1rem 2rem;
  width: 100%;
  height: 34rem;
}
.box {
  height: 100%;
  background: #fff;
  border-radius: 1.2rem;
  padding: 0rem;
  img{
    height:100%;
    width:100%;
  }
}
.el-carousel {
  position: absolute;
  left: -10%;
  height: 32rem;
  width: 80%;
  overflow: visible;
}
</style>
<style lang="less">
.main-cards {
  .el-carousel__item {
    overflow: visible;
  }
  .prev {
    margin-left: 7rem;
  }
  .next {
    margin-left: -7rem;
  }
  .el-carousel__arrow{
    background:transparent;
    i{
      color:rgba(0, 153, 255, 0.4);
      font-size:var(--xxxlfont);
      font-weight: bold;
      &:hover{
        color:rgb(0, 153, 255);
      }
    }
  }
  .el-carousel__arrow--left{
    left:3rem;
  }
  .el-carousel__arrow--right{
    right:4rem;
  }
}
</style>
