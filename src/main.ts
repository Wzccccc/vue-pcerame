import { createApp } from "vue";
import App from "./App.vue";
// 初始样式
import "@/styles/reset.scss";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom  dark(自定义暗黑模式)
import "@/styles/theme/dark.scss";
// 公共样式
import "@/styles/common.scss";
// elementui 样式
import "@/styles/element.scss";
// iconfont
import "@/assets/iconfont/iconfont.scss";
// 引入 iconSvg 为全局组件
// import "@/assets/iconfont/icon.js";
import SvgIcon from "@/components/SvgIcon/index.vue";
// 引入指令
import directives from "@/directives/index";
import router from "./routers";
// i18n
import I18n from "@/language/index";
import pinia from "@/store/index";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);

// 实验接入 sentry 监控
import * as Sentry from "@sentry/vue";
Sentry.init({
	app,
	dsn: "https://33a1553c90cc4bf8a0c3bc3a77efcfc2@o4505032704196608.ingest.sentry.io/4505032709636096",
	integrations: [
		new Sentry.BrowserTracing({
			routingInstrumentation: Sentry.vueRouterInstrumentation(router),
			tracePropagationTargets: ["http://zhicwang.com:8200", /^\//] // 线上地址
		})
	],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
	release: process.env.SENTRY_VERSION || "0.0.1" // 版本号，每次都pnpm build上传都修改版本号
	// initialScope: scope => {
	//   // 手动设置一些信息
	//   // 参考文档：https://docs.sentry.io/platforms/javascript/enriching-events/
	//   const userName = localStorage.getItem('userName')
	//   const token = localStorage.getItem('token')
	//   scope.setUser({
	//     username: userName,
	//   })
	//   scope.setContext('登录信息', {
	//     token: token,
	//   })
	//   return scope
	// },
});

// 注册 icons
for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component);
}

app.component("SvgIcon", SvgIcon);
app.use(router).use(I18n).use(pinia).use(directives).use(ElementPlus).mount("#app");
