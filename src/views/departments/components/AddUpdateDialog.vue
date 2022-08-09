<template>
   
  <div>
       
    <el-dialog :title="title" :visible="PartnerdialogAddUpdate" width="50%" :before-close="handleClose">
         
      <el-form ref="form" :rules="formRules" label-width="100px" :model="formData">
               
        <el-form-item label="合作商名称" prop="name">
                   
          <el-input placeholder="请输入" v-model="formData.name"></el-input>
                 
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
                   
          <el-input placeholder="请输入" v-model="formData.contact"></el-input>
                 
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
                   
          <el-input placeholder="请输入" v-model="formData.mobile"></el-input>
                 
        </el-form-item>
        <el-form-item label="账号" prop="account">
                   
          <el-input placeholder="请输入" v-model="formData.account"></el-input>
                 
        </el-form-item>
        <el-form-item label="分成比例(%)">
                   
          <el-input-number
            v-model="formData.ratio"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="100"
            style="width: 100%"
          ></el-input-number>
                 
        </el-form-item>

        <el-form-item label="密码" prop="password">
                   
          <el-input placeholder="请输入" v-model="formData.password"></el-input>
                 
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
import { AddDpartnerApi, editDpartApi } from '@/api/region'

export default {
  name: 'AddUpdatedialogVue',
  props: {
    PartnerdialogAddUpdate: {
      type: Boolean
    },
    rowId: {
      type: Number
    }
  },
  components: {},
  data() {
    return {
      formData: {
        name: '',
        contact: '',
        mobile: '',
        account: '',
        ratio: 1,
        password: ''
      },

      formRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],

        password: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 添加和修改
    async onSave() {
      await this.$refs.form.validate()
      if (this.rowId) {
        await editDpartApi(this.rowId, this.formData)
        this.$message.success('编辑成功')
      } else {
        await AddDpartnerApi(this.formData)
        this.$message.success('添加成功')
      }

      try {
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.$parent.gettableData()
        this.$parent.PartnerdialogAddUpdate = false
      }
    },
    onCancel() {
      this.$parent.PartnerdialogAddUpdate = false
    },
    handleClose() {
      this.$parent.PartnerdialogAddUpdate = false
      this.$emit('updated:visible', false)
    },

    // 计数器
    handleChange(value) {
      console.log(value)
    }
  },
  mounted() {},
  computed: {
    title() {
      return this.rowId > 0 ? '修改合作商' : '新增合作商'
    }
  },
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
