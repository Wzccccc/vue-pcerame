<template>
  <div class="not-container">
    <img src="@/assets/images/500.png" alt="500" class="not-img" />
    <div class="back-detail">
      <h2 class="txtTips txtTips-500">{{ $t("ErrorPages.NoNetTips") }}</h2>
      <el-button type="primary" @click="returnHome">{{
        globalStore.token ? $t("ErrorPages.BackHomeBtn") : $t("ErrorPages.BackLoginBtn")
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="500">
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store/index";
const router = useRouter();
const globalStore = GlobalStore();
const returnHome = () => {
  globalStore.token ? router.push("/home") : router.push("/login");
};
</script>
<style scoped lang="scss">
@use "./index.scss";
</style>
