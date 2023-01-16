<template>
	<div id="login">
		<div class="login-box">
			<div class="left-box">
				<img src="@/assets/images/welcome.png" alt="" />
			</div>
			<div class="right-form">
				<LoginForm></LoginForm>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import LoginForm from "./components/loginForm.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
