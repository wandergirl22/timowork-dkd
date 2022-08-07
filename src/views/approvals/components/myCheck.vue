<template>
  <el-dialog
         title="工单详情"
         :visible="dialogVisible"
          width="630px"
          custom-class="el-dialog1"	  
        >
         <div class="top">
             <el-button  @click="$emit('changeVis')"  class="cancel" icon="el-icon-close"></el-button>
         </div>
         <div class="body">
           <div class="body-top">
             <img src="../../../assets/images/cancel.png" alt="">
             <span>取消</span>
             <img src="../../../assets/images/cancel1.png" alt="">
           </div>
           <el-form  :model="DetailsFrom" >
             <el-row>
               <el-col :span="12"><el-form-item label="设备编号:" >
                <span>{{DetailsFrom.innerCode}}</span> 
                </el-form-item></el-col>
               <el-col :span="12">
                 <el-form-item label="创建日期:" >
                <span>{{DetailsFrom.createTime}}</span> 
                </el-form-item>
               </el-col>
                <el-col :span="12"><el-form-item label="取消日期:" >
                <span>{{DetailsFrom.updateTime}}</span> 
                </el-form-item></el-col>
               <el-col :span="12">
                 <el-form-item label="运营人员:" >
                <span>{{DetailsFrom.userName}}</span> 
                </el-form-item>
               </el-col>
                <el-col :span="12"><el-form-item label="工单类型:" >
                <span>{{DetailsFrom.taskType.typeName}}</span> 
                </el-form-item></el-col>
               <el-col :span="12">
                 <el-form-item label="补货数量:" >
                <span>补货详情</span> 
                </el-form-item>
               </el-col>
                   <el-col :span="12"><el-form-item label="工单方式:" >
                <span>{{DetailsFrom.createType == 0 ? '自动' :'手动'}}</span> 
                </el-form-item></el-col>
               <el-col :span="12">
                 <el-form-item label="取消原因:" >
                <span></span> 
                </el-form-item>
               </el-col>
             </el-row>
           </el-form>
         </div>
         <div slot="footer" class="dialog-footer">
           <el-button class="rebuild" @click="rebuildChangeAddOrderShow">重新创建</el-button>
         </div>
      </el-dialog>
</template>
<script>
 export default {
  name: 'myCheck',
   props: {
	   DetailsFrom:{
		   type:[Array,Object],
		   required:true
	   },
	dialogVisible: {
      type: Boolean,
      required: true
    }
   },
   data () {
	 return {

   }
   },
   created() {
   },
   methods: {
	   rebuildChangeAddOrderShow(){
		   this.$emit('rebuildChangeAddOrderShow')
		   this.$emit('changeVis')
	   }
   },
   computed: {
   },
   watch: {
   },
   mounted() {
   },
   components: {
   },
 }
</script>
<style scoped lang='less'>
.top{
  .cancel{
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
  }
}
.body{
  .body-top{
    display: flex;
    align-items: center;
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0,0%,92.5%,.39);
    span{
         flex: 1;
         margin-left: 16px;
         color: rgba(0,0,0,.85);
    }
  }

}
.dialog-footer{
  padding-top: 0;
  text-align: center;
  .rebuild{
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
  }
}
</style>