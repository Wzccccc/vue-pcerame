<template>
	<div id="debounce" class="card">
		防抖
		<div>
			<el-button type="primary" @click="handClickOne"> 1⃣️触发防抖函数</el-button>
			<el-button type="primary" @click="cancelClickOne"> 1⃣️取消防抖函数</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="debounce">
import { Debounce } from "@/utils/debounce";

function needfn(this: unknown) {
	console.log("xixi");
}
// 第一个需要防抖的函数
const _debounce = new Debounce();
const handClickOne = _debounce.use(needfn, 2000, false);

// 取消第一个防抖函数
const cancelClickOne = () => {
	_debounce.use(needfn, 2000, false, true);
};
</script>

<style scoped lang="scss">
#debounce {
	height: 100%;
	width: 100%;
}
</style>
