import { createApp } from "vue";
import App from "./App.vue";

// import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";

// 引入 iconSvg 为全局组件
// import "@/assets/iconfont/icon.js";
import SvgIcon from "@/components/SvgIcon/index.vue";

// 引入指令
import directives from "@/directives/index";
// 路由
import router from "./routers";
// i18n
import I18n from "@/language/index";
// pinia
import pinia from "@/store/index";

// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom  dark(自定义暗黑模式)
import "@/styles/theme/dark.scss";
// elementui 样式
import "@/styles/element.scss";
// iconfont
import "@/assets/iconfont/iconfont.scss";
// 公共样式
import "@/styles/common.scss";
// 初始样式
import "@/styles/reset.scss";

const app = createApp(App);
// 注册 icons
for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component);
}
app.component("SvgIcon", SvgIcon);
app.use(router).use(I18n).use(pinia).use(directives).mount("#app");
