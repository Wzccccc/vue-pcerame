<template>
	<div id="debounce">
		<h4>防抖函数</h4>
		<div class="topDiv">
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="beginDebounce">触发防抖函数1</el-button>
				<el-button type="primary" :disabled="disabled1" @click="cancelDebounce">取消防抖函数1</el-button>
			</el-space>
		</div>
		<div class="topDiv">
			<el-space :size="15" spacer="|">
				<el-button type="primary" @click="beginDebounce2">触发防抖函数2</el-button>
				<el-button type="primary" :disabled="disabled2" @click="cancelDebounce2">取消防抖函数2</el-button>
			</el-space>
		</div>
		<el-divider />
		<el-space :size="15" spacer="|">
			<el-button type="primary" v-debounce="{ fn: clickDiretive }">触发防抖指令(默认值:0.5s后触发)</el-button>
			<el-button type="primary" v-debounce="{ fn: clickDiretive2, delay: 2000 }">触发防抖指令(自定义:2s后触发)</el-button>
		</el-space>
	</div>
</template>

<script setup lang="ts" name="debounce">
import { ref } from "vue";
import { debounce } from "@/utils/debounce";
import { ElButton, ElMessage } from "element-plus";

const disabled1 = ref(true);
const disabled2 = ref(true);

function request1() {
	ElMessage.success("已触发防抖函数1");
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
	ElMessage.success("已取消防抖函数1");
	beginDebounce.cancel();
	disabled1.value = true;
}

function request2() {
	ElMessage.success("已触发防抖函数2");
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
	ElMessage.success("已取消防抖函数2");
	beginDebounce2.cancel();
	disabled2.value = true;
}

const clickDiretive = () => {
	ElMessage.success("我是延迟0.5s执行的防抖指令");
};
const clickDiretive2 = () => {
	ElMessage.success("我是延迟2s执行的防抖指令");
};
</script>

<style scoped lang="scss">
#debounce {
	h4 {
		margin-bottom: 20px;
	}
	.topDiv {
		line-height: 50px;
	}
}
</style>
