<<<<<<< HEAD
<template>
       <el-dialog title="新增工单" :visible="dialogFormVisible" 
        custom-class="el-dialog1"
		 :before-close="handleClose">
        <el-form :model="detailsFromCheck">
            <el-form-item label="设备编号:" :label-width="formLabelWidth">
              <el-input
                v-model="detailsFromCheck.innerCode"
                autocomplete="off"
                placeholder="请输入"
                maxlength="15"
                show-word-limit
                style="width:500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="工单类型:" :label-width="formLabelWidth">
              <el-dropdown style="width:500px">
                 <el-input
                    v-model="detailsFromCheck.orderStatus"
                    autocomplete="off"
                    placeholder="请选择"
                  ></el-input>
               <el-dropdown-menu slot="dropdown"  style="width:500px" 
                  
			    >
                 <el-dropdown-item  >补货工单</el-dropdown-item>
               </el-dropdown-menu>
               </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="补货数量:" :label-width="formLabelWidth">
            <div><i class="el-icon-document"></i><span>补货清单</span></div>
            </el-form-item>
            <el-form-item label="运营人员:" :label-width="formLabelWidth">
              <el-dropdown style="width:500px">
                 <el-input
                    v-model="detailsFromCheck.userName"
                    autocomplete="off"
                    placeholder="请选择"
                  ></el-input>
               <el-dropdown-menu slot="dropdown"  style="width:500px" >
                 <el-dropdown-item >无数据</el-dropdown-item>
               </el-dropdown-menu>
               </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="备注:" :label-width="formLabelWidth">
             <el-input
               type="textarea"
               :rows="4"
               placeholder="请输入内容"
               style="width:500px"
               v-model="addOrder.textarea">
             </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="quit" @click="$emit('addOrderShowClose')">取 消</el-button>
            <el-button class="confirm"  type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
</template>
<script>
import { type } from 'os'
export default {
  name: 'addOrder',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    detailsFromCheck: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      addOrder: {
        innerCode: '',
        orderStatus: '',
        people: '',
        textarea: ''
      },
      formLabelWidth: '110px'
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit('addOrderShowClose')
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less">
.dialog-footer {
  margin-top: -40px;
  text-align: center;
}

.quit {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
}
.confirm {
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
}
</style>