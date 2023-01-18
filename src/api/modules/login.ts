import request from "@/api";
import { Login } from "../interface";
import { ResponseData } from "../interface";
import menuList from "@/config/menuList.json";

/**
 * @name 登录模块
 */

// 登录
export const loginApi = (params: Login.LoginForm) => {
	return request.post<Login.ResLogin>("/geeker/login", params);
};

// 获取路由/菜单权限
// 此处存在一个问题，如果是登录时调用的话，无法保证权限路由/角色对应菜单的实时性
export const menuListApi = (params: boolean): Promise<ResponseData> => {
	// return request.get<Menu.MenuOptions[]>(`/geeker/menu/list`);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (params) {
				resolve(menuList);
			} else {
				resolve(menuList);
			}
		}, 500);
	});
};

// 退出登录
// * 用户退出登录
export const logoutApi = () => {
	return request.post("geeker/logout");
};
