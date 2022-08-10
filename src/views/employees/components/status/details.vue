<template>
  <div>
    <el-dialog title="设备详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="sale">
        <span>销售量：{{ count.data }} 个</span>
        <span>销售额：{{ shop.data }}元</span>
        <span>补货次数：{{ number }} 次</span>
        <span>维修次数：{{ Maintenance }} 次</span>
      </div>
      <div>
        <p>商品销量(/月)</p>
        <div class="shopDetails" v-for="(item, index) in shopDetails" :key="index">
          <span>{{ item.skuName }} : {{ item.count }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      shopDetails: [],
      number: '',
      Maintenance: '',
      shop: '',
      count: ''
    }
  },
  computed: {},
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.sale {
  background-color: #f4f6fb;
  height: 54px;
  display: flex;
  align-items: center;
  span {
    flex: 1;
    margin-left: 20px;
  }
}
.shopDetails {
  display: inline-block;
  border: 1px solid #d8dde3;
  border-collapse: collapse;
  width: 161px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
