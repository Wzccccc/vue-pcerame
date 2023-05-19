import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path"; // 配置别名 如报错需要安装 @types/node
import { createHtmlPlugin } from "vite-plugin-html"; // 可在 index.html 中使用环境变量
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 可在 setup 上自定义name

import { convertEnvType } from "./build/getEnv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = convertEnvType(env);
	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		plugins: [
			vue(),
			VueSetupExtend(),
			viteCompression(),
			createHtmlPlugin({
				inject: {
					data: {
						//将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
						title: viteEnv.VITE_APP_TITLE
					}
				}
			})
		],
		// ↓解析配置
		resolve: {
			// ↓路径别名
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_APP_PORT,
			open: true,
			cors: true,
			proxy: {
				"/api": {
					target: "https://mock.mengxuegu.com/mock/6409955a4689d550adbe07bf/pcerame",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
					// pathRewrite: {
					// 	"^/api": ""
					// }
				}
			}
		},
		define: {
			"process.env": process.env
		}
	};
});
