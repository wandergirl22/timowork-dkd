<template>
  <el-dialog title="策略管理" :visible.sync="centerDialogVisible" width="50%">
    <div>
      <div class="caties-main">
        <span class="caties-main-left">机器编号： 01000005</span>
        <span>策略名称： 八折优惠</span>
      </div>
      <div class="caties-main">
        <span class="caties-main-left">策略方案： 80%</span>
        <span></span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false" center>取消策略</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: true
    }
  }
}
</script>

<style lang="less" scoped>
.caties-main {
  display: flex;
  padding: 0 50px;
  margin-bottom: 20px;
  .caties-main-left {
    flex: 1;
    justify-content: space-around;
  }
}
/deep/.el-dialog__footer {
  text-align: center;
}
</style>
