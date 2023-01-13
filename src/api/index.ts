import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { ResponseData } from "./interface";
import { RequestEnum } from "@/enum/requestEnum";

import { ElMessage } from "element-plus";

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
				/**
				 * TODO ...
				 * 1. 将 当前请求存入 pending 中
				 * 2. 当前请求是否需要 loading 可在 接口中 {headers:{noLoading:true}} 配置
				 * 3. 从 pinia 中 取 token
				 * 4. 将 token 随接口一并发送
				 */
				// console.log(config);
				return { ...config, headers: { ...config.headers, "x-access-token": "" } };
			},
			(error: AxiosError) => {
				console.log(error);
				return Promise.reject(error);
			}
		);

		// * 响应拦截器
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				/**
				 * TODO...
				 * 1. 处理登陆失效情况（清除 token ，重定向到登陆页）
				 */
				// 	全局错误拦截
				if (data.code && data.code !== RequestEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				return data;
			},
			(error: AxiosError) => {
				const { response } = error;
				/**
				 * TODO...
				 * 1. 判断接口超时情况
				 * 2. 根据错误状态码提示 单独封装函数
				 * 3. 断网情况 !window.navigator.online 跳转到 500 断网页面
				 */
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
