// debounce 防抖
export class Debounce {
	/**
	 * @description debounce 防抖函数
	 * @param fn 需要防抖的函数
	 * @param delay 延迟时间
	 * @param immediate 是否立即执行
	 * @param timer 计时器
	 * @returns 处理过的函数
	 */
	private timer: any;
	constructor(timer: any = null) {
		this.timer = timer;
	}
	public use = (fn: Function, delay: number = 500, immediate: boolean = true): Function => {
		return (...args: any[]) => {
			if (immediate) {
				fn.apply(this, args);
				immediate = false;
				return;
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				fn.apply(this, args);
			}, delay);
		};
	};
	// 取消 当前防抖函数执行
	public cancel() {
		clearTimeout(this.timer);
		this.timer = null;
	}
}

// 节流

// 判断数据类型
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	let browserLang = navigator.language;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}
