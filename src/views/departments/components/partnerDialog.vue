<template>
   
  <div>
       
    <el-dialog title="合作商" :visible="PartnerdialogVisible" width="50%" :before-close="handleClose">
      <div class="content-dialog">
        <div>
          <span>合作商名称:</span>
          <span>{{ PartnerInfo.name }}</span>
        </div>
        <div>
          <span>联系人：</span>
          <span>{{ PartnerInfo.contact }}</span>
        </div>
               
        <div>
          <span>联系电话：</span>
          <span>{{ PartnerInfo.mobile }}</span>
        </div>
        <div>
          <span>分成比例：</span>
          <span>{{ PartnerInfo.ratio }}%</span>
        </div>
      </div>
         
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogInfo',
  props: {
    PartnerdialogVisible: {
      type: Boolean
    },
    PartnerInfo: {
      type: Object
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$parent.PartnerdialogVisible = false

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
.content-dialog {
  display: flex;
  flex-wrap: wrap;

  div {
    height: 36px;
    line-height: 36px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    span:first-child {
      margin-right: 15px;
    }
  }
}
</style>
