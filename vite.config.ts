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
		},
		build: {
			target: "es2020",
			// minify: "terser", // 混淆器
			// rollup 配置
			rollupOptions: {
				output: {
					chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
					entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
					assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return "vendor";
						}
					}
				},
				//  告诉打包工具 在external配置的 都是外部依赖项  不需要打包,例如使用了 CDN 等
				external: []
			},
			terserOptions: {
				compress: {
					// 生产环境时移除console
					drop_console: viteEnv.VITE_APP_DROP_DEBUG,
					drop_debugger: viteEnv.VITE_APP_DROP_CONSOLE
				}
			}
		}
	};
});
