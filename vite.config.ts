import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html"; // 可在 index.html 中使用环境比变量
import vue from "@vitejs/plugin-vue";

import { resolve } from "path"; // 配置别名 如报错需要安装 @types/node
import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 可在 setup 上自定义name

// https://vitejs.dev/config/
// ConfigEnv UserConfig ts 提示报错需要导入
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());

	return {
		base: "./",
		plugins: [
			vue(),
			VueSetupExtend(),
			createHtmlPlugin({
				inject: {
					data: {
						//将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
						title: env.VITE_APP_TITLE
					}
				}
			})
		],
		// ↓解析配置
		resolve: {
			// ↓路径别名
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		server: {
			host: "0.0.0.0",
			port: Number(env.VITE_APP_PORT),
			open: true,
			cors: true,
			proxy: {
				"/api": {
					target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
					// pathRewrite: {
					// 	"^/api": ""
					// }
				}
			}
		}
	};
});
