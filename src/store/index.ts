import { createPinia, defineStore } from "pinia";
import { GlobalState, systemConfigOptions } from "./interface";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 持久化

export const GlobalStore = defineStore("GlobalState", {
	state: (): GlobalState => ({
		token: "",
		userName: "",
		language: "",
		isFollowSystem: true, //是否开启跟随系统主题
		systemConfig: {
			isCollapse: false,
			isDark: false
		}
	}),
	getters: {},
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserName(name: string) {
			this.userName = name;
		},
		setLanguage(language: string) {
			this.language = language;
		},
		setIsFllowSystem(val: boolean) {
			this.isFollowSystem = val;
		},
		setCollapse(val: boolean) {
			this.systemConfig.isCollapse = val;
		},
		setTheme(val: boolean) {
			this.systemConfig.isDark = val;
		}
	},
	persist: {
		key: "GlobalState", // 持久化存入的key
		storage: localStorage // 持久化方式
	}
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
