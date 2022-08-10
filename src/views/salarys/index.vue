<template>
  <div>
    <div class="app-container">
      <!-- 搜索 -->
      <div class="search">
        <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
          <el-form-item label="策略搜索" class="searchInput">
            <el-input v-model="searchInfo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-button @click.trim="searchBtn" class="searchBtn" icon="el-icon-search">查询</el-button>
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
        </el-row>
        <!-- 表格 -->
        <el-table :data="orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" width="100%">
          <el-table-column type="index" :index="hIndex" label="序号" width="100px"></el-table-column>
          <el-table-column property="policyName" label="策略名称" width="250px"></el-table-column>
          <el-table-column property="discount" label="策略方案" width="200px"></el-table-column>
          <el-table-column :formatter="formatterDate" label="创建日期" width="250px"></el-table-column>
          <el-table-column label="操作">
            <el-button @click="getpolicySearchApi(policyId)" type="text" size="small" :visible="dialogVisible">
              查看详情
            </el-button>
            <el-button @click="" type="text" size="small">修改</el-button>
            <el-button @click="" type="text" size="small" class="red">删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="block1" style="margin-top: 15px">
          <div class="total">
            <span>共{{ totalCount }}条记录，第{{ currentPage }}/{{ totalPage }}页</span>
          </div>
          <el-pagination
            v-show="false"
            align="center"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="orderList.length"
          ></el-pagination>
          <div class="page">
            <el-button @click="previousPage">上一页</el-button>
            <el-button @click="nxetPage">下一页</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPolicyListApi, getpolicySearchApi, searchPolicyApi } from '@/api/policy'
import myTables from '@/views/components/myTables'
import myPagination from '@/views/components/myPagination'
import myButton from '@/views/components/myButton'
export default {
  name: 'business',
  props: {},
  data() {
    return {
      orderList: [], //数据数组
      statesList: [], //状态数据
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      searchInfo: '',
      //总的页码
      totalCount: '',
      totalPage: '',
      dialogFormVisible: false, //新建对话框的状态管理
      policyName: ''
    }
  },
  created() {
    this.getPolicyListApi()
  },
  methods: {
    async getPolicyListApi() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: 10
      }
      const { data } = await getPolicyListApi(obj)
      const { totalCount, totalPage } = data
      this.totalCount = totalCount
      this.totalPage = totalPage
      this.orderList.push(...data.currentPageRecords)
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
    async searchBtn() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: 10,
        innerCode: this.searchInfo
      }
      const { data } = await searchPolicyApi(obj)
      this.orderList = data.currentPageRecords
    },
    // 查看详情
    async getpolicySearchApi(id) {
      try {
        const { data } = await getpolicySearchApi(id)
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
    // 处理日期
    formatterDate(row, column) {
      return row.createTime.split('T').join(' ')
    }
  },
  watch: {},
  components: {
    myTables,
    myPagination,
    myButton
  }
}
</script>
<style scoped lang="less">
.red {
  color: red;
}
.block1 {
  width: 99%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 32px 16px;
  .total {
    display: inline-block;
    font-size: 15px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    color: #dbdfe5 !important;
  }
}
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

.el-table {
  width: 100%;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 99%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
  text-align: left;
}
th {
  line-height: 1.15;
  padding: 10px 0px 9px;
  background: rgb(243, 246, 251);
  font-weight: 500;
}
td {
  height: 44px;
  padding: 2px 0px;
}
</style>
