import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 15000
});

// 拦截器
instance.interceptors.request.use(config => {
    let token = Cookies.get('tokne');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token;
    }
    return config;
}, err => {
    return Promise.reject(err);
})

instance.interceptors.response.use(result => {
    return result.data;
}, err => {
    return Promise.reject(err);
})

export default instance;
