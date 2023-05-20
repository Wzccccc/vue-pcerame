// vite_env 默认为字符串,转换类型
export function convertEnvType(envConfig: Recordable): ViteEnv {
	// type realEnvType = optionalType<ViteEnv>;
	let realEnv: any = { ...envConfig };
	for (const key of Object.keys(envConfig)) {
		key === "VITE_APP_PORT" && (realEnv[key] = Number(realEnv[key]));
		["VITE_APP_PROXY", "VITE_APP_REPORT"].includes(key) && (realEnv[key] = Boolean(realEnv[key]));
	}
	return realEnv;
}
