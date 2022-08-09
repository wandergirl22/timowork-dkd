<template>
  <div>
    <el-card>
      <zzl-Input
        title="合作商搜索："
        v-model="value"
        placeholder="请输入"
        @keyup.delete.native="keyUpDel"
      ></zzl-Input>

      <zzl-Button
        title="查询"
        icon="el-icon-search"
        backgroundColor="#5f84ff"
        @click="search"
        style="margin-left: 15px"
      ></zzl-Button>
    </el-card>
    <el-card>
      <zzl-Button
        title="新建"
        icon="el-icon-circle-plus-outline"
        backgroundColor="#ff712c"
        @click="ShowAddPartner"
        style="margin-bottom: 15px"
      ></zzl-Button>
      <!-- table表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243, 246, 251)', color: 'rgb(102, 102, 102)' }"
      >
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + 10 * (tableInfo.pageIndex - 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合作商名称" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备数量" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.vmCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分成比例" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ratio }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" style="color: #5f84ff" @click="ResetPwd(scope.row)">重置密码</el-button>
            <el-button size="mini" style="color: #5f84ff" @click="checkInfo(scope.row)">查看详情</el-button>
            <el-button size="mini" style="color: #5f84ff" @click="ShowEditPartner(scope.row)">修改</el-button>
            <el-button size="mini" style="color: red" plain @click="deletePartner">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableInfo.pageIndex"
        :page-sizes="[10]"
        :page-size="tableInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableInfo.totalCount"
      ></el-pagination>
    </el-card>
    <!-- 查看详情弹层 -->
    <PartnerDialog :PartnerdialogVisible="PartnerdialogVisible" :PartnerInfo="PartnerInfo"></PartnerDialog>
    <!-- 修改和添加弹层 -->
    <AddUpdateDialog
      ref="changePartner"
      :PartnerdialogAddUpdate="PartnerdialogAddUpdate"
      :rowId="rowId"
    ></AddUpdateDialog>
  </div>
</template>
<script>
import { partnerInfoApi, partnerResetPwdApi } from '@/api/region'
import PartnerDialog from './components/partnerDialog.vue'
import AddUpdateDialog from './components/AddUpdateDialog.vue'

export default {
  props: {
    arr: {
      type: Array,
      default: () => []
    },
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: { PartnerDialog, AddUpdateDialog },
  data() {
    return {
      tableData: [],
      tableInfo: {
        pageIndex: 1,
        totalCount: 0,
        pageSize: 10,
        totalPage: 0
      },
      value: '',
      PartnerdialogVisible: false,
      PartnerdialogAddUpdate: false,
      PartnerInfo: {},
      rowId: ''
    }
  },
  methods: {
    // 搜索
    async search() {
      this.gettableData()
    },
    keyUpDel() {
      if (this.value.length === 0) {
        this.gettableData(this.tableInfo.pageIndex)
      }
    },
    handleSizeChange(val) {
      this.tableInfo.pageSize = val
    },
    async handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.gettableData(val)
    },
    // 渲染列表
    async gettableData(pageIndex) {
      const { data } = await partnerInfoApi({
        pageIndex: pageIndex,
        pageSize: 10,
        name: this.value
      })
      this.tableData = data.currentPageRecords
    },
    //重置密码
    ResetPwd(row) {
      this.$confirm('', '确定要重置合作商密码吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          partnerResetPwdApi(row.id)
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    // 查看详情
    checkInfo(row) {
      this.PartnerInfo = row
      console.log(this.PartnerInfo)
      this.PartnerdialogVisible = true
    },
    // 删除
    deletePartner() {
      this.$notify({
        title: '提示',
        message: '演示系统，不支持此操作',
        type: 'warning'
      })
    },

    // 显示添加功能
    ShowAddPartner() {
      this.PartnerdialogAddUpdate = true
      this.$refs.changePartner.formData = {}
      this.rowId = null
    },
    // 显示修改功能
    ShowEditPartner(row) {
      console.log(row)
      this.rowId = row.id
      this.$refs.changePartner.formData = row
      this.PartnerdialogAddUpdate = true
    }
  },
  mounted() {
    this.gettableData(this.tableInfo.pageIndex)
  },
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {}
}
</script>
<style lang="less" scoped>
body {
  background-color: #f8fafd;
}
.el-card {
  margin-top: 20px;
}
</style>
