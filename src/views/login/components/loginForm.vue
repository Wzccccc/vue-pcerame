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
      <el-input
        v-model="loginForm.password"
        type="password"
        show-password
        autocomplete="new-password"
        :placeholder="$t('loginForm.PassWordTips')"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="code-item" prop="verificationCode">
      <el-input v-model="loginForm.verificationCode" class="code-input" :placeholder="$t('loginForm.verificationNoCode')">
        <template #prefix>
          <i :class="'iconfont icon-yanzhengyanzhengma'"></i>
        </template>
      </el-input>
      <div class="get-code" @click="refreshCode">
        <SIdentify :identifyCode="identifyCode"></SIdentify>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="reset-btn" size="large" :icon="CircleClose" @click="resetForm">
        {{ $t("BtnGroups.Reset") }}
      </el-button>
      <el-button
        class="login-btn"
        size="large"
        type="primary"
        :icon="UserFilled"
        @click="login(loginFormRef)"
        :loading="loginLoading"
      >
        {{ $t("BtnGroups.Login") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup name="loginForm">
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import md5 from "js-md5"; // 密码加密

import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { initDynamicRouters } from "@/routers/modules/dynamicRouter";
import I18n from "@/language/index";
import SIdentify from "@/components/SIdentify/index.vue";

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
const identifyCodes = ref("0123456789abcdwefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
const loginRules = reactive<FormRules>({
  username: [{ required: true, message: I18n.global.t("loginForm.CheckUserName"), trigger: ["blur", "change"] }],
  password: [{ required: true, message: I18n.global.t("loginForm.CheckPassWord"), trigger: ["blur", "change"] }],
  verificationCode: [
    { required: true, message: I18n.global.t("loginForm.verificationNoCode"), trigger: ["blur", "change"] },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value && value.toLowerCase() !== identifyCode.value.toLowerCase()) {
          callback(new Error(`${I18n.global.t("loginForm.verificationCodeError")}`));
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
  document.onkeydown = (e: KeyboardEvent) => {
    (e.code === "Enter" || e.key === "Enter" || loginLoading.value) && login(loginFormRef.value);
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
const resetForm = () => {
  if (!loginFormRef.value || loginLoading.value) return;
  loginFormRef.value.resetFields();
};

// 登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loginLoading.value = true;
    try {
      const { data: token } = await loginApi({ username: loginForm.username, password: md5(loginForm.password) });
      globalStore.setToken(token!.access_token);
      globalStore.setUserName(loginForm.username);
      await initDynamicRouters();
      router.push("/home");
    } finally {
      loginLoading.value = false;
    }
  });
};
</script>
<style scoped lang="scss">
@use "./loginForm.scss";
</style>
