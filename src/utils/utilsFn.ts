/**
 * @description 判断数据类型
 * @returns string
 */
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 扁平化菜单为动态路由
 * @param Menu.MenuOptions[]
 * @return Array
 */
export const flatMenu = (menuList: Menu.MenuOptions[]) => {
	let copyMenulist = JSON.parse(JSON.stringify(menuList));
	return copyMenulist.reduce((pre: Menu.MenuOptions[], cur: Menu.MenuOptions) => {
		let resultList = [...pre, cur];
		if (cur.children) resultList = [...resultList, ...flatMenu(cur.children)];
		return resultList;
	}, []);
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
