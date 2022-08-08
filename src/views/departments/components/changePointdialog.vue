<template>
   
  <div>
       
    <el-dialog title="新增区域" :visible="ChangedialogVisible" width="50%" :before-close="handleClose">
         
      <el-form ref="form" :rules="formRules" label-width="100px" :model="formData">
               
        <el-form-item label="点位名称" prop="name">
                   
          <el-input placeholder="请输入" v-model="formData.name"></el-input>
                 
        </el-form-item>
                     
        <el-form-item label="所在区域">
                   

          <el-autocomplete
            style="width: 100%"
            popper-class="my-autocomplete"
            v-model="Area"
            :fetch-suggestions="querySearchArea"
            placeholder="请选择"
            @select="handleSelectArea"
          >
            <template slot-scope="{ item }">
              <div>{{ item }}</div>
            </template>
          </el-autocomplete>
                 
        </el-form-item>
        <el-form-item label="所属商圈">
                   
          <el-autocomplete
            style="width: 100%"
            popper-class="my-autocomplete"
            v-model="Business"
            :fetch-suggestions="querySearchBusiness"
            placeholder="请选择"
            @select="handleSelectBusiness"
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
                 
        </el-form-item>
        <el-form-item label="归属合作商">
                   
          <el-autocomplete
            style="width: 100%"
            popper-class="my-autocomplete"
            v-model="partner"
            :fetch-suggestions="querySearchpartner"
            placeholder="请选择"
            @select="handleSelectpartner"
          >
            <template slot-scope="{ item }">
              <div>{{ item }}</div>
            </template>
          </el-autocomplete>
                         
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
                   
          <el-cascader
            placeholder="请选择"
            v-model="formData.addr"
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
            v-model="formData.textarea"
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
import { addregionApi, editregionApi, businessListApi } from '@/api/region'

export default {
  name: 'dialogVue',
  props: {
    ChangedialogVisible: {
      type: Boolean
    },
    rowId: {
      type: String
    },
    regionSelect: {
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
        textarea: ''
      },
      id: '',
      formRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      Area: '',
      partner: '',
      Business: '',
      BusinessList: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 所属商圈
    async getBusiness() {
      const { data } = await businessListApi()
      this.BusinessList = data
      console.log(this.BusinessList, 'getBusiness')
    },

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

    //所在区域选择功能
    querySearchArea(queryString, cb) {
      var regionSelect = this.regionSelect
      var results = queryString ? regionSelect.filter(this.createFilter(queryString)) : regionSelect
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (regionSelect) => {
        return regionSelect.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    handleSelectArea(item) {
      this.Area = item
    },
    //所在商圈的选择功能
    querySearchBusiness(queryString, cb) {
      var BusinessList = this.BusinessList
      var results = queryString ? BusinessList.filter(this.createFilter(queryString)) : BusinessList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (BusinessList) => {
        return BusinessList.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    handleSelectBusiness(item) {
      this.Business = item.name
    },
    //归属合作商的选择功能
    querySearchpartner(queryString, cb) {
      var partnerListArray = this.partnerListArray
      var results = queryString ? partnerListArray.filter(this.createFilter(queryString)) : partnerListArray
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (partnerListArray) => {
        return partnerListArray.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    handleSelectpartner(item) {
      this.partner = item
    },
    // 联级菜单
    handleChange(value) {
      console.log(value)
    }
  },
  mounted() {
    this.getBusiness()
  },
  computed: {
    partnerListArray() {
      return [...new Set(this.partnerList)]
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
