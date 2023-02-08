<template>
	<div
		id="waterMark"
		v-waterMarker="{ text: 'Vue-Pcerame', font: '20px Microsoft JhengHei', textColor: 'rgba(180, 180, 180, 0.5)' }"
	>
		<h4 v-for="item in 30" :key="item">水印指令</h4>
	</div>
</template>
<script setup lang="ts" name="waterMark"></script>
<style scoped lang="scss">
#waterMark {
	line-height: 40px;
	min-height: 100%;
}
</style>
