<template>
   
  <div>
       
    <el-dialog title="新增区域" :visible="visiable" width="50%" :before-close="handleClose">
         
      <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
               
        <el-form-item label="区域名称" prop="regionName">
                   
          <el-input placeholder="输入" v-model="formData.regionName"></el-input>
                 
        </el-form-item>
                     
        <el-form-item label="备注说明" prop="remark">
                   
          <el-input
            placeholder="输入备注"
            type="textarea"
            v-model="formData.remark"
            style="height: 100px"
          ></el-input>
                 
        </el-form-item>
             
      </el-form>
           
      <span slot="footer" class="dialog-footer">
               
        <el-button @click="onCancel">取 消</el-button>
             
        <el-button type="primary" @click="onSave">确 定</el-button>
             
      </span>
       
    </el-dialog>
  </div>
</template>

<script>
import { addregionApi, editregionApi } from '@/api/region'

export default {
  name: 'dialogVue',
  props: {
    visiable: {
      type: Boolean
    },
    rowId: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      formData: {
        regionName: '',
        remark: ''
      },
      id: '',
      formRules: {
        regionName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async onSave() {
      await this.$refs.form.validate()

      try {
        if (this.rowId) {
          await editregionApi(this.rowId, this.formData)
          this.$message.success('编辑成功')
        } else {
          await addregionApi(this.formData)
          this.$message.success('添加成功')
        }
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.$parent.gettableData()
        this.$parent.dialogVisible = false
      }
    },
    onCancel() {
      this.$parent.dialogVisible = false
    },
    handleClose() {
      this.$parent.dialogVisible = false
      this.$emit('updated:visible', false)
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
