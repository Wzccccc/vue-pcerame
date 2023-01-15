import { createRouter, createWebHashHistory } from "vue-router";
import { GlobalStore } from "@/store";
import { MenuStore } from "@/store/modules/menu";
import { staticRouters, errorRouters } from "@/routers/modules/staticRouter";
import { initDynamicRouters } from "./modules/dynamicRouter";

import { ROUTER_WHITE_LIST } from "@/config/config";

// 接口返回数据匹配动态路由表
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters, ...errorRouters],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 前置路由守卫
 */
router.beforeEach(async (to, from, next) => {
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

	// 防止登录时路由未获取到菜单，需要重新添加动态路由
	const menuStore = MenuStore();
	if (!menuStore.dataMneuList.length) {
		await initDynamicRouters();
		return next({ ...to, replace: true });
	}

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
