<template>
  <div class="not-container">
    <img src="@/assets/images/404.png" alt="404" class="not-img" />
    <div class="back-detail">
      <h2 class="txtTips">{{ $t("ErrorPags.NoExistTips") }}</h2>
      <div class="timeTxt">{{ timeNum }} {{ $t("ErrorPags.CountDownTips") }}</div>
      <el-button type="primary" @click="returnHome">{{ $t("ErrorPags.BackHomeBtn") }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { ref } from "vue";
const router = useRouter();
let timeNum = ref(10);
const timer = setInterval(() => {
  timeNum.value--;
  if (!timeNum.value) {
    clearInterval(timer);
    returnHome();
  }
}, 1000);
const returnHome = function () {
  clearInterval(timer);
  router.push("/home");
};
onBeforeRouteLeave(() => {
  clearInterval(timer);
});
</script>
<style scoped lang="scss">
@use "./index.scss";
</style>
