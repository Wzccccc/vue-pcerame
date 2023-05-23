<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts" name="app">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { GlobalStore } from "./store";
import { getBrowserLang } from "@/utils/utilsFn";
import { useTheme } from "@/hooks/useTheme";

const I18n = useI18n();
const globalStore = GlobalStore();
const { switchDark } = useTheme();
const locale = ref(zhCn);
watch(
  () => globalStore.language,
  newVal => {
    if (newVal && newVal === "zh") {
      locale.value = zhCn;
    } else if (newVal === "en") {
      locale.value = en;
    } else {
      I18n.locale.value = newVal || getBrowserLang();
      globalStore.setLanguage(I18n.locale.value);
    }
  },
  { immediate: true }
);

// 如果用户手动设置了主题并且与浏览器主题不一致,将不会跟随系统,一致的情况会跟随系统(默认跟随)
if (globalStore.isFollowSystem) {
  globalStore.setTheme(window.matchMedia("(prefers-color-scheme:dark)").matches);
}
switchDark();
// 监听系统的深色模式变化
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
  if (globalStore.isFollowSystem) {
    globalStore.setTheme(event.matches);
    switchDark();
  }
});
</script>
