import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.scss";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./routers";

console.log(import.meta.env);
console.log(import.meta.env.VITE_APP_PORT);
console.log(Number(import.meta.env.VITE_APP_PORT));

createApp(App).use(ElementPlus).use(router).mount("#app");
