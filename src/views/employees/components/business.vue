<template>
  <div class="device">
    <businessSearch ref="input" @Inquire="Inquire"></businessSearch>
    <div class="operaTable">
      <newButton
        ref="batch"
        @updateDeviceType="getDeviceList"
        @batch="batch"
        @updateBatch="getDeviceList"
      ></newButton>
      <myTable
        @cargoLanes="cargoLanes"
        @tactics="tactic"
        @cancel="canel"
        :deviceList="MyDevice.currentPageRecords"
        ref="batchData"
      ></myTable>
    </div>
    <Mypage :MyPage="MyDevice" @previousPage="previousPage" @nxetPage="nxetPage"></Mypage>
    <cargoLanes ref="cargo"></cargoLanes>
    <tactics ref="strategy" :tacticVal="tacticVal"></tactics>
    <cancelDevice ref="cancel" @updateDeviceList="getDeviceList"></cancelDevice>
  </div>
</template>
<script>
import businessSearch from './businessSearch.vue'
import newButton from '@/views/employees/components/newButton.vue'
import { getDeviceListApi, getVmPoliceApi } from '@/api/device'
import myTable from './myTable.vue'
import Mypage from './Mypage.vue'
import cargoLanes from './cargoLanes.vue'
import tactics from './cacties.vue'
import cancelDevice from './cancelDevice.vue'
import dayjs from 'dayjs'
export default {
  name: 'business',
  props: {},
  data() {
    return {
      multipleSelection: [],
      MyDevice: {},
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      tacticVal: {}
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
    // 批量操作
    batch() {
      console.log(88888)
      // console.log(this.$refs.batchData.$refs.TableData.selection)
      this.$refs.batch.batchDevice = this.$refs.batchData.$refs.TableData.selection
    },
    async getDeviceList() {
      try {
        const res = await getDeviceListApi({
          pageIndex: this.currentPage,
          pageSize: this.total
        })
        console.log(res.data)
        this.MyDevice = res.data
      } catch (error) {}
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 上一页
    previousPage() {
      if (this.currentPage === 1) return
      this.currentPage--
      this.getDeviceList()
    },
    // 下一页
    nxetPage() {
      this.currentPage++
      this.getDeviceList()
    },
    // 查询
    async Inquire(val) {
      console.log(val)
      if (val.trim() === '') return
      const find = await this.MyDevice.currentPageRecords.filter((item) => {
        return item.innerCode === val
      })
      this.MyDevice.currentPageRecords = find
      this.$refs.input.numbering = ''
    },
    // 货道
    cargoLanes() {
      console.log('货道')
      this.$refs.cargo.dialogVisible = true
    },
    // 策略
    async tactic(val) {
      console.log('策略')
      console.log(val)
      // this.tacticVal = val.innerCode
      this.$refs.strategy.rowData = val
      const res = await getVmPoliceApi(val.innerCode)
      this.$refs.strategy.tt = res.data
      console.log(this.$refs.strategy.tt)
      this.$refs.strategy.getPolicyList({
        innerCodeList: this.$refs.strategy.tt.innerCodeList,
        policyId: this.$refs.strategy.tt.policyId
      })

      this.$refs.strategy.centerDialogVisible = true

      // this.$refs.strategy.centerDialogVisibleSelect = true

      // console.log( !!this.$refs.strategy.tacticVal)

      // this.$refs.strategy.centerDialogVisible = true
    },
    // 修改设备
    async canel(val) {
      console.log(val)
      const time = dayjs(val.lastSupplyTime).format('YYYY.MM.DD HH:mm:ss')
      console.log(time)
      this.$refs.cancel.cancelData = val
      this.$refs.cancel.lastSupplyTime = time
      this.$refs.cancel.value = val.node.name
      this.$refs.cancel.dialogVisible = true
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {
    businessSearch,
    newButton,
    myTable,
    Mypage,
    cargoLanes,
    tactics,
    cancelDevice
  }
}
</script>
<style scoped lang="less">
.device {
  padding: 20px;
  .operaTable {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 15px 19px 17px;
  }
}
</style>
