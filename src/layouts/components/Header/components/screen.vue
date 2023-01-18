<template>
	<!-- <SvgIcon :iconName="isFullscreen ? 'icon-suoxiao' : 'icon-quanping'" @click="toggle"></SvgIcon> -->
	<i :class="`iconfont ${isFullscreen ? 'icon-suoxiao' : 'icon-quanping'}`" @click="toggle"></i>
</template>

<script setup lang="ts" name="screen">
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();
</script>

<style scoped lang="scss"></style>
