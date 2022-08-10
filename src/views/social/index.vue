<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部两个 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 工单统计盒子 -->
          <div class="grid-content bg-purple headerBox bgc1">
            <div class="title">
              日销售统计
              <span></span>
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>1</p>
                </div>
                <div class="text-color2">
                  <p style="margin-top: 37px">当前销售量（个）</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>0</p>
                  <div class="text-color2">
                    <p>当日销售额（元）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p>0</p>
                  <div class="text-color2">
                    <p>当日分成（元）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple headerBox bgc2">
            <div class="title">
              月销售统计
              <span></span>
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">1</p>
                </div>
                <div class="text-color2">
                  <p style="margin-top: 37px">订单量（个）</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">2</p>
                  <div class="text-color2">
                    <p>销售额（万元）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="home-user-task-stats">
                  <p style="color: red">2</p>
                  <div class="text-color2">
                    <p>销售额（万元）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 卡片 -->
    <el-card>
      <span>合作商：</span>
      <el-select v-model="Areavalue" placeholder="请选择" clearable>
        <el-option
          v-for="item in $store.state.user.Partner"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-date-picker
        style="margin-left: 15px"
        v-model="value"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <zzl-Button
        title="查询"
        icon="el-icon-search"
        backgroundColor="#5f84ff"
        @click="search"
        style="margin-left: 15px"
      ></zzl-Button>
      <!-- 统计 -->

      <el-row style="margin-top: 15px">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less">
.bgc1 {
  background: #e9f3ff !important;
  background-image: url(~@/assets/dashboard/bg1.png), url(~@/assets/dashboard/bg2.png) !important;
  background-repeat: no-repeat, no-repeat !important;
  background-position: 0 0, calc(100% - 12px) 100% !important;
  .title {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;

    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;
    span {
      margin-left: 10px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999;
    }
  }
  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #91a7dc;
    line-height: 17px;
  }
}
.bgc2 {
  background: #fbefe8 url(~@/assets/dashboard/bg3.png) no-repeat calc(100% - 12px) 100% !important;

  .home-user-task-stats {
    margin-top: 10px;
    height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 50px;
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  }
  .text-color2 {
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff5757;
    line-height: 17px;
  }
}
.headerBox {
  height: 200px;
  padding: 25px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
  border-radius: 20px;
  padding: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
