<template>
	<div class="not-container">
		<img src="@/assets/images/500.png" alt="500" class="not-img" />
		<div class="back-detail">
			<h2 class="title">500</h2>
			<div class="txtTips txtTips-500">抱歉，您当前网络不佳，请稍后再试</div>
			<el-button type="primary" @click="returnHome">{{ globalStore.token ? "返回首页" : "返回登录页" }}</el-button>
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
@import "./index.scss";
</style>
