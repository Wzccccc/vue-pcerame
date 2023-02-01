<template>
	<div id="debounce" class="card">
		<h4>防抖函数</h4>
		<div class="topDiv">
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="beginDebounce"> 触发防抖函数1</el-button>
				<el-button type="primary" :disabled="disabled1" @click="cancelDebounce"> 取消防抖函数1</el-button>
			</el-space>
		</div>
		<div class="topDiv">
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="beginDebounce2"> 触发防抖函数2</el-button>
				<el-button type="primary" :disabled="disabled2" @click="cancelDebounce2"> 取消防抖函数2</el-button>
			</el-space>
		</div>
		<el-divider />
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<h4>防抖指令</h4>
		<BackTop :right="100" :bottom="100" :target="'.card'" />
	</div>
</template>

<script setup lang="ts" name="debounce">
import { ref } from "vue";
import { debounce } from "@/utils/debounce";
import { ElButton, ElMessage } from "element-plus";

const disabled1 = ref(true);
const disabled2 = ref(true);

function request1() {
	ElMessage.success("已触发防抖1");
}
const beginDebounce: any = debounce(
	request1,
	1000,
	false,
	() => {
		disabled1.value = false;
	},
	() => {
		disabled1.value = true;
	}
);
function cancelDebounce() {
	ElMessage.success("已取消防抖1");
	beginDebounce.cancel();
	disabled1.value = true;
}

function request2() {
	ElMessage.success("已触发防抖2");
}
const beginDebounce2: any = debounce(
	request2,
	2000,
	false,
	() => {
		disabled2.value = false;
	},
	() => {
		disabled2.value = true;
	}
);
function cancelDebounce2() {
	ElMessage.success("已取消防抖2");
	beginDebounce2.cancel();
	disabled2.value = true;
}
</script>

<style scoped lang="scss">
#debounce {
	height: 100%;
	width: 100%;
	h4 {
		margin-bottom: 20px;
	}
	.topDiv {
		line-height: 60px;
	}
}
</style>
