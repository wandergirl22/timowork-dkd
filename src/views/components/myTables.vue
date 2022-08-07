<template>
  <el-table
    :row-style="{ height: '50px' }"
    :cell-style="{ padding: '0px' }"
    :data="orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
  >
    <el-table-column label="序号" type="index" :index="hIndex" width="70"></el-table-column>
    <el-table-column
      v-for="(item, index) in titleName"
      :key="index"
      :property="item.property"
      :label="item.label"
      width="160"
    ></el-table-column>
     
    <el-table-column label="操作" width="70">
       <template slot-scope="scope">
      <el-button  @click="handleClick(scope.row)"  type="text" size="small">查看详情</el-button>
       </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'myTables',
  props: {
    orderList: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    titleName: {
      type: [Object, Number, Array],
      required: true
    }
  },
  data() {
    return {
      pageSize: 10 // 每页的数据条数
    }
  },
  created() {},
  methods: {
    hIndex(index) {
      return index + 1
    },
    handleClick(row) {
      console.log(1);
      this.$emit('getCheckDetils',row.taskId)
      }
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less"></style>
