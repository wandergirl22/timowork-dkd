<template>
  <el-dialog title="新增工单" :visible="dialogFormVisible" custom-class="el-dialog1" :before-close="handleClose">
    <el-form :model="detailsFromCheck">
      <el-form-item label="设备编号:" :label-width="formLabelWidth">
        <el-input
          v-model="detailsFromCheck.innerCode"
          autocomplete="off"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型:" :label-width="formLabelWidth">
<<<<<<< HEAD
        <el-dropdown style="width: 500px">
          <el-input v-model="detailsFromCheck.orderStatus" autocomplete="off" placeholder="请选择"></el-input>
          <el-dropdown-menu slot="dropdown" style="width: 500px">
            <el-dropdown-item>补货工单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="补货数量:" :label-width="formLabelWidth">
        <div>
          <i class="el-icon-document"></i>
          <span>补货清单</span>
=======
        <!-- v-if="item.type === this.type" -->
        <el-select
          style="width: 500px"
          v-model="detailsFromCheck.orderStatus"
          placeholder="请选择"
          @change="handleChange(detailsFromCheck.taskId)"
        >
          <el-option
            slot="dropdown"
            v-for="item in typeList"
            :key="item.typeId"
            :value="item.typeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量:" :label-width="formLabelWidth" v-if="this.type === 2">
        <div>
          <el-button type="text" icon="el-icon-tickets" @click="showdialogList(detailsFromCheck.innerCode)">
            补货清单
            <el-dialog title="补货清单" :visible.sync="dialogListVisible" width="40%" :append-to-body="true">
              <el-table :data="replenishment" style="width: 100%" max-height="500">
                <el-table-column label="货道编号" prop="channelCode" width="100px"></el-table-column>
                <el-table-column label="商品名称" prop="sku.brandName" width="180px"></el-table-column>
                <el-table-column label="当前数量" prop="currentCapacity" width="100px"></el-table-column>
                <el-table-column label="还可添加" :formatter="formatter" width="100px"></el-table-column>
                <el-table-column align="right" label="补满数量" prop="maxCapacity">
                  <template slot-scope="scope">
                    <el-input-number v-model="maxCapacity" controls-position="right" :min="1" :max="10" />
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-button>
>>>>>>> feature/approvals
        </div>
      </el-form-item>
      <el-form-item label="运营人员:" :label-width="formLabelWidth">
        <el-dropdown style="width: 500px">
          <el-input v-model="detailsFromCheck.userName" autocomplete="off" placeholder="请选择"></el-input>
          <el-dropdown-menu slot="dropdown" style="width: 500px">
            <el-dropdown-item>无数据</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          style="width: 500px"
          v-model="addOrder.textarea"
<<<<<<< HEAD
=======
          maxlength="40"
>>>>>>> feature/approvals
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="quit" @click="$emit('addOrderShowClose')">取 消</el-button>
      <el-button class="confirm" type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
<<<<<<< HEAD
=======
import { getSellDetails } from '@/api/replenish'
>>>>>>> feature/approvals
export default {
  name: 'addOrder',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    detailsFromCheck: {
      type: [Object, Array],
      required: true
<<<<<<< HEAD
=======
    },
    dialogListVisible: {
      type: Boolean,
      required: false
    },
    type: {
      type: Number,
      required: true
>>>>>>> feature/approvals
    }
  },
  data() {
    return {
      addOrder: {
        innerCode: '',
        orderStatus: '',
        people: '',
        textarea: ''
      },
<<<<<<< HEAD
      formLabelWidth: '110px'
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit('addOrderShowClose')
=======
      formLabelWidth: '110px',
      typeList: [], //工单类型
      replenishment: [], //补货详情
      maxCapacity: 10
    }
  },
  created() {
    this.getOperationType()
  },
  methods: {
    handleClose() {
      this.$emit('addOrderShowClose')
    },
    // 工单类型
    handleChange() {},
    async getOperationType() {
      const { data } = await getSellDetails()
      this.typeList = data
      console.log(data)
    },
    // 获取补货详情
    async showdialogList(id) {
      this.dialogListVisible = true
      const { data } = await getSellDetails(id)
      this.replenishment = data
    },
    // 处理当前数量和补满数量的差值
    formatter(row, column) {
      return row.maxCapacity - row.currentCapacity
>>>>>>> feature/approvals
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less">
<<<<<<< HEAD
=======
.el-icon-tickets {
  color: #5f84ff;
}
>>>>>>> feature/approvals
.dialog-footer {
  margin-top: -40px;
  text-align: center;
}

.quit {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
}
.confirm {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
}
<<<<<<< HEAD
=======
/deep/.el-dialog {
  border-radius: 10px;
}
.el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  .el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
  }
  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
    font-size: 14px;
    word-break: break-all;
  }
}
>>>>>>> feature/approvals
</style>
