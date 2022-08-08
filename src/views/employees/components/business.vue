<template>
  <div class="device">
    <businessSearch ref="input" @Inquire="Inquire"></businessSearch>
    <div class="operaTable">
      <newButton></newButton>
      <myTable @cargoLanes="cargoLanes" @tactics="tactic" :deviceList="MyDevice.currentPageRecords"></myTable>
    </div>
    <Mypage :MyPage="MyDevice" @previousPage="previousPage" @nxetPage="nxetPage"></Mypage>
    <cargoLanes ref="cargo"></cargoLanes>
    <tactics ref="strategy"></tactics>
  </div>
</template>
<script>
import businessSearch from './businessSearch.vue'
import newButton from '@/views/employees/components/newButton.vue'
import { getDeviceListApi, getPolicyListApi } from '@/api/device'
import myTable from './myTable.vue'
import Mypage from './Mypage.vue'
import cargoLanes from './cargoLanes.vue'
import tactics from './cacties.vue'
export default {
  name: 'business',
  props: {},
  data() {
    return {
      multipleSelection: [],
      MyDevice: {},
      currentPage: 1, // 当前页码
      total: 10 // 总条数
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
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
      const res = await getPolicyListApi({
        innerCodeList: val.innerCode,
        policyId: '031100001'
      })
      console.log(res)
      this.$refs.strategy.centerDialogVisible = true
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
    tactics
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
