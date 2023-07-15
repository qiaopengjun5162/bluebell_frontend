import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";
import { useTokenStore } from "../store"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
    },
    {
        path: '/post/:id',
        name: 'Content',
        component: () => import('../views/Content.vue')
    },
    {
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/Publish.vue'),
        meta: { requireAuth: true }
    },
]

// 路由对象实例化
const router = createRouter({
    // history, 指定路由的模式
    history: createWebHashHistory(),
    // 路由列表
    routes // 路由配置
});

// 客户端权限验证写在路由守卫里面
// 服务端的验证，分2块，1块在客户端的axios附带token，另一块在api服务端的视图中调用permission
router.beforeEach((to, from, next) => {
    console.log(to, "to");
    console.log(from, "from");

    if (to.matched.some((r) => r.meta?.requireAuth)) {
        const store = useTokenStore()
        if (!store.token.token) {
            next({ name: "Login", query: { redirect: to.fullPath } })
            return
        }
    }

    next()
})

export const initRouter = (app: App<Element>) => {
    app.use(router);
}

// 一个文件中默认导出只能写一个，名字可以不用对应。具体名字的导出可以有很多个。
// export default router;
