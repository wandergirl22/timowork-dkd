<template>
  <div class="block1">
    <div class="total">
      <span>共{{ totalCount }}条记录，第{{ currentPage }}/{{ totalPage }}页</span>
    </div>
    <el-pagination
      v-show="false"
      align="center"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderList.length"
    ></el-pagination>
    <div>
      <el-button class="btn-next" @click="$emit('previousPage')">上一页</el-button>
      <el-button class="btn-next" @click="$emit('nxetPage')">下一页</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myPagination',
  props: {
    totalCount: {
      type: String,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPage: {
      type: String,
      required: true
    },
    orderList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less">
.block1 {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 32px 16px;
  width: 100%;
  .total {
    display: inline-block;
    font-size: 15px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    color: #dbdfe5 !important;
  }
}
.btn-next{
      width: 80px !important;
      height: 36px;
      padding: 0;
      background-color: #d5ddf8;
      border: none;
      color: #655b56 !important;
}
</style>
