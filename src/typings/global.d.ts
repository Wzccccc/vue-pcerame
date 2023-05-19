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

/* Vite */
declare type Recordable<T = string> = Record<string, T>;

declare interface ViteEnv {
	VITE_NODE_ENV: "development" | "production" | "test";
	VITE_APP_TITLE: string;
	VITE_APP_PORT: number;
	VITE_PUBLIC_PATH: string;
	VITE_API_BASE_URL: string;
	VITE_APP_PROXY: Boolean;
}
