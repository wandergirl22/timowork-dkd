<template>
  <el-dialog title="工单详情" :visible="dialogVisible" width="630px" custom-class="el-dialog1">
    <div class="top">
      <el-button @click="$emit('changeVis')" class="cancel" icon="el-icon-close"></el-button>
    </div>
    <div class="body">
      <div class="body-top">
        <img src="../../../assets/images/cancel.png" alt="" />
        <span>取消</span>
        <img src="../../../assets/images/cancel1.png" alt="" />
      </div>
      <el-form :model="DetailsFrom">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备编号:">
              <span>{{ DetailsFrom.innerCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期:">
              <span>{{ DetailsFrom.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消日期:">
              <span>{{ DetailsFrom.updateTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员:">
              <span>{{ DetailsFrom.userName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型:">
              <span>{{ DetailsFrom.taskType.typeName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.type === 2">
            <el-form-item label="补货数量:">
              <el-button type="text" class="button" @click="showdialogList(DetailsFrom.taskId)">
                补货详情
              </el-button>
              <el-dialog
                title="补货详情"
                :visible.sync="dialogListVisible"
                :append-to-body="true"
                margin-top="15vh"
                width="630px"
              >
                <el-table :data="replenishment" style="width: 100%" max-height="500">
                  <el-table-column label="货道编号" prop="channelCode"></el-table-column>
                  <el-table-column label="商品" prop="skuName"></el-table-column>
                  <el-table-column label="补货数量" prop="expectCapacity"></el-table-column>
                </el-table>
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式:">
              <span>{{ DetailsFrom.createType == 0 ? '自动' : '手动' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消原因:">
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="rebuild" @click="rebuildChangeAddOrderShow">重新创建</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getReplenishDetails } from '@/api/replenish'
export default {
  name: 'myCheck',
  props: {
    DetailsFrom: {
      type: [Array, Object],
      required: true
    },
    dialogVisible: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialogListVisible: false,
      replenishment: []
    }
  },
  created() {},
  methods: {
    rebuildChangeAddOrderShow() {
      this.$emit('rebuildChangeAddOrderShow')
      this.$emit('changeVis')
    },
    async showdialogList(id) {
      this.dialogListVisible = true
      const { data } = await getReplenishDetails(id)
      this.replenishment = data
    }
  }
}
</script>
<style scoped lang="less">
.button {
  color: #5f84ff;
}
.top {
  .cancel {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
  }
}
.body {
  .body-top {
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0, 0%, 92.5%, 0.39);
    span {
      flex: 1;
      margin-left: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.dialog-footer {
  padding-top: 0;
  text-align: center;
  .rebuild {
    width: 80px !important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0 !important;
    border: none;
    color: #655b56 !important;
  }
}
/deep/.el-dialog {
  border-radius: 10px;
}
.el-table {
  &:nth-child(1) {
    background: #f0f9eb !important;
  }
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
</style>
