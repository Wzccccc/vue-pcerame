import { MenuStore } from "@/store/modules/menu";
import { isType } from "@/utils/utilsFn";
import router from "@/routers/index";
import { notFoundRouter } from "./staticRouter";
import { GlobalStore } from "@/store";

//  导入views 所有文件
const modules = import.meta.glob("@/views/**/*.vue");

export const initDynamicRouters = async () => {
	const globalStore = GlobalStore();
	const menuStore = MenuStore();
	try {
		// 获取列表
		await menuStore.setMenuList();
		// 添加动态路由
		menuStore.flatDataMneuList.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = modules["/src/views" + item.component + ".vue"];
			}
			router.addRoute(item);
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				// router.addRoute("layout", item);
				router.addRoute({
					name: "layout",
					path: "/layout",
					component: () => import("@/layouts/index.vue"),
					children: [item]
				});
			}
		});
		// 添加错误路由
		router.addRoute(notFoundRouter);
		// console.log(router.options);
	} catch (e) {
		globalStore.setToken("");
		router.replace("/login");
		return Promise.reject(e);
	}
};
