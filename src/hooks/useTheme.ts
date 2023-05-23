import { GlobalStore } from "@/store";
export const useTheme = () => {
  const globalStore = GlobalStore();
  const themeConfig = computed(() => globalStore.systemConfig);

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement;
    if (themeConfig.value.isDark) body.setAttribute("class", "dark");
    else body.setAttribute("class", "");
  };

  return {
    switchDark
  };
};
