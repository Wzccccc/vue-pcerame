<template>
	<div id="throttle">
		<div>
			<el-button type="primary">开启节流</el-button>
			<div>
				<el-input v-model="input" style="width: 300px" /> <span>{{ input }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="throttle">
import { ref } from "vue";
const input = ref("");
</script>

<style scoped lang="scss">
#throttle {
	line-height: 50px;
}
</style>
