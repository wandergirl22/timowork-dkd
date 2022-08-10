<template>
  <div class="device">
    <BusinessSearch @Inquire="Inquire" ref="input"></BusinessSearch>
    <div class="operaTable">
      <newButton @getvmType="getvmType" ref="butt"></newButton>
      <myTable :deviceList="vmTypeList" @showButton="showButton"></myTable>
      <Mypage ref="show" :MyPage="MyDevice" @previousPage="previousPage" @nxetPage="nxetPage"></Mypage>
    </div>
  </div>
</template>

<script>
import BusinessSearch from './type/businessSearch.vue'
import newButton from './type/newButton.vue'
import { getvmTypeApi } from '@/api/device'
import myTable from './type/myTable.vue'
import Mypage from './Mypage.vue'
export default {
  components: {
    BusinessSearch,
    newButton,
    myTable,
    Mypage
  },
  data() {
    return {
      vmTypeList: [],
      MyDevice: {},
      currentPage: 1, // 当前页码
      total: 10 // 总条数
    }
  },

  created() {
    this.getvmType()
  },

  methods: {
    // 获取设备类型
    async getvmType() {
      try {
        const res = await getvmTypeApi({
          pageIndex: this.currentPage,
          pageSize: this.total
        })
        this.vmTypeList = res.data.currentPageRecords
        this.MyDevice = res.data
        console.log(res.data)
      } catch (error) {}
    },
    async Inquire(val) {
      console.log(val)
      if (val.trim() === '') return
      const find = await this.vmTypeList.filter((item) => {
        return item.model === val
      })
      this.vmTypeList = find
      this.$refs.input.numbering = ''
      console.log(find)
    },
    previousPage() {
      if (this.currentPage === 1) return
      this.currentPage--
      this.getvmType()
    },
    // 下一页
    nxetPage() {
      if (this.MyDevice.totalCount <= 10) return
      this.currentPage++
      this.getvmType()
    },
    // 修改
    async showButton(val) {
      try {
        console.log(val)
        this.$refs.butt.deviceType = val
        this.$refs.butt.dialogVisible = true
        this.$refs.butt.isShowData()
      } catch (error) {}
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
