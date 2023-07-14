<script setup lang="ts">
import { signApi } from "../request/api"

const state = reactive({
    ruleForm: {
        username: '',
        password: '',
        re_password: '',
    }
});

let { ruleForm } = toRefs(state);

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
    password: [{ validator: validatePwd, trigger: 'blur' }],
    re_password: [{ validator: validatePwd, trigger: 'blur' }],
})

// 获取 el-form 组件对象
let ruleFormRef = ref();

// 点击
const signFn = () => {
    ruleFormRef.value.validate().then(() => {
        console.log('校验通过 login');
        signApi({
            "username": ruleForm.value.username,
            "password": ruleForm.value.password,
            "re_password": ruleForm.value.re_password
        }).then(res => {
            if (res.code === 1000) {
                console.log('signup success');
                localStorage.setItem("loginResult", JSON.stringify(res.data));
                sessionStorage.setItem("loginResult", JSON.stringify(res.data));
            } else {
                console.log(res.msg)
            }
        })
    }).catch((error: Error) => {
        console.log('校验不通过 sign', error);
    });
}
</script>

<template>
    <div class="main">
        <div class="container">
            <h2 class="form-title">注册</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                <el-form-item class="form-group">
                    <label for="name">用户名</label>
                    <el-input type="text" class="form-control1" name="name" id="name" placeholder="用户名"
                        v-model="ruleForm.username" size="large" />
                </el-form-item>
                <el-form-item class="form-group">
                    <label for="pass">密码</label>
                    <el-input type="password" class="form-control1" name="pass" id="pass" placeholder="密码"
                        v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item class="form-group">
                    <label for="re_pass">确认密码</label>
                    <el-input type="password" class="form-control1" name="re_pass" id="re_pass" placeholder="确认密码"
                        v-model="ruleForm.re_password" />
                </el-form-item>
                <el-form-item class="form-btn">
                    <el-button type="primary" class="btn btn-info" @click="signFn()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    background: #f8f8f8;
    padding: 150px 0;

    .container {
        width: 400px;
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
                margin-bottom: 10;
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
