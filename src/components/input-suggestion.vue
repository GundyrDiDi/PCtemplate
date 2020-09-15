<template>
<div class="flex input-suggestion">
  <el-autocomplete
    v-bind="$attrs"
    clearable
    :debounce="300"
    :fetch-suggestions="queryAsync"
    :trigger-on-focus="false"
    v-model.trim="keyword"
    @clear="handleclear"
    @keyup.enter.native="search()"
    @select="search"
    style="flex:1"
    ref="b"
  >
    <template slot-scope="{ item }">
        <slot :item="item"></slot>
    </template>
  </el-autocomplete>
  <slot name="suffix">
  </slot>
  <el-button v-if="!nobtn" :size="$attrs.size" type="primary" @click="search()">{{btntext||'搜索'}}</el-button>
  <el-input ref="a" class="a"></el-input>
</div>
</template>

<script>
export default {
  name: 'input-suggestion',
  props: ['request', 'itemName', 'btntext', 'nobtn'],
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    handleclear () {
      this.$refs.a.focus()
      this.$refs.b.focus()
    },
    queryAsync (str, resolve) {
      this.request({ [this.itemName]: str }).then((res) => {
        resolve(res.data)
      })
    },
    search (item) {
      this.keyword = item ? item[this.itemName] : this.keyword
      this.$emit('search', this.keyword)
    },
    clear () {
      this.keyword = ''
    }
  }
}
</script>

<style lang="less" scoped>
.a{
  position:absolute;height:0;width:0;z-index:-1
}
</style>
<style lang="less">
.input-suggestion .el-autocomplete {
      margin-right:1rem;
}
.suggestions{
  font-size:var(--xxsfont);
  line-height:1rem;
  // justify-content: space-around;
  padding:0.2rem 0;
  >div{
    width:120px;
  }
  img{
    height:2rem;
    width:2rem;
    margin:2px 5px;
    border-radius:50%;
    margin-right:.5rem;
  }
  .suggestions-title{
    width:calc(100% - 2rem);
    white-space: normal;
  }
}
</style>
