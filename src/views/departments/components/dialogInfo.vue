<template>
   
  <div>
       
    <el-dialog title="区域详情" :visible="dialogVisibleInfo" width="50%" :before-close="handleClose">
         
      <el-form ref="form" label-width="100px">
               
        <el-form-item label="区域名称">
                 
          <span>{{ regionName }}</span>
                   
        </el-form-item>
                     
        <el-form-item label="包含点位">
             
          <el-table :data="regionData" style="width: 100%">
            <el-table-column label="序号" width="180" type="index"></el-table-column>
            <el-table-column prop="name" label="点位名称" width="180"></el-table-column>
            <el-table-column prop="vmCount" label="设备数量"></el-table-column>
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
    dialogVisibleInfo: {
      type: Boolean
    },
    regionName: {
      type: String
    },
    regionData: {
      type: Array
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$parent.dialogVisibleInfo = false

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
