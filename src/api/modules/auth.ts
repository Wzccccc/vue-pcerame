import request from "@/api";
import { ResponseData } from "../interface/index";
// import { Auth } from "../interface/index";
import menuList from "@/config/menuList.json";

// 获取菜单/路由
export const menuListApi = (): Promise<ResponseData<Menu.MenuOptions[]>> => {
  return request.get<Menu.MenuOptions[]>(`/menu/list`);
  // 本地数据
  return Promise.resolve(menuList);
};
