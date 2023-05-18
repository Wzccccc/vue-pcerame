/**
 * @description  防抖函数
 * @param fn 节流的函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @param beginCallBack 开始时的回调函数
 * @param finishCallback 结束时的回调函数
 * @returns 节流过的函数(可取消执行防抖函数)
 */
export function debounce<T = any, R = any>(
	fn: (...args: T[]) => R,
	delay: number = 500,
	immediate: boolean = false,
	beginCallBack: Function = () => {},
	finishCallback: Function = () => {}
) {
	let timer: NodeJS.Timeout | null = null;
	let isInvoke = false;
	const _debounce = function (...args: T[]) {
		return new Promise(async (resolve, reject) => {
			try {
				beginCallBack();
				// 取消上一次的定时器
				if (timer) {
					clearTimeout(timer);
				}
				if (immediate && !isInvoke) {
					// 立即执行
					const result = await fn(...args);
					resolve(result);
					isInvoke = true;
					finishCallback();
				} else {
					// 延迟执行
					timer = setTimeout(async () => {
						const result = await fn(...args);
						resolve(result);
						isInvoke = false;
						timer = null;
						finishCallback();
					}, delay);
				}
			} catch (err) {
				reject(err);
			}
		});
	};
	// 取消功能
	_debounce.cancel = function () {
		if (timer) {
			clearTimeout(timer);
			finishCallback();
		}
		timer = null;
		isInvoke = false;
	};
	return _debounce;
}
