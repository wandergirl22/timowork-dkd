<template>
   
  <div>
       
    <el-dialog :title="title" :visible="ChangedialogVisible" width="50%" :before-close="handleClose">
         
      <el-form ref="form" :rules="formRules" label-width="100px" :model="formData">
               
        <el-form-item label="点位名称" prop="name">
                   
          <el-input placeholder="请输入" v-model="formData.name"></el-input>
                 
        </el-form-item>
                     
        <el-form-item label="所在区域">
                   
          <el-select v-model="formData.regionId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in optionsChild"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
                 
        </el-form-item>
        <el-form-item label="所属商圈">
                             
          <el-select v-model="formData.businessId" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in BusinessList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属合作商">
                 
          <el-select v-model="formData.ownerId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in partnerList"
              :key="item.ownerId"
              :label="item.ownerName"
              :value="item.ownerId"
            ></el-option>
          </el-select>
                           
        </el-form-item>
        <el-form-item label="详细地址">
                   
          <el-cascader
            placeholder="请选择"
            v-model="selectedOptions"
            :options="options"
            @change="handleChange"
            style="width: 100%"
          ></el-cascader>
                 
        </el-form-item>
        <el-form-item>
                   
          <el-input
            placeholder="输入备注"
            type="textarea"
            style="height: 100px"
            v-model="formData.addr"
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
import { regionDataPlus } from 'element-china-area-data'
import { AddNodeApi, editNodeApi, businessListApi } from '@/api/region'

export default {
  name: 'dialogVue',
  props: {
    ChangedialogVisible: {
      type: Boolean
    },
    rowId: {
      type: String
    },
    optionsChild: {
      type: Array
    },
    partnerList: {
      type: Array
    }
  },
  components: {},
  data() {
    return {
      formData: {
        name: '',
        addr: '',
        areaCode: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''
      },

      formRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入', trigger: 'blur' }]
      },

      partner: '',
      BusinessList: [],
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  methods: {
    // 所属商圈
    async getBusiness() {
      const { data } = await businessListApi()
      this.BusinessList = data
      console.log(this.BusinessList, 'getBusiness')
    },

    // 添加和修改
    async onSave() {
      await this.$refs.form.validate()
      const find = this.partnerList.find((item) => {
        return this.formData.ownerId === item.ownerId
      })

      try {
        if (this.rowId) {
          await editNodeApi(this.rowId, {
            name: this.formData.name,
            addr: this.formData.addr,
            areaCode: this.formData.areaCode,
            createUserId: 1,
            regionId: this.formData.regionId,
            businessId: this.formData.businessId,
            ownerId: this.formData.ownerId,
            ownerName: find.ownerName
          })
          this.$message.success('编辑成功')
        } else {
          await AddNodeApi({
            name: this.formData.name,
            addr: this.formData.addr,
            areaCode: this.formData.areaCode,
            createUserId: 1,
            regionId: this.formData.regionId,
            businessId: this.formData.businessId,
            ownerId: this.formData.ownerId,
            ownerName: find.ownerName
          })
          this.$message.success('添加成功')
        }
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.$parent.gettableData()
        this.$parent.ChangedialogVisible = false
      }
    },
    onCancel() {
      this.$parent.ChangedialogVisible = false
    },
    handleClose() {
      this.$parent.ChangedialogVisible = false
      this.$emit('updated:visible', false)
    },

    // 联级菜单
    handleChange(value) {
      this.areaCode = value[2]
    }
  },
  mounted() {
    this.getBusiness()
  },
  computed: {
    title() {
      return this.rowId.length > 0 ? '修改区域' : '新增区域'
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
