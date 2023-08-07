import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const config = require('../config.json')
const env = process.env.VUE_APP_API_URL;
axios.defaults.baseURL = config[env].baseurl;

// console.log("URL=============>", config[env].baseurl)
// console.log("auth=============>", store.getters["auth/isAuth"])

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !store.getters["auth/isAuth"]) {
        return {
            path: "/",
        };
    }
});

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
