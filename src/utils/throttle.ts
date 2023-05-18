/**
 * @description  throttle 节流函数
 * @param {function} fn 需要节流的函数
 * @param {number} delay 间隔时间(默认500ms)
 * @param {boolean} immediate 是否默认执行一次(第一次不触发节流)
 * @returns 节流后的函数
 */
export function throttle<T, R>(fn: (...args: T[]) => R, delay: number = 500, immediate: boolean = false) {
	let timer: NodeJS.Timeout | null = null;
	let stop: boolean = false;
	let death: boolean = false;
	let flag: boolean = true;
	function _throttle(...args: T[]) {
		console.log(stop, death, death);
		if (death) {
			fn(...args);
			return;
		}
		if (stop) {
			fn(...args);
			return;
		}
		if (immediate) {
			fn(...args);
			immediate = false;
			return;
		}
		if (!flag) {
			return;
		}
		flag = false;
		timer = setTimeout(() => {
			fn(...args);
			flag = true;
		}, delay);
	}
	// 销毁
	function destroy() {
		death = true;
		stop = true;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	// 开启
	function open() {
		stop = false;
		death = false;
	}
	// 关闭
	function close() {
		stop = true;
	}
	_throttle.destroy = destroy;
	_throttle.open = open;
	_throttle.close = close;
	return _throttle;
}
