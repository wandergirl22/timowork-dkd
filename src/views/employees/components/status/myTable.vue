<template>
  <el-table
    ref="multipleTable"
    :data="deviceList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="innerCode" label="设备编号" width="160"></el-table-column>
    <el-table-column prop="type.name" label="设备型号" width="160"></el-table-column>
    <el-table-column prop="node.name" label="详细地址" width="160" show-overflow-tooltip></el-table-column>

    <el-table-column :formatter="Status" prop="vmStatus" label="运营状态" width="160"></el-table-column>
    <el-table-column prop="status" label="设备状态" width="160">
      <template slot-scope="scope">
        <span class="status">
          {{ scope.row.status[10001] ? '' : '离线' }}
        </span>
        <span class="status" style="margin-left: 7px; background-color: #48d698">
          {{ scope.row.status[10002] ? '货道' : '' }}
        </span>
        <span class="status" style="margin-left: 7px; background-color: #48d698">
          {{ scope.row.status[10002] ? '传动轴' : '' }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="操作" width="160">
      <template slot-scope="scope">
        <el-button style="color: blue" @click="$emit('EnquireDetails', scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    deviceList: {
      required: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 运营状态
    Status(row, column, cellValue) {
      if (cellValue === 0) return '未投放'
      if (cellValue === 1) return '运营'
      if (cellValue === 3) return '撤机'
    },

    // 
    // 设备
    // TicksStatus(row, column, cellValue) {
    //   console.log(cellValue[10002])
    //   if (!cellValue[10001])  '离线'
    //   if (cellValue[10002])  '货道'
    // }
  }
}
</script>

<style scoped>
.opera {
  margin-left: 8px;
  color: blue;
}
.el-button {
  border: 0 solid #000;
  padding: 0;
}
.status {
  background-color: red;
  color: #fff;
  padding: 3px;
  border-radius: 10px;
}
</style>
