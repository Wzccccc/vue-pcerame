<template>
	<div class="not-container">
		<img src="@/assets/images/403.png" alt="403" class="not-img" />
		<div class="back-detail">
			<h2 class="title">403</h2>
			<div class="txtTips">抱歉，您无权访问此页面，请联系管理员</div>
			<div class="timeTxt">{{ timeNum }} 秒后将自动返回首页</div>
			<el-button type="primary" @click="returnHome">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="403">
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
	router.push({ name: "home" });
};
onBeforeRouteLeave(() => {
	clearInterval(timer);
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
