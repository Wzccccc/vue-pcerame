<template>
	<el-backtop :right="right" :bottom="bottom" :target="target" />
</template>

<script setup lang="ts">
defineProps({
	target: {
		type: String
	},
	right: {
		type: Number,
		default: 100
	},
	bottom: {
		type: Number,
		default: 100
	}
});
</script>
<style scoped lang="scss"></style>
