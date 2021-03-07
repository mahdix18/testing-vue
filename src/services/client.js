import axios from "axios";
import LocalStorageService from "./localstorageservice";
import router from "../router";

// LocalstorageService
const localStorageService = LocalStorageService.getService();
//axios.defaults.baseURL = "http://localhost:8010/proxy"; // by bass cors 
axios.defaults.baseURL = "https://staging.soundfit.app/backoffice/api";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Current-Build'] = "ios_1";
        config.headers['Content-Language'] = "it";
        config.headers['deviceId'] = "deviceId_5";

        return config;
    },
    error => {
        Promise.reject(error)
    });



let client = {
    router: router,
    storage: localStorageService,
    login: (email, password) => {
        return axios.post("/auth/login", {
            "email": email,
            "password": password
        })
    }
    ,
    signUp: (user) => {
        return axios.post("/auth/signup", {
            "email": user.email,
            "country": user.country,
            "address": user.address,
            "password": user.password,
            "password_confirmation": user.password_confirmation
        })


    },
    updateAvatar(base64) {

        return axios.post("/user/avatar", {
            "avatar": base64
        })

    }

}
export default client;
