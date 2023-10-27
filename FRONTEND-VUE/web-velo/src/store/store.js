import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    login(state, access, refresh) {
      state.isAuthenticated = true;
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userAccessToken: (state) => state.accessToken,
    userRefreshToken: (state) => state.refreshToken,

  },
  actions: {
    // Add an action to handle logout
    logout({ commit }) {
      // You can perform any necessary cleanup here
      commit('logout');
    },
  },
});

export default store;
