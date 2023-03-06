import I18n from "@/language/index";

/**
 * @description 判断数据类型
 * @return string
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
export const flatMenu = (menuList: Menu.MenuOptions[]): any[] => {
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
export const getBrowserLang = (): string => {
	let browserLang = navigator.language;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 根据时间展示不同的提示语
 * @return string
 */
export const getTimeState = () => {
	let hours = new Date().getHours();
	console.log(hours);
	if (hours >= 22 || (hours >= 0 && hours < 6)) return `${I18n.global.t("loginForm.Night")} 🌛`;
	if (hours >= 6 && hours < 10) return `${I18n.global.t("loginForm.Morning")} ⛅`;
	if (hours >= 10 && hours < 14) return `${I18n.global.t("loginForm.Noon")} 🌞`;
	if (hours >= 14 && hours < 18) return `${I18n.global.t("loginForm.AfterNoon")} 🌞`;
	if (hours >= 18 && hours < 22) return `${I18n.global.t("loginForm.Evening")} 🌛`;
};
