<template>
  <div>
    <div class="app-container">
      <!-- 搜索 -->
      <div class="search">
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="订单编号" class="searchInput">
            <el-input v-model="searchInfo.order" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="工单状态">
            <el-select v-model="searchInfo.value1" placeholder="请选择">
              <el-option
                v-for="item in statesList.data"
                :key="item.statusId"
                :label="item.statusName"
                :value="item.statusId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="searchBtn" class="searchBtn" icon="el-icon-search">查询</el-button>
        </el-form>
      </div>
      <!-- 主题区域  -->
      <div class="results">
        <!-- 表格顶部 -->
        <el-row class="addBtn">
          <el-col :span="1">
            <el-button
              @click="dialogFormVisible = true"
              class="primary"
              type="primary"
              icon="el-icon-circle-plus-outline"
            >
              <slot>新建</slot>
            </el-button>
          </el-col>
          <el-col :span="1">
            <el-button class="secondery" @click="workOrderClickShowFn"><slot>工单配置</slot></el-button>
          </el-col>
        </el-row>
        <!-- 新增工单dialog-->
        <myAddOrder
          :detailsFromCheck="detailsFromCheck"
          :dialogFormVisible="dialogFormVisible"
          @addOrderShowClose="addOrderShowClose"
          :type="type"
        ></myAddOrder>
        <!-- 工单配置dialog -->
        <el-dialog title="提示" :visible.sync="workOrderShow" width="630px" custom-class="el-dialog1">
          <el-form>
            <el-form-item label="补给警戒线">
              <el-input-number
                v-model="supplyValue"
                controls-position="right"
                :min="0"
                :max="100"
                style="width: 85%"
                @change="setAlertValue(supplyValue)"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="quit" @click="workOrderShow = false">取 消</el-button>
            <el-button class="confirm" type="primary" @click="workOrderShow = false">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 表格 -->
        <myTables
          @getCheckDetils="getCheckDetils"
          :orderList="orderList"
          :currentPage="currentPage"
          :titleName="titleName"
        />
        <!-- 分页器 -->
        <myPagination
          :orderList="orderList"
          :currentPage="currentPage"
          :totalCount="totalCount"
          :totalPage="totalPage"
          @previousPage="previousPage"
          @nxetPage="nxetPage"
        />
      </div>
      <!-- 查看详情 -->
      <myCheck
        @changeVis="changeVis"
        @rebuildChangeAddOrderShow="rebuildChangeAddOrderShow"
        :DetailsFrom="DetailsFrom"
        :dialogVisible.sync="dialogVisible"
        :type="type"
      />
    </div>
  </div>
