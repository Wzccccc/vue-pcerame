vue3
<template>
	<div id="main">
		<div class="main-con">
			<el-main>
				<router-view></router-view>
			</el-main>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#main {
	padding: 10px 12px;
	height: 100%;
	background-color: #f0f2f5;
	.main-con {
		padding: 5px;
		border-radius: 5px;
		height: 100%;
		box-sizing: border-box;
		background-color: #fff;
		.el-main {
			padding: 0;
			box-sizing: border-box;
		}
	}
}
</style>
