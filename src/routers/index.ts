import { createRouter, createWebHashHistory } from "vue-router";
import { GlobalStore } from "@/store";
import { staticRouters, errorRouters, notFoundRouter } from "@/routers/modules/staticRouter";

import { ROUTER_WHITE_LIST } from "@/config/config";

// 接口返回数据匹配动态路由表
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters, ...errorRouters, ...notFoundRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 前置路由守卫
 */
router.beforeEach((to, from, next) => {
	const globalStore = GlobalStore();

	// 动态设置当前页面title
	const title = import.meta.env.VITE_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - 后台模板(vue)` : title;

	// 登录页
	if (to.name === "login") {
		if (globalStore.token) return next(from.fullPath);
		// 没有 token 重置路由 清除面包屑/tab
		resetRouter();
		return next();
	}

	// 白名单页面 目前只有网络失败的 500 时跳转
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();

	// 其他页面
	if (!globalStore.token) return next({ name: "login", replace: true }); // replace 浏览器无法回退

	next();
});

/**
 * @description 重置路由
 */
const resetRouter = () => {
	// console.log(router);
	// TODO... 去除所有当前权限的所有路由 清除面包屑/tab
};

export default router;
