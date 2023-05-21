<template>
  <div class="user-name">{{ globalStore.userName }}</div>
  <el-dropdown class="user-photo" trigger="click" @command="handleCommand">
    <el-avatar :size="40" src="" @error="() => true">
      <img src="@/assets/images/avatar.png" alt="" />
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="1"
          ><el-icon><User /></el-icon>{{ $t("layoutHeader.user.PersonalDetails") }}</el-dropdown-item
        >
        <el-dropdown-item command="2"
          ><el-icon><Edit /></el-icon>{{ $t("layoutHeader.user.ChangePassword") }}</el-dropdown-item
        >
        <el-dropdown-item command="3" divided
          ><el-icon><SwitchButton /></el-icon>{{ $t("layoutHeader.user.LogOut") }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <UserDrawer></UserDrawer>
  </el-drawer>
</template>

<script setup lang="ts" name="user">
import { ref } from "vue";
import { GlobalStore } from "@/store";
import I18n from "@/language/index";
import { logoutApi } from "@/api/modules/login";
import UserDrawer from "@/layouts/components/components/userDrawer.vue";

import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const globalStore = GlobalStore();
const router = useRouter();
const drawer = ref(false);

const handleCommand = (command: string | number | object) => {
  if (command === "3") {
    logout();
  } else {
  }
};
// 退出登录
const logout = () => {
  ElMessageBox.confirm(
    `${I18n.global.t("layoutHeader.user.LogoutTips")}`,
    `${I18n.global.t("layoutHeader.user.LogoutTipsTitle")}`,
    {
      confirmButtonText: `${I18n.global.t("BtnGroups.Ok")}`,
      cancelButtonText: `${I18n.global.t("BtnGroups.Cancel")}`,
      type: "warning"
    }
  ).then(async () => {
    await logoutApi();
    ElMessage.success(`${I18n.global.t("layoutHeader.user.SuccessTips")}`);
    globalStore.resetInit();
    router.replace({ path: "/login" });
  });
};
</script>

<style scoped lang="scss">
.user-name {
  display: inline-block;
  margin: 0 20px;
  font-size: 16px;
  vertical-align: bottom;
}
.user-photo {
  cursor: pointer;
}
:deep(.el-dropdown-menu__item) {
  justify-content: center;
}
</style>
