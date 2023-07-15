import { defineStore } from "pinia"
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie'

// https://pinia.vuejs.org/zh/core-concepts/
// 在 Setup Store 中：
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions
interface Token {
    token: string;
    user_id: string
    user_name: string
}

export const useTokenStore = defineStore('tokenstore', () => {
    // ref 相当于 state
    const tokenJson = ref("")
    // computed 相当于 getters
    const token = computed<Token>(() => {
        try {
            return JSON.parse((tokenJson.value || window.localStorage.getItem("loginResult")) ?? "{}")
        } catch (err) {
            ElMessage.error("json字符串格式不对,转化对象时失败..")
            localStorage.setItem("loginResult", " ")
            throw err
        }
    })
    // function 相当于 actions
    function saveToken(data: string) {
        tokenJson.value = data
        window.localStorage.setItem("loginResult", data)
        // 先存储 token
        // js-cookie
        Cookies.set('token', data, { expires: 7 });
        // localStorage.setItem("loginResult", JSON.stringify(res.data));
        sessionStorage.setItem("loginResult", JSON.stringify(data));
    }

    // 向外暴露
    return { token, saveToken }
})
