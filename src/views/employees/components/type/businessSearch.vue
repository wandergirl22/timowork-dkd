<template>
  <el-form class="gzOne">
    <el-form-item>
      <span>型号搜索:</span>
      <el-input class="input" placeholder="请输入" v-model="numbering" />
      <el-button class="el-icon-search btn" size="small" @click="$emit('Inquire', numbering)">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'numbering',
  data() {
    return {
      numbering: ''
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped>
.gzOne {
  display: flex;
  background-color: #fff;
  height: 65px;
  padding-left: 20px;
}
.test1 {
  width: 40%;
}
.gzOne .input {
  margin-left: 20px;
  width: 200px;
  margin-right: 15px;
  margin-left: 10px;
  line-height: 65px;
}
.pask {
  margin-left: 15px;
  line-height: 65px;
}
.btn {
  height: 40px;
  margin-left: 15px;
  background-color: #5f84ff;
  color: #fff;
}
</style>
