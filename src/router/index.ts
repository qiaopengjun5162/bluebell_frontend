import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
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

const router = createRouter({
    history: createWebHashHistory(),
    routes // 路由配置
});

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (localStorage.getItem("loginResult")) { //判断本地是否存在access_token
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next({
                    path: '/login'
                })
            }
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == "/login") {
        if (localStorage.getItem("loginResult")) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
})

export const initRouter = (app: App<Element>) => {
    app.use(router);
}

// 一个文件中默认导出只能写一个，名字可以不用对应。具体名字的导出可以有很多个。
// export default router;
