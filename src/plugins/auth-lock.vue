<template>
  <div class="pointer flex-center" @click="$router.push({name:'vip'})">
    <i class="el-icon-lock"></i>
    <span>高级版解锁</span>
  </div>
</template>

<script>
export default {
  name: 'my-lock',
  data () {
    return {}
  }
}
</script>

<style scoped>
i {
    color:var(--prcol);
    font-size:var(--mfont);
    margin-right:.3rem;
}
span{
    color:var(--dacol)
}
</style>
