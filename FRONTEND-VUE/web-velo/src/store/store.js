import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    userToken: null,
  },
  mutations: {
    login(state, token) {
      state.isAuthenticated = true;
      state.userToken = token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userToken = null;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    userToken: (state) => state.userToken,
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
