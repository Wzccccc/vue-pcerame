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
	VITE_APP_NODE_ENV: "development" | "production" | "test";
	VITE_APP_TITLE: string;
	VITE_APP_PORT: number;
	VITE_APP_PUBLIC_PATH: string;
	VITE_APP_API_BASE_URL: string;
	VITE_APP_REPORT: boolean;
	VITE_APP_PROXY: Boolean;
	VITE_APP_DROP_CONSOLE: boolean;
	VITE_APP_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
	VITE_APP_BUILD_COMPRESS_DELETE_ORIGIN_FILE: booelan;
}
