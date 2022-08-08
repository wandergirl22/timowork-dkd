<template>
  <el-table
    ref="multipleTable"
    :data="deviceList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="60"></el-table-column>
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="innerCode" label="设备编号" width="160"></el-table-column>
    <el-table-column prop="type.name" label="设备型号" width="160"></el-table-column>
    <el-table-column
      prop="node.name"
      label="详细地址"
      width="160"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column prop="ownerName" label="合作商" width="160"></el-table-column>
    <el-table-column :formatter="Status" prop="vmStatus" label="设备状态" width="160"></el-table-column>
    <el-table-column prop="name" label="操作" width="160">
      <!-- <a style="color: blue" @click="$emit('cargoLanes')">货道</a>
      <a class="opera" @click="$emit('tactics', index)">策略</a>
      <a class="opera">修改</a> -->
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)">货道</el-button>
        <el-button type="danger" @click="$emit('tactics', scope.row)">策略</el-button>
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
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
    // 设备状态
    Status(row, column, cellValue) {
      if (cellValue === 0) return '未投放'
      if (cellValue === 1) return '运营'
      if (cellValue === 3) return '撤机'
    }
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
</style>
