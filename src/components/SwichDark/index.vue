<template>
	<el-tooltip :content="I18n.global.t('DarkSwitchTip')" placement="top">
		<el-switch v-model="isDark" inline-prompt :active-icon="Check" :inactive-icon="Close" @change="changTheme" />
	</el-tooltip>
</template>

<script lang="ts" setup name="swichDark">
import { ref, onMounted } from "vue";
import { Check, Close } from "@element-plus/icons-vue";
import { GlobalStore } from "@/store";
import I18n from "@/language/index";
import { useTheme } from "@/hooks/useTheme";
const isDark = ref(false);
const globalStore = GlobalStore();
const { switchDark } = useTheme();

onMounted(() => {
	isDark.value = globalStore.isFollowSystem;
});

const changTheme = (val: boolean) => {
	globalStore.setIsFllowSystem(val);
	// 开启
	if (val) {
		// true 为 深色模式 false 为正常
		globalStore.setTheme(window.matchMedia("(prefers-color-scheme:dark)").matches);
	} else {
		// 关闭 深色
		globalStore.setTheme(false);
	}
	switchDark();
};
</script>
<style scoped lang="scss"></style>
