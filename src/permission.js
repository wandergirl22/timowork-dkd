import router from "@/router";
import store from "@/store";
const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  const token = store.state.login.token;
  if (token) {
    if (store.state.login.userInfo.userId) {
      console.log(1);
      store.dispatch("login/getUserInfo", store.state.login.userInfo.userId);
    }
    // 登录
    // 是否进入登录页
    if (to.path !== "/login") {
      // 是 跑到首页
      next();
    } else {
      // 不是 直接进入
      next("/");
    }
  } else {
    // 未登录
    // 访问 的是在白名单（未登录也能访问的页面）
    const isCludes = whiteList.includes(to.path);
    if (isCludes) {
      // 在白名单 放行
      next();
    } else {
      // 不在白名单 （不登录也不访问） 跳到登录页
      next("/login");
    }
  }
});
