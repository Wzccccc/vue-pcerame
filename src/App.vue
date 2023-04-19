<template>
	<el-config-provider :locale="locale">
		<RouterView></RouterView>
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "./store";
import { getBrowserLang } from "@/utils/utilsFn";
import { useTheme } from "@/hooks/useTheme";

const I18n = useI18n();
const globalStore = GlobalStore();
const { switchDark } = useTheme();
const locale = computed(() => {
	if (globalStore.language && globalStore.language === "zh") {
		I18n.locale.value = "zh";
		return zhCn;
	}
	if (globalStore.language === "en") {
		I18n.locale.value = "en";
		return en;
	}
	// 解决 页面刷新 I18n language 丢失问题
	I18n.locale.value = globalStore.language || getBrowserLang();
	globalStore.setLanguage(I18n.locale.value);
	return I18n.locale.value === "zh" ? zhCn : en;
});

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
