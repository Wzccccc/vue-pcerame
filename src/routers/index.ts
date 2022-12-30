import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouters, errorRouters, notFoundRouter } from "@/routers/modules/staticRouter";

// 可根据后端字典匹配路由表 或者 权限路由皆由后端返回

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters, ...errorRouters, ...notFoundRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
