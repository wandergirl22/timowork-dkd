import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import login from "./modules/login";
import createPersistedState from "vuex-persistedstate"; //数据持久化

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    app,
    settings,
    user,
    login,
  },
  getters,
  plugins: [createPersistedState()],
});

export default store;
