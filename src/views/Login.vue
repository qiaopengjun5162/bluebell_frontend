<template>
    <div class="main">
        <div class="container">
            <h2 class="form-title">登录</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                <el-form-item class="form-group" prop="username">
                    <label for="name">用户名</label>
                    <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item class="form-group" prop="pwd">
                    <label for="pass">密码</label>
                    <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item class="form-btn">
                    <el-button type="primary" class="btn btn-info" @click="loginFn()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { loginApi } from "../request/api"
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus';
import { useTokenStore } from "../store"

const store = useTokenStore()
const router = useRouter()
// 定义是否登录加载中
const isLoading = ref(false)

const state = reactive({
    ruleForm: {
        username: 'lixia',
        pwd: '123',
    }
});

let { ruleForm } = toRefs(state);
// 获取 el-form 组件对象
let ruleFormRef = ref();

const validatePwd = (_rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
    if (!value) {
        callback('密码不能为空！');
    } else {
        callback();
    }
}

// 校验规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空！', trigger: 'blur' },
    ],
    pwd: [{ validator: validatePwd, trigger: 'blur' }],
})


// 点击登录按钮触发
const loginFn = () => {
    isLoading.value = true
    ruleFormRef.value?.validate().then(() => {
        console.log('校验通过 login');
        loginApi({
            "username": ruleForm.value.username,
            "password": ruleForm.value.pwd
        }).then(res => {
            if (res.code === 1000) {
                console.log('校验通过 登录成功');
                console.log(res.data)
                // 先存储 token
                // js-cookie
                Cookies.set('token', res.data, { expires: 7 });
                // localStorage.setItem("loginResult", JSON.stringify(res.data));
                sessionStorage.setItem("loginResult", JSON.stringify(res.data));
                // 保存token信息
                store.saveToken(res.data)

                isLoading.value = false

                ElMessage.success("登录成功")
                router.push("/")
            } else {
                console.log(res.msg)
                ElMessage.error('登录信息有误!')
                isLoading.value = false
                throw new Error("登录信息有误!")
            }
        })
    }).catch((error: Error) => {
        console.log('校验不通过 login', error);
        ElMessage.error("表单校验失败...")
        isLoading.value = false
        throw error
    });
}
</script>
<style lang="less" scoped>
.main {
    background: #f8f8f8;
    padding: 150px 0;

    .container {
        width: 600px;
        background: #fff;
        margin: 0 auto;
        max-width: 1200px;
        padding: 20px;

        .form-title {
            margin-bottom: 33px;
            text-align: center;
        }

        .form-group {
            margin: 15px;

            label {
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                font-weight: 700;
            }

            .form-control {
                display: block;
                width: 100%;
                height: 34px;
                padding: 6px 12px;
                font-size: 14px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
        }

        .form-btn {
            display: flex;
            justify-content: center;

            .btn {
                padding: 6px 20px;
                font-size: 18px;
                line-height: 1.3333333;
                border-radius: 6px;
                display: inline-block;
                margin-bottom: 0;
                font-weight: 400;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                -ms-touch-action: manipulation;
                touch-action: manipulation;
                cursor: pointer;
                border: 1px solid transparent;
            }

            .btn-info {
                color: #fff;
                background-color: #5bc0de;
                border-color: #46b8da;
            }
        }
    }
}
</style>
