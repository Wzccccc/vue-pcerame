// * 扁平化菜单为动态路由
export const flatMenu = (menuList: Menu.MenuOptions[]) => {
	let copyMenulist = [...menuList];
	return copyMenulist.reduce((pre: Menu.MenuOptions[], cur: Menu.MenuOptions) => {
		let resultList = [...pre, cur];
		if (cur.children) resultList = [...resultList, ...flatMenu(cur.children)];
		return resultList;
	}, []);
};
