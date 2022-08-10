<template>
  <el-dialog title="策略管理" :visible.sync="centerDialogVisible" width="50%">
    <div v-show="tt ? true : false">
      <div class="caties-main">
        <span class="caties-main-left">机器编号： {{ tt.innerCode }}</span>
        <span>策略名称： {{ tt.policyName }}</span>
      </div>
      <div class="caties-main">
        <span class="caties-main-left">策略方案： {{ tt.discount }}%</span>
        <span></span>
      </div>
    </div>
    <div v-show="tt ? false : true">
      选择策略：
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="(item, index) in options" :key="index" :value="item.policyName"></el-option>
      </el-select>
    </div>
    <span v-show="tt ? true : false" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel" center>取消策略</el-button>
    </span>
    <span v-show="tt ? false : true" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false" center>取消</el-button>
      <el-button type="primary" @click="addPolicy" center>确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cancelPolicy, getPolicyListApi, addPolicyApi } from '@/api/device'
export default {
  mame: 'caties',
  data() {
    return {
      rowData: {},
      tt: '',
      centerDialogVisible: false,
      options: [],
      value: ''
    }
  },
  created() {},
  methods: {
    async cancel() {
      await cancelPolicy(this.tt.innerCode, this.tt.policyId)
      this.centerDialogVisible = false

      console.log(11)
    },
    // 策略列表
    async getPolicyList(data) {
      console.log('策略列表')
      const res = await getPolicyListApi(data)
      console.log(res.data)
      this.options = res.data
    },
    // 新增策略
    async addPolicy() {
      try {
        console.log(this.value)
        const preh = await this.options.filter((item) => {
          return item.policyName === this.value
        })
        console.log(preh)
        // 策略
        console.log(this.rowData)
        const res = await addPolicyApi({
          innerCodeList: [this.rowData.innerCode],
          policyId: preh[0].policyId
        })
        this.centerDialogVisible = false
        console.log(res)
      } catch (error) {}
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
