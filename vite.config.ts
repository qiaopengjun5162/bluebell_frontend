import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc,
        },
    },
    plugins: [
        vue(),
        AutoImport({
            // global imports to register
            imports: [
                // presets
                "vue",
                "vue-router",
            ], // 自动导入 vue 相关函数，如 ref reactive toRef 等
            resolvers: [
                ElementPlusResolver(),
                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    // prefix: 'Icon',
                })
            ],
            eslintrc: {
                enabled: true
            }, // eslint 会报 no-undef 错误，添加此项会生成 .eslintrc-auto-import.json
            dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                ElementPlusResolver()
            ],
            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),
        Icons({
            autoInstall: true,
        }),

        Inspect(),
    ],
    server: {
        port: 8080, // 客户端的运行端口，此处也可以绑定vue运行的端口，当然也可以写在pycharm下
        host: "127.0.0.1", // 客户端的运行地址，此处也可以绑定vue运行的域名，当然也可以写在pycharm下
        // 跨域代理
        proxy: {
            "/api": {
                // 凡是遇到 /api 路径的请求，都映射到 target 属性  /api/header/  ---> http://127.0.0.1:8000/header/
                target: "http://127.0.0.1:8000/",
                changeOrigin: true,
                ws: true, // 是否支持websocket跨域
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
