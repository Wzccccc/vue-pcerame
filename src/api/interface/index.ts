// * 请求响应参数
export interface ResponseData<T = any> {
	code: string | number;
	msg: string;
	data?: T;
}

// * 登录模块
export namespace Login {
	export interface LoginForm {
		username: string;
		password: string;
		verificationCode: string
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface LoginApi {
		username: string;
		password: string;
	}
}
