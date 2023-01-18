import { defineStore } from "pinia";
import { MenuState } from "../interface";
import { flatMenu } from "@/utils/flatMenu";
import { menuListApi } from "@/api/modules/login";

// 当前用户菜单
export const MenuStore = defineStore("MenuStore", {
	state: (): MenuState => ({
		authMenuList: []
	}),
	getters: {
		// 返回的初始菜单
		dataMneuList: state => state.authMenuList,
		// 扁平化菜单，做路由使用
		flatDataMneuList: state => flatMenu(state.authMenuList)
	},
	actions: {
		async setMenuList() {
			const { data } = await menuListApi(true);
			this.authMenuList = data;
		}
	}
});
