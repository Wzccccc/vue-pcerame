// * 请求枚举配置

/**
 * @description 请求配置
 */
export enum RequestEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401, // 超时状态码
	TIMEOUT = 30000 // 请求超时时间
}
