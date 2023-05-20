// vite_env 默认为字符串,转换类型
export function convertEnvType(envConfig: Recordable): ViteEnv {
	// type realEnvType = optionalType<ViteEnv>;
	let realEnv: any = { ...envConfig };
	for (const key of Object.keys(envConfig)) {
		key === "VITE_APP_PORT" && (realEnv[key] = Number(realEnv[key]));
		["VITE_APP_PROXY", "VITE_APP_REPORT", "VITE_APP_DROP_CONSOLE", "VITE_APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE"].includes(key) &&
			(realEnv[key] = realEnv[key] === "true" ? true : realEnv[key] === "false" ? false : realEnv[key]);
	}
	console.log(realEnv);
	return realEnv;
}
