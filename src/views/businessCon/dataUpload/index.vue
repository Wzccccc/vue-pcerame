<template>
	<div id="dataUpload">
		<h2 v-for="item in 30" :key="item">文件上传组件{{ item }}</h2>
	</div>
</template>

<script setup lang="ts" name="dataUpload"></script>

<style scoped lang="scss">
@use "./index.scss";
</style>
