import { MenuStore } from "@/store/modules/menu";
import { isType } from "@/utils/utilsFn";
import router from "@/routers/index";
import { notFoundRouter } from "./staticRouter";
import { GlobalStore } from "@/store";
import { RouteRecordRaw } from "vue-router";

//  导入views 所有文件
const modules = import.meta.glob("@/views/**/*.vue");
export const initDynamicRouters = async () => {
  const globalStore = GlobalStore();
  const menuStore = MenuStore();
  try {
    // 获取列表
    await menuStore.setMenuList();
    // 添加动态路由
    menuStore.flatDataMenuList.forEach(item => {
      item.children && delete item.children;
      if (item.component && isType(item.component) == "string") {
        item.component = modules["/src/views" + item.component + ".vue"];
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute("layout", item as unknown as RouteRecordRaw);
      }
    });
    // 添加错误路由
    router.addRoute(notFoundRouter);
  } catch (e) {
    globalStore.resetInit();
    router.replace("/login");
    return Promise.reject(e);
  }
};
