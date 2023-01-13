<template>
	<div class="title">
		<img src="@/assets/images/logo.svg" alt="" />
		<h2>VUE-PCERAME</h2>
	</div>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" :placeholder="isDev ? '用户名：admin / user' : '请输入用户名'">
				<template #prefix>
					<el-icon><User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password" show-password :placeholder="isDev ? '密码：123456' : '请输入密码'">
				<template #prefix>
					<el-icon><Lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button class="reset-btn" size="large" @click="resetForm(loginFormRef)"> 重 置</el-button>
			<el-button class="login-btn" size="large" type="primary" @click="login(loginFormRef)" :loading="loginLoading">
				登 录
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { FormInstance, FormRules, ElLoading } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import md5 from "js-md5"; // 密码加密

import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";

const router = useRouter();
const globalStore = GlobalStore();
const loginLoading = ref(false);
const loginFormRef = ref<FormInstance>();
const isDev = import.meta.env.VITE_ENV === "development";
const loginForm = reactive<Login.LoginForm>({
	username: "",
	password: ""
});
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: ["blur", "change"] }],
	password: [{ required: true, message: "请输入密码", trigger: ["blur", "change"] }]
});

const login = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (!valid) return;
		loginLoading.value = true;
		try {
			const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
			globalStore.setToken(data!.access_token);
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
		height: 52px;
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
			.el-button:hover {
				background-color: #4db6ac;
				border-color: #4db6ac;
			}
			.reset-btn:hover {
				background-color: #e6f5f3;
				color: #009688;
			}
			.reset-btn:active {
				color: #e9f5f3;
				background-color: #429488;
				border-color: #429488;
			}
			.reset-btn:focus {
				background-color: #e9f5f3;
				border-color: #bcdfdb;
				color: #429488;
			}
			.login-btn {
				border-color: #429488;
				background-color: #429488;
			}
		}
	}
}
</style>
