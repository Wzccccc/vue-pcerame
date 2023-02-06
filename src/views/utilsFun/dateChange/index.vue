<template>
	<div id="dateChange">
		<h2 v-for="item in 30" :key="item">日期转换{{ item }}</h2>
	</div>
</template>

<script setup lang="ts" name="dateChange">
import { ref } from "vue";
console.log(Date.now());
</script>

<style scoped lang="scss">
#dateChange {
	line-height: 50px;
}
</style>
