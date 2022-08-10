<template>
  <div>
    <el-button class="color" type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addShopVmType">
      新建
    </el-button>
    <el-button class="GD" type="primary" @click="batch" size="small">批量操作</el-button>
    <el-dialog title="新增设备" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 新增设备 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备编号：">系统自动生成</el-form-item>
        <el-form-item label="选择型号：" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option
              v-for="item in catiesType"
              :key="item.typeId"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位：" prop="region">
          <el-select v-model="ruleForm.region2" placeholder="请选择">
            <el-option v-for="arr in adressType" :key="arr.id" :label="arr.name" :value="arr.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 批量管理 -->
    <el-dialog title="批量策略管理" :visible.sync="centerDialogVisible" width="50%" center>
      选择策略：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.policyId"
          :label="item.policyName"
          :value="item.policyName"
        ></el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleBatch">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShopVmTypeApi, getAdressApi, addDeviceApi, getPolicyListApi, addPolicyApi } from '@/api/device'
export default {
  data() {
    return {
      batchDevice: [], //批量设备管理
      options: [],
      value: '',
      centerDialogVisible: false,
      dialogVisible: false,
      catiesType: [], //设备类型
      adressType: [], // 设备地址
      ruleForm: {
        region: '',
        region2: '',
        status: 0
      },
      rules: {
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 新增策略
    async centerDialogVisibleBatch() {
      try {
        if (this.value.trim() === '') {
          return this.$message.error('策略不存在')
        }
        const arr = this.batchDevice.map((item) => {
          return item.innerCode
        })
        const str = this.options.filter((item) => {
          return item.policyName === this.value
        })
        console.log(arr)
        console.log(str)
        const res = await addPolicyApi({
          innerCodeList: arr,
          policyId: str[0].policyId
        })
        console.log(res)
        this.$emit('updateBatch')
        this.centerDialogVisible = false
      } catch (error) {}
    },
    // 批量操作
    async batch() {
      try {
        this.$emit('batch')
        // 获取策略列表
        if (this.batchDevice.length === 0) {
          return this.$message.error('请勾选售货机')
        }
        const res = await getPolicyListApi()
        console.log(res)
        this.options = res.data
        console.log(this.batchDevice)
        console.log(this.value)
        this.centerDialogVisible = true
      } catch (error) {}
    },
    cancel() {
      this.dialogVisible = false
    },
    async addShopVmType() {
      try {
        this.dialogVisible = true
        // 获取设备型号
        const { data } = await getShopVmTypeApi({
          pageIndex: 1,
          pageSize: 100000
        })
        this.catiesType = data.currentPageRecords
        // 获取设备点位
        const res = await getAdressApi({
          pageIndex: 1,
          pageSize: 100000
        })
        console.log(res)
        this.adressType = res.data.currentPageRecords
      } catch (error) {}
    },
    async submitForm() {
      this.$refs.ruleForm.validate()
      try {
        console.log(this.ruleForm.region)
        console.log(this.ruleForm.region2)
        console.log(this.catiesType)
        const res = this.catiesType.filter((item) => {
          return item.name === this.ruleForm.region
        })
        const res2 = this.adressType.filter((item) => {
          return item.name === this.ruleForm.region2
        })
        console.log(res)
        console.log(res2)
        // 新增售货机
        const VmShop = await addDeviceApi({
          vmType: res[0].typeId,
          nodeId: res2[0].id,
          createUserId: '1'
        })
        this.$emit('updateDeviceType')
        this.dialogVisible = false
      } catch (error) {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.color {
  background-color: #ff702b;
  border: none;
  margin-bottom: 20px;
  width: 80px;
  height: 36px;
}
.GD {
  background-color: #f8f4f0;
  border: unset;
  color: black;
  width: 80px;
  height: 36px;
}
/deep/.el-dialog__header {
  text-align: left;
}
</style>
