vue3
<template>
	<el-main>
		<div
			class="card"
			v-waterMarker="{ text: 'Vue-Pcerame', font: '20px Microsoft JhengHei', textColor: 'rgba(180, 180, 180, 0.2)' }"
		>
			<router-view></router-view>
			<el-backtop :right="100" :bottom="100" target=".card" />
		</div>
	</el-main>
</template>

<script setup lang="ts" name="main"></script>

<style scoped lang="scss">
.el-main {
	height: 100%;
	padding: 10px;
	background-color: #f0f2f5;
	overflow: hidden;
}
</style>
