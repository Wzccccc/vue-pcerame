<template>
	<div id="throttle">
		<div>
			<h4>默认节流函数为关闭状态</h4>
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="handleInput.open()">开启节流</el-button>
				<el-button type="primary" @click="handleInput.close()">关闭节流</el-button>
				<el-button type="primary" @click="handleInput.destroy()">销毁节流</el-button>
			</el-space>
			<div>
				<span class="txt">500ms(默认) </span>
				<el-input v-model="input" style="width: 300px" @input="handleInput" /> <span>{{ copyInput }}</span>
			</div>
			<el-divider />
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="handleInput2.open()">开启节流</el-button>
				<el-button type="primary" @click="handleInput2.close()">关闭节流</el-button>
				<el-button type="primary" @click="handleInput2.destroy()">销毁节流</el-button>
			</el-space>
			<div>
				<span class="txt">2000ms </span>
				<el-input v-model="input2" style="width: 300px" @input="handleInput2" /> <span>{{ copyInput2 }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="throttle">
import { ref, onUnmounted } from "vue";
import { throttle } from "@/utils/throttle";

const input = ref("");
const input2 = ref("");
const copyInput = ref("");
const copyInput2 = ref("");
const handleInput = throttle(
	() => {
		copyInput.value = input.value;
	},
	500,
	true
);
const handleInput2 = throttle(
	() => {
		copyInput2.value = input2.value;
	},
	2000,
	true
);
// 默认关闭
handleInput.close();
handleInput2.close();

onUnmounted(() => {
	handleInput.destroy();
	handleInput2.destroy();
});
</script>

<style scoped lang="scss">
#throttle {
	line-height: 50px;
	.txt {
		display: inline-block;
		width: 120px;
	}
}
</style>
