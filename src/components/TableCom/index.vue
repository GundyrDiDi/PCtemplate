<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <el-table
      ref="tableCom"
      :stripe="isStripe"
      :data="tableData"
      :border="isBorder"
      :style="{ width: elTableWidth }"
      :span-method="mergeTable"
    >
      <template slot="empty">
        <slot name="empty">
          <span>暂无数据</span>
        </slot>
      </template>

      <el-table-column
        v-if="isTableIndex"
        :label="indexLabel"
        :align="align"
        :width="indexWidth"
      >
        <template slot-scope="scope">
          <span style="font-size: 14px;">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-for="item in tableColumns"
        :key="item.key"
        :label="item.name"
        :width="item.width"
        :align="item.align ? item.align : align"
        :show-overflow-tooltip="item.tip"
      >
        <template slot="header" v-if="item.isSlotheader">
          <div @click="handlerSlotheader(item)" class="tableheader">
            <i class="el-icon-d-caret"></i>
            <div class="grid-content">{{ item.name }}</div>
          </div>
        </template>

        <template slot-scope="scope">
          <slot :name="item.key" :scope="scope" :row="scope.row">
            <span
              style="color:#409EFF;cursor:pointer"
              @click="handlerTable(item.event, scope.row)"
              v-if="item.event"
              >{{ scope.row[item.key] }}</span
            >
            <span style="" v-else>{{ scope.row[item.key] }}</span>
          </slot>
        </template>
      </el-table-column>

      <slot name="operate">
        <el-table-column
          v-if="tableOperate.length !== 0"
          label="操作"
          :align="align"
          :width="operateWidth"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-permissions="item.role"
              v-for="item in tableOperate"
              :type="item.color"
              :key="item.type"
              :icon="item.icon ? item.icon : ''"
              :plain="item.plain"
              @click="handlerOperate(item, scope.row)"
              >{{ item.name }}
            </el-button>
          </template>
        </el-table-column>
      </slot>
    </el-table>

    <div class="pagination" v-if="isPagination">
      <el-pagination
        @size-change="handlerSizeChange"
        @current-change="handlerCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tableCom',
  props: {
    loading: {
      // 加载
      type: Boolean,
      default: false
    },
    align: {
      // 表格对齐
      type: String,
      default: 'center'
    },
    isBorder: {
      // 是否带有斑马纹
      type: Boolean,
      default: true
    },
    isStripe: {
      // 是否带有纵向边框
      type: Boolean,
      default: true
    },
    elTableWidth: {
      // 表格宽
      type: String,
      default: '100%'
    },
    operateWidth: {
      // 表格操作项宽
      type: Number,
      default: 100
    },
    tableColumns: {
      // 表格标题
      type: Array,
      required: true
    },
    tableData: {
      // 数据源
      type: Array,
      required: true
    },
    tableTotal: {
      // 总条数
      type: Number,
      default: 0
    },
    isPagination: {
      // 是否有分页
      type: Boolean,
      default: true
    },
    pagination: {
      // 分页器信息
      type: Object,
      default () {
        return {
          pageNum: 1,
          pageSizes: [10, 20, 30, 50, 100, 200],
          pageSize: 10
        }
      }
    },
    tableOperate: {
      // 操作项
      type: Array,
      default () {
        return []
      }
    },
    isTableIndex: {
      // 是否有序号
      type: Boolean,
      default: false
    },
    indexLabel: {
      type: String,
      default: '序号'
    },
    indexWidth: {
      // 序号宽度
      type: Number,
      default: 50
    },
    isMergeTable: {
      // 是否有合并
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlerSizeChange (val) {
      this.pagination.pageSize = val
      const { pageNum, pageSize } = this.pagination
      this.$emit('fetchData', { pageNum, pageSize })
    },
    handlerCurrentChange (val) {
      this.pagination.pageNum = val
      const { pageNum, pageSize } = this.pagination
      this.$emit('fetchData', { pageNum, pageSize })
    },
    // 重置当前页(用于搜索查询)
    resetCurrentChange (pagination) {
      this.pagination.pageNum = pagination.pageNum
      this.pagination.pageSize = pagination.pageSize
    },
    // 表头点击操作
    handlerSlotheader (event) {
      this.$emit('handlerSlotheader', event)
    },
    // table操作
    handlerTable (event, data) {
      this.$emit('handlerTable', event, data)
    },
    // 操作项
    handlerOperate (event, data) {
      this.$emit('handlerOperate', event, data)
    },
    // 合并的操作
    mergeTable ({ row, column, rowIndex, columnIndex }) {
      if (this.isMergeTable) {
        return this.$parent.mergeTable({ row, column, rowIndex, columnIndex })
      }
    }
  }
}
</script>
font-family: 'Arial Negreta', 'Arial Normal', 'Arial'; font-weight: 700;
font-style: normal; font-size: 20px;
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}

.tableheader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
}
</style>
