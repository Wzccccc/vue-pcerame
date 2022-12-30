// 静态路由
import { RouteRecordRaw } from "vue-router";

// 登陆页 首页
export const staticRouters: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: { name: "home" }
	},
	{
		path: "",
		name: "home",
		component: () => import("@/views/home/index.vue"),
		meta: { title: "首页" }
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: { title: "登录" }
	}
];

// 错误页
export const errorRouters = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/errorCom/403.vue"),
		meta: { title: "403页面" }
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/errorCom/404.vue"),
		meta: { title: "404页面" }
	}
];

// 其他
export const notFoundRouter = [
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		redirect: { name: "404" }
	}
];
