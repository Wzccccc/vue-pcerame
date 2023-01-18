// * menu 菜单
declare namespace Menu {
	interface MenuOptions {
		path: string;
		name: string;
		meta: MetaProps;
		compoents?: string | (() => Promise<string>);
		redirect?: string;
		children?: MenuOptions[];
	}
	interface MetaProps {
		icon: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
	}
}
