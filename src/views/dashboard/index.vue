<template>
  <div id="home">
    <div class="home" style="margin-top: 40px; margin-left: 20px">
      <!-- 头部两个 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 工单统计盒子 -->
          <div class="grid-content bg-purple headerBox bgc1">
            <div class="title">
              工单统计
              <span>2022.08.01 ~ 2022.08.07</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>56</p>
                </div>
                <div class="text-color2">
                  <p>进行工单（个）</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>56</p>
                  <div class="text-color2">
                    <p>进行工单（个）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>56</p>
                  <div class="text-color2">
                    <p>进行工单（个）</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="home-user-task-stats">
                  <p>56</p>
                  <div class="text-color2">
                    <p>进行工单（个）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple headerBox bgc2">
            <div class="title">
              工单统计
              <span>2022.08.01 ~ 2022.08.07</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="home-user-task-stats">
                  <p style="color: red">1660</p>
                </div>
                <div class="text-color2">
                  <p>进行工单（个）</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="home-user-task-stats">
                  <p style="color: red">1995</p>
                  <div class="text-color2">
                    <p>进行工单（个）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- 中间和右边 -->
      <el-row :gutter="20">
        <el-col :span="17">
          <!-- echars数据可视化 -->
          <div class="grid-content bg-purple" style="min-height: 365px">
            <div class="title">
              工单统计
              <span>2022.08.01 ~ 2022.08.07</span>
              <el-radio-group v-model="radio1" size="mini" style="margin-left: 390px; background-color: red">
                <el-radio-button label="周"></el-radio-button>
                <el-radio-button label="月"></el-radio-button>
                <el-radio-button label="年"></el-radio-button>
              </el-radio-group>
            </div>

            <div class="boxEchars">
              <div class="echars2" id="echars2"></div>
              <div class="echars1" id="echars"></div>
            </div>
          </div>
        </el-col>
        <!-- 中间和右边 -->

        <el-col :span="6">
          <div class="grid-content bg-purple" style="height: 538px; margin-top: -170px">最右边</div>
        </el-col>
      </el-row>
      <!-- 底部一个 -->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="13">
          <div class="grid-content bg-purple left" style="min-height: 300px">
            <div class="echars3" id="echars3"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple right" style="min-height: 300px">123456</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const dayjs = require('dayjs')
import { getUserWork, getregionCollect } from '@/api/stagings'
export default {
  name: 'home',
  data() {
    return {
      radio1: '周'
    }
  },
  computed: {
    td() {
      return dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    atd() {
      return dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted() {
    this.myEcharts()
    this.myEcharts2()
    this.myEcharts3()
    this.getUserWork()
    this.getregionCollect()
  },
  methods: {
    // 柱状图
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('echars'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '销售额分布',
          left: 'center'
        },

        xAxis: {
          type: 'category',
          data: ['北京平', '霍营街']
        },
        yAxis: {
          type: 'value',
          name: '单位/元'
        },
        series: [
          {
            data: [2800, 200],
            barWidth: '5%',
            type: 'bar'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // 折线图
    myEcharts2() {
      const echarts = require('echarts')
      var myChart2 = echarts.init(document.getElementById('echars2'))

      var option2 = {
        color: ['red'],
        title: {
          text: '销售额趋势图',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          boundaryGap: false
        },
        yAxis: {
          name: '单位/元',
          type: 'value'
        },
        series: [
          {
            data: [45000, 18000, 2000, 2334, 5666, 77888, 333],
            type: 'line'
          }
        ]
      }
      myChart2.setOption(option2)
    },
    // 饼状图
    myEcharts3() {
      // 基于准备好的dom，初始化echarts实例
      const echarts = require('echarts')
      var myChart3 = echarts.init(document.getElementById('echars3'))

      // 指定图表的配置项和数据
      var option3 = {
        title: {
          text: '合作商点位数Top5',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>总占比 : {c}% '
        },
        series: [
          {
            name: '合作商点位数Top5',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: [
              { value: 62.5, name: '金燕龙合作商' },
              { value: 12.5, name: '天华物业' },
              { value: 12.5, name: '北京合作商' },
              { value: 6.25, name: 'likede' },
              { value: 6.25, name: '佳佳' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option3)
    },
    async getUserWork() {
      const res = await getUserWork({
        userId: 1,
        start: this.td(new Date()),
        end: this.atd(new Date())
      })
      console.log(res)
    },
    async getregionCollect() {
      const res = await getregionCollect('2020-10-01', '2020-10-31')
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.boxEchars {
  width: 100%;
  height: 280px;
  margin-top: 45px;
  display: flex;
  .echars1 {
    flex: 1;
  }
  .echars2 {
    flex: 1;
  }
}
.echars3 {
  height: 280px;
  width: 75%;
}

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
.headerBox {
  height: 150px;
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
