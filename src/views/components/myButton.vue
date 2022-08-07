<template>
  <el-button @click="btn" class="searchBtn" icon="el-icon-search"><slot></slot></el-button>
</template>
<script>
export default {
  name: 'myButton',
  props: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    btn() {
      console.log(1)
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less">
.searchBtn {
  min-width: 80px;
  height: 36px;
  padding: 0;
  color: #fff;
  text-align: center;
  background-color: #5f84ff;
  border: none;
  margin-top: 2px;
}
</style>
