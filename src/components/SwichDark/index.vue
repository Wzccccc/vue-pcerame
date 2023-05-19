<template>
	<el-switch v-model="isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="changTheme" />
</template>

<script lang="ts" setup name="swichDark">
import { Ref, ref, watch } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { GlobalStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";
const isDark: Ref<boolean> = ref(false);
const globalStore = GlobalStore();
const { switchDark } = useTheme();
watch(
	() => globalStore.systemConfig.isDark,
	(val: boolean) => {
		isDark.value = val;
	},
	{ immediate: true }
);

const changTheme = (val: boolean) => {
	globalStore.setIsFllowSystem(val === window.matchMedia("(prefers-color-scheme:dark)").matches);
	globalStore.setTheme(val);
	switchDark();
};
</script>
<style scoped lang="scss"></style>
