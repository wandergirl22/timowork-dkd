<template>
  <div class="login">
    <div class="login-container">
      <img src="../../assets/images/icon.png" alt="" />
      <!-- 提示按钮 -->
      <div class="form">
        <!-- 用户名 密码 验证码 -->
        <el-form :model="loginForm" :rules="formRules" ref="loginForm">
          <el-form-item prop="loginName">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.loginName"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-s-goods"
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="check">
              <el-input
                type="text"
                clearable
                style="width: 100%"
                v-model="loginForm.code"
                prefix-icon="el-icon-phone"
                placeholder="请输入验证码"
              ></el-input>
              <div class="number">
                <div @click="getCheckImg(checkNumber)">
                  <img class="number-img" :src="this.checkImg" style="width: 100px; height: 60px" />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <!-- 登录按钮 -->
        <el-button @click="btnLogin" class="btn-login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const {
  mapActions: mapLoginActions,
  mapState: mapLoginState,
  mapMutations: mapLoginMutions
} = createNamespacedHelpers('login')
export default {
  name: 'index',
  props: {},
  data() {
    return {
      loginForm: {
        loginName: '', //用户名
        password: '', //密码
        code: '' //验证码
      },
      // 规则
      formRules: {
        loginName: [{ required: true, message: '请填写手机号' }],
        password: [{ required: true, message: '请填写密码' }],
        code: [{ required: true, message: '请填写验证码' }]
      },
      checkNumber: 'IIVpNtiYfuRdvX2468EIE1Cz8tkb8pAL' //验证码随机数 默认
    }
  },
  created() {
    //初始化验证码
    this.getCheck(this.checkNumber)
  },
  methods: {
    // 获取验证码 actions
    ...mapLoginActions(['getCheck']),
    ...mapLoginMutions(['setToken']),
    //生成随机数 获取验证码
    getCheckImg: _.debounce(function () {
      var chars = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
      var nums = ''
      for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61)
        nums += chars[id]
      }
      this.checkNumber = nums
      this.getCheck(this.checkNumber)
    }, 200),

    // 登录按钮
    btnLogin() {
      // 登录接口所需的载荷
      const loginInfo = {
        ...this.$md5(this.loginForm),
        loginType: 0,
        clientToken: this.checkNumber
      }
      // 校验表单
      this.$refs.loginForm.validate(async (valida) => {
        if (!valida) return
        const res = await login(loginInfo)
        console.log(res)
        // 登录响应信息提示
        if (res.data.msg === '登录成功') {
          console.log(1)
          await this.setToken(res.data)
          this.$router.push('/')
          return
        } else if (res.data.msg === '账户名或密码错误') {
          //如果因为账号或者密码输入错误，则重新刷新验证码
          this.getCheck(this.checkNumber)
        }
        this.promptMessage(res.data.msg)
      })
    },
    // 登录失败 具体消息提示
    promptMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    }
  },
  computed: {
    ...mapLoginState(['checkImg', 'message'])
  },
  watch: {},
  mounted() {},
  components: {}
}
</script>
<style scoped lang="less">
.check {
  position: relative;
  .number-img {
    position: absolute !important;
    width: 130px !important;
    height: 50px !important;
    top: 0px !important;
    left: 82% !important;
    margin-left: -48px !important;
  }
}
.login {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: red;
  background-image: url('../../assets/images/bgc.png');
  background-repeat: no-repeat;
  background-size: cover;
  .login-container {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    img {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
  }
}
.btn-login {
  width: 100%;
  height: 52px;
  background: linear-gradient(262deg, #2e50e1, #6878f0);
  opacity: 0.91;
  border-radius: 8px;
  color: #fff;
  text-shadow: 0 7px 22px #cfcfcf;
}
/deep/ .el-input {
  .el-input__inner {
    height: 50px;
    padding: 12px 32px;
  }
  .el-input__icon {
    font-size: 20px !important;
  }
}
</style>
