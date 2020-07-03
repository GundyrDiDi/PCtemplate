<template>
  <div id="info" class="flex-col flex-ter">
    <div v-for="v in enterinfo" :key="v.title" class="info-part flex-center" :class="v.class">
      <div class="media">
        <div class="title">{{v.title}}</div>
        <div class="msg">{{v.msg}}</div>
      </div>
      <div class="display">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped lang="less">
  .info-part{
    height:100vh;
    width:60%;
    >div{
      text-align: center;
    }
    .title{
      font-size:2.5rem;
      font-weight: 600;
      letter-spacing: 3px;
    }
    .msg{
      font-size:var(--lfont);
      color:#ccc;
    }
  }
</style>
