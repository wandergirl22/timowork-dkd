<template>
  <div>
    <el-card>
      <zzl-Input
        title="点位搜索："
        v-model="value"
        placeholder="请输入"
        @keyup.delete.native="keyUpDel"
      ></zzl-Input>
      <span>区域搜索：</span>
      <el-select v-model="Areavalue" placeholder="请选择">
        <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item"></el-option>
      </el-select>
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
        @click="ShowAddRegion"
      ></zzl-Button>

      <!-- table表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + 10 * (tableInfo.pageIndex - 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点位名称" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在区域" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.region.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商圈类型" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.businessType.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合作商" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.ownerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="详细地址" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.addr | todeladdr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style="color: #5f84ff">
              查看详情
            </el-button>
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
    <!-- 弹层 -->
    <changePointdialogVue
      :ChangedialogVisible.sync="ChangedialogVisible"
      :rowId="rowId"
      :partnerList="partnerList"
      :regionSelect="regionSelect"
      ref="changePoint"
    ></changePointdialogVue>
  </div>
</template>
<script>
import { NodeListApi } from '@/api/region'
import changePointdialogVue from './components/changePointdialog.vue'
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
      Areavalue: '',
      options: [],
      partnerList: [],
      ChangedialogVisible: false,
      rowId: '',
      regionSelect: []
    }
  },
  created() {},
  methods: {
    // 渲染input
    async inputFn() {
      const { data } = await NodeListApi({ pageSize: 1000, name: this.value })
      this.options = [...new Set(data.currentPageRecords.map((item) => item.region.name))]
    },
    // 搜索
    search() {},
    keyUpDel() {
      if (this.value.length === 0) {
        this.gettableData(this.tableInfo.pageIndex)
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 渲染列表
    async gettableData(pageIndex, pageSize) {
      const { data } = await NodeListApi({ pageIndex: pageIndex, pageSize: pageSize, name: this.value })

      this.partnerList = data.currentPageRecords.map((val) => val.ownerName)
      this.regionSelect = data.currentPageRecords.map((val) => val.region.name)
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
      this.ChangedialogVisible = true
    },
    // 显示修改功能
    ShowEditRegion(row) {
      console.log(row)
      this.rowId = row.id
      // this.$refs.dialogVue.formData.regionName = row.name
      // this.$refs.dialogVue.formData.remark = row.remark
      this.ChangedialogVisible = true
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.gettableData(this.tableInfo.pageIndex, 10)
    this.inputFn()
  },
  filters: {
    todeladdr(val) {
      return val.substring(val.lastIndexOf('-') + 1)
    }
  },
  components: { changePointdialogVue }
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
