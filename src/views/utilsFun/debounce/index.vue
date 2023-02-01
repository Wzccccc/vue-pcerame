<template>
	<div id="debounce" class="card">
		防抖
		<div>
			<el-button type="primary"> 触发防抖函数</el-button>
			<el-button type="primary"> 取消防抖函数</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="debounce"></script>

<style scoped lang="scss">
#debounce {
	height: 100%;
	width: 100%;
}
</style>
