<template>
	<div id="supTable">
		<h2 v-for="item in 30" :key="item">超级表格{{ item }}</h2>
	</div>
</template>

<script setup lang="ts" name="supTable"></script>

<style scoped lang="scss">
@use "./index.scss";
</style>
