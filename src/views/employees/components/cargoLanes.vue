<template>
  <el-dialog title="货道设置" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <div class="intelligent">
      <span class="cargolNum">货道行数：6</span>
      <span class="cargolNum">货道列数：6</span>
      <span class="cargolNum">货道容量：6</span>
      <el-button type="success" class="intelligentButton">智能排货</el-button>
    </div>
    <div>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          
        </el-carousel-item>
      </el-carousel>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 20px 40px;
}
.intelligent {
  display: flex;
  background-color: #f3f6fb;
  height: 56px;
  align-items: center;
  .cargolNum {
    padding: 20px;
  }
  .intelligentButton {
    margin-left: auto;
    margin-right: 30px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
