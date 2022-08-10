<template>
  <el-dialog
    v-if="!!Object.keys(this.cancelData).length"
    title="修改设备"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <p>机器编号：{{ cancelData.innerCode }}</p>
    <p>供货时间：{{ lastSupplyTime }}</p>
    <p>设备类型：{{ cancelData.type.name }}</p>
    <p>设备容量：{{ cancelData.type.channelMaxCapacity }}</p>
    设备点位：
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="arr in adressType" :key="arr.id" :label="arr.name" :value="arr.name"></el-option>
    </el-select>
    <p>合作商：{{ cancelData.ownerName }}</p>
    <p>所属区域：{{ cancelData.region.name }}</p>
    <p>设备地址：{{ cancelData.node.name }}</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="cancelDeviceAddress">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAdressApi, cancelDeveceAddressApi } from '@/api/device'
export default {
  data() {
    return {
      lastSupplyTime: '',
      adressType: [],
      cancelData: {}, //修改设备数据
      dialogVisible: false,

      value: ''
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false
    },
    // 修改确定
    async cancelDeviceAddress() {
      try {
        if (this.cancelData.vmStatus === 1) {
          this.dialogVisible = false

          return this.$message.error('该设备正在运营')
        }
        console.log(this.cancelData)
        console.log(this.value)
        const res = this.adressType.filter((item) => {
          return item.name === this.value
        })
        console.log(res)
        const res1 = await cancelDeveceAddressApi(this.cancelData.id, res[0].id)
        console.log(res1)
        this.$emit('updateDeviceList')
        this.dialogVisible = false
      } catch (error) {}
    },
    // 设备点位
    async getAddress() {
      const res = await getAdressApi({
        pageIndex: 1,
        pageSize: 100000
      })
      console.log(res)
      this.adressType = res.data.currentPageRecords
      console.log(this.adressType)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 0 60px;
}
p {
  height: 30px;
}
</style>
