import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouters, errorRouters, notFoundRouter } from "@/routers/modules/staticRouter";

// 接口返回数据匹配动态路由表
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouters, ...errorRouters, ...notFoundRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});
router.beforeEach((to, from, next) => {
	console.log(to);
	// 设置 title
	const title = import.meta.env.VITE_APP_TITLE;
	document.title = to.meta.title ? to.meta.title : title;

	// 判断是否为登陆页 如果有 token 留在此页面，否则跳转到的登陆页
	if (to.name === "login") {
		return next();
	}
	next();
});

export default router;
