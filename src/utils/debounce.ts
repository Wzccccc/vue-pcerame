// 防抖(ts)
export class Debounce {
	/**
	 * @param func 需要包装的函数
	 * @param delay 延迟时间，单位ms
	 * @param immediate 是否默认执行一次(第一次不延迟)
	 * @param cancel 是否中断和函数执行
	 */
	timer: null | NodeJS.Timeout = null;
	constructor(timer = null) {
		this.timer = timer;
	}
	public use = (func: Function, delay: number, immediate: boolean = false, cancel: boolean = false): Function => {
		return (...args: any) => {
			if (cancel) {
				if (!this.timer) return;
				clearTimeout(Number(this.timer));
				this.timer = null;
			} else {
				if (immediate) {
					func.apply(this, args);
					immediate = false;
					return;
				}
				clearTimeout(Number(this.timer));
				this.timer = null;
				this.timer = setTimeout(() => {
					func.apply(this, args);
				}, delay);
			}
		};
	};
}
