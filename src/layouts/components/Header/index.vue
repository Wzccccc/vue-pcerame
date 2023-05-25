<template>
  <div id="header">
    <el-header style="font-size: 12px">
      <div class="toolbar">
        <div class="bar-left">
          <el-icon @click="changMenu">
            <component :is="globalStore.systemConfig.isCollapse ? 'expand' : 'fold'"></component>
          </el-icon>
          <!-- TODO 面包屑 -->
        </div>
        <div class="bar-right">
          <!-- * 深色模式开关 -->
          <SwitchDark style="vertical-align: middle" />
          <div class="bar-right-icons">
            <div class="search">
              <Search />
            </div>
            <div class="language">
              <Language />
            </div>
            <div class="notice">
              <Notice />
            </div>
            <div class="screen">
              <Screen />
            </div>
          </div>
          <UserAvatar />
        </div>
      </div>
    </el-header>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store/index";

const globalStore = GlobalStore();
const changMenu = () => {
  globalStore.setCollapse(!globalStore.systemConfig.isCollapse);
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
