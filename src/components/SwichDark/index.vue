<template>
  <el-switch v-model="isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="changTheme" />
</template>

<script lang="ts" setup name="swichDark">
import { ref, watch } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { GlobalStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";

const isDark = ref(false);
const globalStore = GlobalStore();
const { switchDark } = useTheme();

watch(
  () => globalStore.systemConfig.isDark,
  (val: boolean) => {
    isDark.value = val;
  },
  { immediate: true }
);

const changTheme = () => {
  globalStore.setIsFllowSystem(isDark.value === window.matchMedia("(prefers-color-scheme:dark)").matches);
  globalStore.setTheme(isDark.value);
  switchDark();
};
</script>
<style scoped lang="scss"></style>
