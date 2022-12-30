<template>
	<div class="not-container">
		<img src="@/assets/images/403.png" alt="403" class="not-img" />
		<div class="back-detail">
			<div class="title">403</div>
			<div class="detail">
				<span>抱歉，您无权访问此页面🙅🏿</span>
				<el-button type="primary">返回首页</el-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="403"></script>
<style scoped lang="scss">
.not-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
</style>