</template>
<script>
import { getOperationList, getOperationStatesList, getCheckDetails } from '@/api/table.js'
import { getAlertValue, setAlertValue } from '@/api/replenish'
import myTables from '@/views/components/myTables'
import myPagination from '@/views/components/myPagination'
import myButton from '@/views/components/myButton'
import myCheck from './myCheck'
import myAddOrder from './addOrder'
export default {
  name: 'business',
  props: {},
  data() {
    return {
      //查看详情的数据
      DetailsFrom: {},
      detailsFromCheck: {},
      orderList: [], //工单数据数组
      statesList: [], //状态数据

      // 表格头部信息
      titleName: [
        { property: 'taskCode', label: '工单编号' },
        { property: 'innerCode', label: '设备编号' },
        { property: 'taskType.typeName', label: '工单类型' },
        { property: 'createType', label: '工单方式' },
        { property: 'taskStatusTypeEntity.statusName', label: '工单状态' },
        { property: 'userName', label: '运营人员' },
        { property: 'createTime', label: '创建日期' },
        { property: 'userName', label: '运营人员' }
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      supplyValue: 1, //工单预警值
      searchInfo: {
        order: '',
        value1: ''
      },
      //总的页码
      totalCount: '',
      totalPage: '',
      dialogFormVisible: false, //新建对话框的状态管理
      dialogVisible: false, //详情显示隐藏属性
      workOrderShow: false, //工单配置对话框显示隐藏属性
      dialogListVisible: false, //补货清单显示隐藏属性
      // 获取工单条件
      taskCode: '',
      status: '',
      type: 2 //工单类型
    }
  },
  created() {
    this.getOperationList(), this.getOperationStatesList(), this.getCheckDetils()
  },
  methods: {
    async getOperationList() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: 10,
        isRepair: false,
        taskCode: this.taskCode,
        status: this.status
      }
      const { data } = await getOperationList(obj)
      const { totalCount, totalPage } = data
      this.totalCount = totalCount
      this.totalPage = totalPage
      this.orderList.push(...data.currentPageRecords)
    },
    async getOperationStatesList() {
      const res = await getOperationStatesList()
      this.statesList = res
    },
    // 上一页
    previousPage() {
      if (this.currentPage == 1) {
        return
      }
      this.currentPage--
    },
    // 下一页
    nxetPage() {
      this.currentPage++, this.getOperationList()
    },
    // 查询
    searchBtn() {
      ;(this.taskCode = this.searchInfo.order), (this.status = this.searchInfo.value1)
      this.orderList = []
      this.getOperationList()
    },
    // 查看详情
    async getCheckDetils(id) {
      try {
        const { data } = await getCheckDetails(id)
        this.DetailsFrom = data
        console.log(data)
        this.dialogVisible = true
      } catch (err) {
        console.log(err)
      }
    },
    // 详情关闭
    changeVis() {
      this.dialogVisible = false
    },
    addOrderShowClose() {
      this.dialogFormVisible = false
    },
    rebuildChangeAddOrderShow() {
      this.dialogFormVisible = true
      this.detailsFromCheck = this.DetailsFrom
    },
    handleChange() {},
    // 获取预警值
    async workOrderClickShowFn() {
      this.workOrderShow = true
      const { data } = await getAlertValue()
      this.supplyValue = data
    },
    // 设置预警值
    async setAlertValue(val) {
      const res = await setAlertValue(val)
      console.log(res)
    },
  },
  watch: {
    orderList() {
      this.orderList.map((item) => {
        if (item.createType == 0) {
          item.createType = '自动'
        } else {
          item.createType = '手动'
        }
      })
    }
  },
  components: {
    myTables,
    myPagination,
    myButton,
    myCheck,
    myAddOrder
  }
}
</script>
<style scoped lang="less">
.app-container {
  background-color: #f8fafd;
  width: 100%;
  height: 914px;
}
/deep/.search {
  width: 100%;
  height: 64px;
  background-color: rgb(255, 255, 255) !important;
  display: flex;
  margin-bottom: 20px;
  padding-left: 17px;
  .demo-form-inline {
    margin-top: 16px !important;
    font-weight: 400;
    /deep/.order {
      margin-left: 10px;
      height: 36px;
    }
  }
}
.searchBtn {
  min-width: 80px;
  height: 36px;
  padding: 0;
  color: #fff;
  text-align: center;
  background-color: #5f84ff;
  border: none;
  margin-top: 2px;
}
.results {
  width: 100%;
  height: 635px;
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .addBtn {
    .el-col {
      width: 80px;
    }
    .primary {
      text-align: center;
      width: 80px !important;
      height: 36px;
      padding: 0;
      border: none;
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    }
    .secondery {
      width: 80px !important;
      margin-left: 10px;
      height: 36px;
      padding: 0;
      background-color: #fbf4f0 !important;
      border: none;
      color: #655b56 !important;
    }
  }
}
.el-form--inline .el-form-item__label {
  font-weight: 400;
}
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
/deep/.el-dialog1 {
  border-radius: 10px !important;
}
.supplyValueBtn {
  width: 39px;
  height: 15px;
  text-align: center;
  border-radius: 0 4px 0 0;
  border-bottom: 1px solid #d8dde3;
  line-height: 17px;
}
</style>
