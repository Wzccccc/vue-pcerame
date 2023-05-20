import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path"; // 配置别名
import { convertEnvType } from "./build/getEnv";
import { createPlugins } from "./build/getPlugins";
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = convertEnvType(env);
	return {
		base: viteEnv.VITE_APP_PUBLIC_PATH,
		plugins: createPlugins(viteEnv),
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
				}
			}
		}
	};
});
