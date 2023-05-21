<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- <SvgIcon iconName="icon-language1"></SvgIcon> -->
    <i :class="'iconfont icon-language1 '"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'">{{
          $t("layoutHeader.language.SimplifiedChinese")
        }}</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language === 'en'">{{ $t("layoutHeader.language.English") }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="language">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import i18n from "@/language/index";

const I18n = useI18n();
const router = useRouter();
const globalStore = GlobalStore();
const language = computed(() => globalStore.language);

const changeLanguage = (command: string) => {
  I18n.locale.value = command;
  globalStore.setLanguage(command);
  // 浏览器title需要同步改变
  const title = import.meta.env.VITE_APP_TITLE;
  document.title = router.currentRoute.value.meta.title
    ? `${i18n.global.t(`layoutMenu.${router.currentRoute.value.meta.title}`)} - Vue-Pcerame`
    : title;
};
</script>
<style scoped lang="scss">
.el-dropdown-menu {
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
}
:deep(.el-dropdown-menu__item) {
  justify-content: center;
}
</style>
