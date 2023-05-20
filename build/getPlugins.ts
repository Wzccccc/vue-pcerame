import vue from "@vitejs/plugin-vue";
import { type PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html"; // 可在 index.html 中使用环境变量
import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 可在 setup 上自定义name
import AutoImport from "unplugin-auto-import/vite"; // Element 自动导入插件
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { visualizer } from "rollup-plugin-visualizer"; // 打包预览
import viteImagemin from "vite-plugin-imagemin"; // 图片压缩

/**
 * @description 创建插件
 * @param viteEnv
 * @returns (PluginOption | PluginOption[])[]
 */
export const createPlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	return [
		vue(),
		// name 可以写在 script 标签上
		VueSetupExtend(),
		// 注入变量到 html 文件
		createHtmlPlugin({
			inject: {
				data: { title: viteEnv.VITE_APP_TITLE }
			}
		}),
		// Element 自动导入
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		// 图片压缩
		viteImagemin({
			gifsicle: { optimizationLevel: 7, interlaced: false },
			optipng: { optimizationLevel: 7 },
			mozjpeg: { quality: 20 },
			pngquant: { quality: [0.8, 0.9], speed: 4 },
			svgo: { plugins: [{ name: "removeViewBox" }, { name: "removeEmptyAttrs", active: false }] }
		}),
		// 预览分析打包
		viteEnv.VITE_APP_REPORT &&
			(visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true, open: true }) as PluginOption)
	];
};
