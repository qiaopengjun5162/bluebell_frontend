import { createApp } from "vue"
import App from "./App.vue"
// import router from "./router" // 不用花括号表示默认导出 {}
import { initRouter } from "./router"; 

// createApp(App).use(router).mount('#app')

const app = createApp(App)
// app.use(router);
// 初始化路由 其它文件不可用路由
initRouter(app);
app.mount("#app");
