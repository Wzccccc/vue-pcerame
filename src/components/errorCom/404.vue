<template>
	<div class="not-container">
		<img src="@/assets/images/404.png" alt="404" class="not-img" />
		<div class="back-detail">
			<h2 class="title">404</h2>
			<div class="txtTips">抱歉，您访问的页面不存在</div>
			<div class="timeTxt">{{ timeNum }} 秒后将自动返回首页</div>
			<el-button type="primary" @click="returnHome">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="404">
import { useRouter } from "vue-router";
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
	router.push({ name: "home" });
};
</script>
<style scoped lang="scss">
@import "./common.scss";
</style>
