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

declare interface ViteEnv {
	VITE_USER_NODE_ENV: "development" | "production" | "test";
	VITE_GLOB_APP_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_REPORT: boolean;
	VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
	VITE_DROP_CONSOLE: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_API_URL: string;
	VITE_PROXY: [string, string][];
}
interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}
