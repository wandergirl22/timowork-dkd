<template>
  <div class="block1">
    <div class="total">
      <span>共{{ MyPage.totalCount }}条记录，第{{ MyPage.pageIndex }}/{{ MyPage.totalPage }}页</span>
    </div>
    <div>
      <el-button class="btn-next" @click="$emit('previousPage')">上一页</el-button>
      <el-button class="btn-next" @click="$emit('nxetPage')">下一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    MyPage: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="less" scoped>
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
.btn-next {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #d5ddf8;
  border: none;
  color: #655b56 !important;
}
</style>
