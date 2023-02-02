<template>
	<el-config-provider :locale="locale">
		<RouterView></RouterView>
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "./store";
import { getBrowserLang } from "@/utils/utilsFn";

const I18n = useI18n();
const globalStore = GlobalStore();
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
</script>
