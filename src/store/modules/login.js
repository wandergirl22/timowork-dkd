import { checkInfo, getUserInfo } from "@/api/index";
export default {
  namespaced: true,
  state: {
    checkImg: "",
    userInfo: {},
    token: "",
  },
  mutations: {
    getCheck(state, payload) {
      state.checkImg = payload;
    },
    setToken(state, payload) {
      state.token = payload.token;
      state.userInfo = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = { ...state.userInfo, ...payload };
    },
  },

  actions: {
    // 获取验证码
    async getCheck(context, payload) {
      const res = await checkInfo(payload);
      console.log(res);
      const imgUrl =
        "data:image/png;base64," +
        btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
      context.commit("getCheck", imgUrl);
    },
    async getUserInfo(context, payload) {
      const res = await getUserInfo(payload);
      console.log(res);
      context.commit("setUserInfo", res);
    },
    logout(context) {
      context.commit("getToken", "");
      context.commit("setToken", {});
    },
  },
};
