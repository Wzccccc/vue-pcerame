import request from "@/api";
import { Login } from "../interface";
export const loginApi = (params: Login.LoginForm) => {
	return request.post<Login.ResLogin>("/geeker" + `/login`, params);
};
