import { createStore } from 'vuex'
// import auth from './auth/index'
import auth from "./modules/auth";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()],
})