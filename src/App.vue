<template>
	<el-config-provider :locale="i18nLocale">
		<RouterView></RouterView>
	</el-config-provider>
</template>

<script setup lang="ts" name="root">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

const i18nLocale = en;
</script>
