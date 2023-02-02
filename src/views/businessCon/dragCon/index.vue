<template>
	<div id="dragCon">
		<h2 v-for="item in 30" :key="item">拖拽组件{{ item }}</h2>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#dragCon {
	line-height: 50px;
}
</style>
