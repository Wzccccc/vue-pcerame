<template>
	<div id="login">
		<div class="login-box">
			<div class="left-box">
				<img src="@/assets/images/login_left.svg" alt="" />
			</div>
			<div class="right-form">
				<LoginForm></LoginForm>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="login">
import LoginForm from "./components/loginForm.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
