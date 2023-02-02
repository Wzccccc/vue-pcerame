<template>
	<div id="throttle">
		<h2 v-for="item in 30" :key="item">节流{{ item }}</h2>
	</div>
</template>

<script setup lang="ts" name="throttle"></script>

<style scoped lang="scss">
#throttle {
	line-height: 50px;
}
</style>
