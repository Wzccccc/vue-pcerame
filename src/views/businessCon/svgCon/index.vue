<template>
	<div id="scgCon">
		<h2 v-for="item in 30" :key="item">svg图标{{ item }}</h2>
	</div>
</template>

<script setup lang="ts" name="scgCon"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
