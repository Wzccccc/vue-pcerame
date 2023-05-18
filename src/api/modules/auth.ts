import request from "@/api";
// import { Auth } from "../interface/index";
// import menuList from "@/config/menuList.json";

// 获取菜单/路由
export const menuListApi = () => {
	return request.get<Menu.MenuOptions[]>(`/menu/list`);
	// 本地数据
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if (params) {
	// 			resolve(menuList);
	// 		} else {
	// 			resolve(menuList);
	// 		}
	// 	}, 500);
	// });
};
