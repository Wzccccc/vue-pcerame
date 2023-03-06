import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ElMessage } from "element-plus";

import { ResponseData } from "./interface";
import { RequestEnum } from "@/enum/requestEnum";
import { checkStatus } from "@/api/checkStatus";
import { GlobalStore } from "@/store";
import router from "@/routers";

// 配置 config 对象
const config = {
	baseURL: import.meta.env.VITE_APP_BASE_URL, // 默认路径
	timeout: 5000, // 超时时间
	withCredentials: true // 跨域时允许带凭证
	// 其他配置查看  http://axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE
};

// 封装 axios 请求类
class Request {
	service: AxiosInstance; // 创建 axios 实例
	public constructor(config: AxiosRequestConfig) {
		// public 公有属性（默认）
		this.service = axios.create(config); // 实例化 axios
		// * 请求拦截器
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const globalStore = GlobalStore();
				const token: string = globalStore.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		// * 响应拦截器
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const globalStore = GlobalStore();
				const { data } = response;
				// token 过期失效
				if (data.code == RequestEnum.OVERDUE) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace("/login");
					return Promise.reject(data);
				}

				// 	全局错误拦截
				if (data.code && data.code !== RequestEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			(error: AxiosError) => {
				// 超时 || 网络错误无 response
				const { response } = error;
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
				// 根据状态码提示
				if (response) checkStatus(response.status);
				// 无网络
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}

	// 配置常用请求方式
	get<T>(url: string, params?: object, _object = {}): Promise<ResponseData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResponseData<T>> {
		return this.service.post(url, params, _object);
	}
}

export default new Request(config);
