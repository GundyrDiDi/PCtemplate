<template>
<div class="flex">
  <el-autocomplete
    v-bind="$attrs"
    :fetch-suggestions="queryAsync"
    v-model.trim="keyword"
    @keyup.enter.native="search()"
    @select="search"
    style="flex:1"
  >
    <template slot-scope="{ item }">
        <slot :item="item"></slot>
    </template>
  </el-autocomplete>
  <slot name="suffix">
  </slot>
  <el-button :size="$attrs.size" type="primary" @click="search()">{{btntext||'搜索'}}</el-button>
</div>
</template>

<script>
export default {
  name: 'input-suggestion',
  props: ['request', 'itemName', 'btntext'],
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    queryAsync (str, resolve) {
      if (str) {
        this.request({ [this.itemName]: str }).then((res) => {
          resolve(res.data)
        })
      } else {
        resolve([])
      }
    },
    search (item) {
      this.keyword = item ? item[this.itemName] : this.keyword
      this.$emit('search', this.keyword)
    }
  }
}
</script>

<style scoped lang="less">
</style>
