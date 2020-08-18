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
      <div class="box flex-center">
        <img :src="imgs['hotlive'+item]" />
      </div>
    </div>
    <i class="el-icon-arrow-left" @click="roll(1)"></i>
    <i class="el-icon-arrow-right" @click="roll(-1)"></i>
  </div>
</template>

<script>
export default {
  name: 'carousel-cards',
  data () {
    return {
      classlist: ['prev', 'center', 'next']
    }
  },
  methods: {
    roll (val) {
      const len = this.classlist.length
      this.classlist = this.classlist
        .slice(val)
        .concat(this.classlist.slice(0, (len + val) % len))
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  background: #fff;
  border-radius: 1.2rem;
  padding: 0rem;
  img {
    height: 100%;
    width: 100%;
  }
}
.card i {
  color: rgba(0, 153, 255, 0.4);
  font-size: var(--xxxlfont);
  font-weight: bold;
  &:hover {
    color: rgb(0, 153, 255);
  }
}
</style>
<style scoped lang="less">
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
</style>
