import axios from "axios";

// initial state
const state = () => ({
   isAuth: false,
   token: ""
});

// getters
const getters = {
    isAuth(state) {
        return state.isAuth;
    },
    getToken(state) {
      return state.token;
    }
};

// actions
const actions = {
   login({ commit }, input) {
    return new Promise((resolve, reject) => {
        const data = {
          email: input.get("email"),
          password: input.get("password")
        }
        const config = {
          headers:{
            "Accept": "application/json",
          }
        };
        axios.post('/api/login',data,config)
          .then(response => {
            commit("setAuth", true);
            commit("setToken", response.data.data.token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
     });
   },
   logout({ commit }) {
        commit("setAuth", false);
        commit("setToken", "");  
     },

};

// mutations
const mutations = {
    setAuth(state, payload) {
        state.isAuth = payload;
    },
    setToken(state, token) {
      state.token = token;
    }
};

export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations,
};
