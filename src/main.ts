import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.scss";
// 引入 iconSvg 为全局组件
import "@/assets/iconfont/icon.js";
import SvgIcon from "@/components/SvgIcon/index.vue";

import router from "./routers";
import pinia from "@/store/index";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

const app = createApp(App);
// 注册 icons
for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component);
}
app.component("SvgIcon", SvgIcon);
app.use(ElementPlus).use(router).use(pinia).mount("#app");
