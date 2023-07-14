import request from './request'

interface LoginDataInterface {
    username: string
    password: string
}

type PromiseRes = Promise<ManageResult>

interface ManageResult {
    code: number;
    msg: string;
    data: string;
}

// 登录返回token
// data 类型可以定义为 类型别名 或 接口类型
// 接口名可以重复，类型别名不能重复
// 类型别名可以用交叉类型和联合类型
export const loginApi = (data: LoginDataInterface): PromiseRes => request.post('/api/login', data);

interface SignDataInterface {
    username: string
    password: string
    re_password: string
}

// 注册
export const signApi = (data: SignDataInterface): PromiseRes => request.post('/api/signup', data);
