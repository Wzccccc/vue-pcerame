import request from "@/api";
import { Login } from "../interface";

/**
 * @name 登录模块
 */

// 登录
export const loginApi = (params: Login.LoginApi) => {
  return request.post<Login.ResLogin>("/login", params);
};

// 退出登录
// * 用户退出登录
export const logoutApi = () => {
  return request.post("/logout");
};
