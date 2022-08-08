<template>
  <div>
    <el-card>
      <zzl-Input
        title="区域搜索："
        v-model="value"
        placeholder="请输入"
        @keyup.delete.native="keyUpDel"
      ></zzl-Input>
      <zzl-Button title="查询" icon="el-icon-search" backgroundColor="#5f84ff" @click="search"></zzl-Button>
    </el-card>
    <el-card>
      <zzl-Button
        title="新建"
        icon="el-icon-circle-plus-outline"
        backgroundColor="#ff712c"
        @click="ShowAddRegion"
      ></zzl-Button>

      <!-- table表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + 10 * (tableInfo.pageIndex - 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域名称" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点位数" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.nodeCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注说明" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)" style="color: #5f84ff">查看详情</el-button>
            <el-button size="mini" style="color: #5f84ff" @click="ShowEditRegion(scope.row)">修改</el-button>
            <el-button size="mini" @click="delTableList(scope.row)" style="color: red">删除</el-button>
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
    <!-- 新增和修改弹层 -->
    <Dialog :visiable.sync="dialogVisible" :rowId="rowId" ref="dialogVue"></Dialog>
    <!-- 查看详情弹层 -->
    <DialogInfo
      :dialogVisibleInfo="dialogVisibleInfo"
      :regionName="regionName"
      :regionData="regionData"
    ></DialogInfo>
  </div>
</template>
<script>
import { getregionListApi, delregionApi, NodeListApi } from '@/api/region'
import Dialog from './components/dialog.vue'
import DialogInfo from './components/dialogInfo.vue'

export default {
  name: 'region',
  props: {},
  data() {
    return {
      tableData: [],
      tableInfo: {
        pageIndex: 1,
        totalCount: 0,
        pageSize: 10,
        totalPage: 0
      },
      taskCode: '',
      value: '',
      dialogVisible: false,
      dialogVisibleInfo: false,
      rowId: '',
      regionName: '',
      regionData: []
    }
  },
  created() {},
  methods: {
    // 搜索
    search() {
      this.gettableData(this.tableInfo.pageIndex)
    },
    keyUpDel() {
      if (this.value.length === 0) {
        this.gettableData(this.tableInfo.pageIndex)
      }
    },

    // 查看详情
    async handleEdit(row) {
      this.dialogVisibleInfo = true
      const { data } = await NodeListApi({
        pageIndex: this.tableInfo.pageIndex,
        pageSize: 10,
        name: row.name,
        regionId: row.id
      })
      this.regionData = data.currentPageRecords
      console.log(this.regionData, '222')
      this.regionName = row.name
    },
    // 渲染列表
    async gettableData(pageIndex) {
      const { data } = await getregionListApi({ pageIndex: pageIndex, pageSize: 10, name: this.value })
      console.log(data)
      this.tableData = data.currentPageRecords
      this.tableInfo.totalCount = parseInt(data.totalCount)
      this.tableInfo.pageSize = parseInt(data.pageSize)
      this.tableInfo.totalPage = parseInt(data.totalPage)
    },
    handleSizeChange(val) {
      this.tableInfo.pageSize = val
    },
    async handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.gettableData(val)
    },
    // 删除功能
    async delTableList(row) {
      try {
        await delregionApi(row.id)
        this.gettableData(this.tableInfo.pageIndex)
        this.$message.success('删除成功')
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 显示添加功能
    ShowAddRegion() {
      this.$refs.dialogVue.formData = {}
      this.dialogVisible = true
    },
    // 显示修改功能
    ShowEditRegion(row) {
      console.log(row)
      this.rowId = row.id
      this.$refs.dialogVue.formData.regionName = row.name
      this.$refs.dialogVue.formData.remark = row.remark
      this.dialogVisible = true
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.gettableData(this.tableInfo.pageIndex)
  },
  components: { Dialog, DialogInfo }
}
</script>
<style scoped lang="scss">
body {
  background-color: #f8fafd;
}
.el-card {
  margin-top: 20px;
}
</style>
