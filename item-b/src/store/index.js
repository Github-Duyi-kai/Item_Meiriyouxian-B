import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookies, getUserCookies, removeUserCookies } from '@/utils/useUserCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userInfo: {
      appkey: getUserCookies('appkey'),
      email: getUserCookies('email'),
      role: getUserCookies('role'),
      username: getUserCookies('username'),
    },
    userInfoLi: true, // 这个控制页面右上角的li标签是否显示
    welcome: false, // 控制右上角页面显示未登录还是欢迎
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    logOut(state) {
      Object.entries(state.userInfo).forEach((item) => {
        item[1] = '';
      });
      state.userInfoLi = false; // 为false，就是不显示右上角哪些li标签
      state.welcome = true; // 为true，就是要显示未登录
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    changeUserInfo({ commit }, userInfo) {
      commit('changeUserInfo', userInfo);
      setUserCookies(userInfo);
    },
    logOut({ commit }) {
      commit('logOut');
      removeUserCookies();
    },
  },
  modules: {},
});
