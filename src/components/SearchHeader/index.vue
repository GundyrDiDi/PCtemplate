<template>
  <el-form :inline="true" size="small">
    <header class="search-header">
      <div v-for="item in search.form" :key="item.key">
        <slot :name="item.key">
          <el-form-item :label="item.label" v-if="item.type === 'text'">
            <el-input
              v-model.trim="queryForm[item.key]"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item v-else-if="item.type === 'select'">
            <el-select
              v-model.trim="queryForm[item.key]"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </slot>
      </div>
      <el-form-item>
        <el-button
          v-for="item in search.operates"
          :type="item.color"
          :key="item.type"
          :icon="item.icon ? item.icon : ''"
          :loading="item.type === 'search' ? search.loading : false"
          @click="searchOperate(item)"
        >
          <span v-if="item.type === 'search'">{{
            search.loading ? "查询中..." : item.name
          }}</span>
          <span v-else>{{ item.name }}</span>
        </el-button>
        <el-button
          type="info"
          icon="el-icon-remove-outline"
          @click="queryResetForm"
        >
          重置
        </el-button>
      </el-form-item>
    </header>
  </el-form>
</template>
<script>
export default {
  props: {
    search: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      queryForm: {}
    }
  },
  methods: {
    // 重置
    queryResetForm () {
      if (this.queryForm) {
        for (const key in this.queryForm) {
          this.queryForm[key] = ''
        }
      }
      this.$emit('queryList', this.queryForm)
    },
    // 操作
    searchOperate (types) {
      this.$emit('searchOperate', types, this.queryForm)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-header {
  display: flex;
}
</style>
