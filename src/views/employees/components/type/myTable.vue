<template>
  <el-table
    ref="multipleTable"
    :data="deviceList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="index" label="序号" width="100"></el-table-column>
    <el-table-column prop="name" label="型号名称" width="160"></el-table-column>
    <el-table-column prop="model" label="型号编码" width="160"></el-table-column>
    <el-table-column prop="image" label="设备图片" width="160" show-overflow-tooltip>
      <template slot-scope="scope">
        <!-- <img :src="scoped.row.image" alt="" /> -->
        <span>
          <!-- {{ scope.row.image }} -->
          <img class="pic" :src="scope.row.image" alt="" />
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="vmRow" label="货道行" width="160"></el-table-column>
    <el-table-column prop="vmCol" label="货道列" width="160"></el-table-column>
    <el-table-column prop="channelMaxCapacity" label="设备容量" width="160"></el-table-column>
    <el-table-column prop="name" label="操作" width="160">
      <!-- <a style="color: blue" @click="$emit('cargoLanes')">货道</a>
      <a class="opera" @click="$emit('tactics', index)">策略</a>
      <a class="opera">修改</a> -->
      <template slot-scope="scope">
        <el-button style="color: blue" @click="$emit('showButton', scope.row)">修改</el-button>
        <el-button style="color: red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    // handleEdit(index, row) {
    //   console.log(index, row)
    // },
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
.pic {
  width: 24px;
  border-radius: 50%;
}
</style>
