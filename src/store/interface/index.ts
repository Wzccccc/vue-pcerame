export interface GlobalState {
	token: string;
	language: string;
	systemConfig: systemConfigOptions;
}

export interface MenuState {
	authMenuList: Menu.MenuOptions[];
}
export interface systemConfigOptions {
	isCollapse: boolean;
}
