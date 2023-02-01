// 静态路由
import { RouteRecordRaw } from "vue-router";

// 登陆页 首页
export const staticRouters: RouteRecordRaw[] = [
	{
		path: "",
		redirect: "/home"
	},
	// {
	// 	path: "/home",
	// 	name: "home",
	// 	component: () => import("@/views/home/index.vue"),
	// 	meta: { title: "首页" }
	// },
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
		component: () => import("@/components/ErrorCom/403.vue"),
		meta: { title: "403" }
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorCom/404.vue"),
		meta: { title: "404" }
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorCom/500.vue"),
		meta: { title: "500" }
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layouts/index.vue"),
		redirect: "/home",
		children: []
	}
];

// 错误路由
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "NotFound",
	redirect: { name: "404" }
};
