<template>
  <div class="record">
    <date-pick class="flex-center" :time.sync="time"></date-pick>
    <table-paganation :condition="condition" v-bind="hostrecord"></table-paganation>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      time: []
    }
  },
  computed: {
    condition () {
      return { daterange: this.time }
    }
  },
  mounted () {
    this.time = [new Date(), new Date()]
  }
}
</script>

<style scoped lang="less">
  .flex-center{
    margin-bottom:1rem;
  }
</style>
