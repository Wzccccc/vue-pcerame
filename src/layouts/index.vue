<template>
  <el-container class="layout" ref="layout">
    <el-aside>
      <div
        class="menu"
        :style="{ width: globalStore.systemConfig.isCollapse ? '65px' : globalStore.language === 'zh' ? '240px' : '260px' }"
      >
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="" />
          <span v-if="!globalStore.systemConfig.isCollapse">Vue - Pcerame</span>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :router="true"
            :collapse="globalStore.systemConfig.isCollapse"
            :collapse-transition="false"
          >
            <SubMenu :menuList="menuStore.dataMenuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container class="right-con">
      <!-- * 头部 -->
      <Header />
      <!-- * 内容 -->
      <Main />
      <!-- * 页脚 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="layout">
import { MenuStore } from "@/store/modules/menu";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const menuStore = MenuStore();
const route = useRoute();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent);
  window.addEventListener("resize", resize);
});

// 监听屏幕变化
const resize = (e: UIEvent) => {
  let viewportWidth = (e.target as Window).innerWidth;
  switch (!!viewportWidth) {
    case viewportWidth < 992:
      globalStore.setCollapse(true);
      break;
    case viewportWidth >= 992:
      globalStore.setCollapse(false);
      break;
  }
};
</script>

<script lang="ts" name="layout">
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import I18n from "@/language/index";
import { getTimeState } from "@/utils/utilsFn";

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    if (!["/dataScreen", "/403", "/404", "/500"].includes(from.path)) {
      // 根据时间展示不同的提示语
      ElNotification.success({
        title: getTimeState(),
        message:
          I18n.global.t("WelcomeMessage.UserName") +
          " " +
          JSON.parse(localStorage.getItem("GlobalState")!).userName +
          ", " +
          I18n.global.t("WelcomeMessage.Welcome") +
          " Vue-Pcerame",
        duration: 3000,
        showClose: false,
        customClass: "welcome-tip"
      });
    }
    next();
  }
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
