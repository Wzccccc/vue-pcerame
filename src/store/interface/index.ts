export interface GlobalState {
  token: string;
  userName: string;
  language: string;
  isFollowSystem: boolean;
  systemConfig: systemConfigOptions;
}
// 菜单
export interface MenuState {
  authMenuList: Menu.MenuOptions[];
}
// 系统设置
export interface systemConfigOptions {
  isCollapse: boolean;
  isDark: boolean;
}
