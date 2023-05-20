import { type PluginOption } from "vite";
import viteCompression from "vite-plugin-compression"; //文件压缩

/**
 * @description 打包配置
 * @param viteEnv
 * @returns (PluginOption | PluginOption[])[]
 */
export const createCompress = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	const { VITE_APP_BUILD_COMPRESS, VITE_APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
	const compressList = VITE_APP_BUILD_COMPRESS.split(",");
	const plugins: PluginOption[] = [];
	for (const law of compressList) {
		law === "gzip" &&
			plugins.push(
				viteCompression({
					verbose: true, // 是否在控制台中输出压缩结果
					disable: false,
					// threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
					algorithm: "gzip", // 压缩算法
					ext: ".gz",
					deleteOriginFile: VITE_APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE // 源文件压缩后是否删除
				})
			);
		law === "brotli" &&
			plugins.push(
				viteCompression({
					verbose: true, // 是否在控制台中输出压缩结果
					disable: false,
					// threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
					algorithm: "brotliCompress", // 压缩算法
					ext: ".br",
					deleteOriginFile: VITE_APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE // 源文件压缩后是否删除
				})
			);
	}
	return plugins;
};
