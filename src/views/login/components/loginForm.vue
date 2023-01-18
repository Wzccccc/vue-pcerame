<template>
	<div class="title">
		<img src="@/assets/images/logo.png" alt="" />
		<h2>Vue-Pcerame</h2>
	</div>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" :placeholder="$t('loginForm.UserNameTips')">
				<template #prefix>
					<el-icon><User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password" show-password :placeholder="$t('loginForm.PassWordTips')">
				<template #prefix>
					<el-icon><Lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button class="reset-btn" size="large" @click="resetForm(loginFormRef)">
				{{ $t("loginForm.Reset") }}
			</el-button>
			<el-button class="login-btn" size="large" type="primary" @click="login(loginFormRef)" :loading="loginLoading">
				{{ $t("loginForm.Login") }}
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup name="login">
import { reactive, ref, onMounted } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import md5 from "js-md5"; // 密码加密

import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import I18n from "@/language/index";
import { initDynamicRouters } from "@/routers/modules/dynamicRouter";

const router = useRouter();
const globalStore = GlobalStore();
const loginLoading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive<Login.LoginForm>({
	username: "",
	password: ""
});
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: I18n.global.t("loginForm.CheckUserName"), trigger: ["blur", "change"] }],
	password: [{ required: true, message: I18n.global.t("loginForm.CheckPassWord"), trigger: ["blur", "change"] }]
});

const login = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (!valid) return;
		loginLoading.value = true;
		try {
			const { data: token } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
			globalStore.setToken(token!.access_token);
			await initDynamicRouters();
			router.push({ name: "home" });
		} finally {
			loginLoading.value = false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl || loginLoading.value) return;
	formEl.resetFields();
};
onMounted(() => {
	document.onkeydown = (e: any) => {
		if (e.keyCode === 13 || loginLoading.value) {
			login(loginFormRef.value);
		}
	};
});
</script>
<style scoped lang="scss">
.title {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 40px;
	img {
		width: 60px;
	}
	h2 {
		margin-left: 20px;
		font-size: 42px;
	}
}
.el-form {
	.el-form-item {
		margin-bottom: 40px;
	}
	.el-form-item:last-child {
		margin-bottom: 0;
		:deep(.el-form-item__content) {
			justify-content: space-around !important;
			.el-button {
				border-radius: 20px;
				width: 40%;
			}
		}
	}
}
</style>
