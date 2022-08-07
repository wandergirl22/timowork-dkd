<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="" />
    </div>

    <div class="right-menu">
      <el-row>
        <el-col :span="5">
          <div>
            <img
              src="../../assets/images/touxiang.png"
              class="user-avatar"
            /></div
        ></el-col>
        <el-col :span="13"
          ><div>欢迎你，{{ userInfo.userName }}</div></el-col
        >
        <el-col :span="4"><div  @click="logout" >退出</div> </el-col>
        <el-col :span="1">
          <div><i class="el-icon-caret-bottom" /></div
        ></el-col>
      </el-row>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { createNamespacedHelpers } from "vuex";
const { mapState: mapLoginState } = createNamespacedHelpers("login");
export default {
  data() {
    return {
      defaultImg:
        "https://pyy-1313117903.cos.ap-guangzhou.myqcloud.com/pig1.png",
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    ...mapLoginState(["userInfo"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$store.dispatch("login/logout");
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 60px;
  margin-left: -210px;
  overflow: hidden;
  position: relative;
  background-image: url("../../assets/images/navbar.png");
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .logo {
    img {
      margin: 9px 0px 0px 15px;
      width: 88px;
      height: 36px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    color: #fff;
    width: 240px;
    height: 60px;
    float: right;
    line-height: 60px;
    img {
      margin-top: 10px;
      line-height: 60px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
