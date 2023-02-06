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
		<el-form-item class="code-item" prop="verificationCode">
			<el-input v-model="loginForm.verificationCode" class="code-input" :placeholder="$t('loginForm.verificatioNoCode')">
				<template #prefix>
					<i :class="'iconfont icon-yanzhengyanzhengma'"></i>
				</template>
			</el-input>
			<div class="get-code" @click="refreshCode">
				<Sldentify :identifyCode="identifyCode"></Sldentify>
			</div>
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

<script lang="ts" setup name="loginForm">
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { FormInstance, FormRules, ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import md5 from "js-md5"; // 密码加密

import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { initDynamicRouters } from "@/routers/modules/dynamicRouter";
import { getTimeState } from "@/utils/utilsFn";
import I18n from "@/language/index";
import Sldentify from "@/components/SIdentify/index.vue";

const router = useRouter();
const globalStore = GlobalStore();
const loginLoading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive<Login.LoginForm>({
	username: "",
	password: "",
	verificationCode: ""
});
const identifyCode = ref("");
const identifyCodes = ref("0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ");
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: I18n.global.t("loginForm.CheckUserName"), trigger: ["blur", "change"] }],
	password: [{ required: true, message: I18n.global.t("loginForm.CheckPassWord"), trigger: ["blur", "change"] }],
	verificationCode: [
		{
			validator: (rule: any, value: any, callback: any) => {
				if (!value) {
					callback(new Error(`${I18n.global.t("loginForm.verificatioNoCode")}`));
				} else if (value.toLowerCase() !== identifyCode.value.toLowerCase()) {
					callback(new Error(`${I18n.global.t("loginForm.verificatioCodeError")}`));
				} else {
					callback();
				}
			},
			trigger: ["blur", "change"]
		}
	]
});

onBeforeMount(() => {
	refreshCode();
});
onMounted(() => {
	// 监听回车事件
	document.onkeydown = (e: any) => {
		if (e.keyCode === 13 || loginLoading.value) {
			login(loginFormRef.value);
		}
	};
});

// 生成随机验证码
const refreshCode = () => {
	identifyCode.value = "";
	makeCode(identifyCodes.value, 6);
};
function randomNum(min: number, max: number) {
	max = max + 1;
	return Math.floor(Math.random() * (max - min) + min);
}
// 随机生成验证码字符串
function makeCode(data: string, len: number) {
	for (let i = 0; i < len; i++) {
		identifyCode.value += data[randomNum(0, data.length - 1)];
	}
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl || loginLoading.value) return;
	formEl.resetFields();
};

// 登录
const login = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (!valid) return;
		loginLoading.value = true;
		try {
			const { data: token } = await loginApi({ username: loginForm.username, password: md5(loginForm.password) });
			globalStore.setToken(token!.access_token);
			await initDynamicRouters();
			router.push("/home");
			// 根据时间展示不同的提示语
			ElNotification.success({
				title: getTimeState(),
				message: `${I18n.global.t("loginForm.Welcome")} Vue-Pcerame`,
				offset: 60,
				duration: 3000
			});
		} finally {
			loginLoading.value = false;
		}
	});
};
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
		.get-code {
			border: 1px solid #ccc;
			height: 40px;
			cursor: pointer;
		}
	}
	.code-item :deep(.el-form-item__content) {
		justify-content: space-between;
		.code-input {
			width: calc(100% - 150px);
			.icon-yanzhengyanzhengma {
				width: 14px;
			}
		}
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
