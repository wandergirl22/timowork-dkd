<template>
   
  <div>
       
    <el-dialog title="点位详情" :visible="ChangedialogVisibleInfo" width="50%" :before-close="handleClose">
         
      <el-form ref="form" label-width="100px">
                             
        <el-form-item>
             
          <el-table :data="NodeData" style="width: 100%">
            <el-table-column label="序号" width="50" type="index"></el-table-column>
            <el-table-column prop="innerCode" label="机器编号" width="150"></el-table-column>
            <el-table-column prop="vmStatus" label="设备状态" width="150"></el-table-column>
            <el-table-column prop="lastSupplyTime" label="最后一次供货" width="180"></el-table-column>
          </el-table>
             
        </el-form-item>
             
      </el-form>
             
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogInfo',
  props: {
    ChangedialogVisibleInfo: {
      type: Boolean
    },

    NodeData: {
      type: Array
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$parent.ChangedialogVisibleInfo = false

      //   this.$emit('updated:visible', false)
    }
  },
  mounted() {},
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {}
}
</script>
<style lang="less" scoped>
/deep/.el-textarea__inner {
  height: 100px;
}
</style>
