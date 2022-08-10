<template>
  <div class="device">
    <businessSearch ref="input" @Inquire="Inquire"></businessSearch>

    <div class="operaTable">
      <myTable @EnquireDetails="EnquireDetails" :deviceList="MyDevice.currentPageRecords"></myTable>
      <Mypage :MyPage="MyDevice" @previousPage="previousPage" @nxetPage="nxetPage"></Mypage>
    </div>
    <detail ref="deviceDetails"></detail>
  </div>
</template>

<script>
import {
  getDeviceListApi,
  getShopCollectApi,
  getSupplyApi,
  getRepairCountApi,
  getAmountApi,
  getCountApi
} from '@/api/device'
import Mypage from './Mypage.vue'
import businessSearch from './businessSearch.vue'
import myTable from './status/myTable.vue'
import detail from './status/details.vue'
import dayjs from 'dayjs'
export default {
  components: {
    businessSearch,
    myTable,
    Mypage,
    detail
  },
  data() {
    return {
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
        this.MyDevice = res.data
      } catch (error) {}
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
    // 查询详情
    async EnquireDetails(val) {
      console.log(val)
      const lastSupplyTime = dayjs(val.node.updateTime).format('YYYY-MM-DD')
      const createTime = dayjs(val.node.updateTime).startOf('month').format('YYYY-MM-DD')

      console.log(createTime, lastSupplyTime)
      // 获取售货机商品销量
      const res = await getShopCollectApi(val.innerCode, createTime, lastSupplyTime)
      // 获取一定时间的收入
      const url = '+00:00:00'
      const amount = await getAmountApi({
        start: `${createTime} 00:00:00`,
        end: `${createTime} 23:59:59`,
        innerCode: val.innerCode
      })
      console.log(amount)
      // 捕获
      const rr = await getSupplyApi(val.innerCode, createTime, lastSupplyTime)
      // 维修
      const Maintenance = await getRepairCountApi(val.innerCode, createTime, lastSupplyTime)
      // 定单
      const count = await getCountApi({
        start: `${createTime} 00:00:00`,
        end: `${createTime} 23:59:59`,
        innerCode: val.innerCode
      })
      console.log(res)
      // console.log(rr)
      // console.log(Maintenance)
      this.$refs.deviceDetails.number = rr.data
      this.$refs.deviceDetails.shop = amount
      this.$refs.deviceDetails.count = count
      this.$refs.deviceDetails.Maintenance = Maintenance.data

      this.$refs.deviceDetails.shopDetails = res.data
      this.$refs.deviceDetails.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.device {
  padding: 20px;
  .operaTable {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 15px 19px 17px;
  }
}
</style>
