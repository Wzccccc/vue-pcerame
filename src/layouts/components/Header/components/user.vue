<template>
	<div class="user-name">username</div>
	<el-dropdown class="user-photo" trigger="click">
		<el-avatar :size="40" src="https://empty" @error="() => true">
			<img src="@/assets/images/avatar.png" alt="" />
		</el-avatar>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>{{ $t("layoutHeader.user.PersonalDetails") }}</el-dropdown-item>
				<el-dropdown-item>{{ $t("layoutHeader.user.ChangePassword") }}</el-dropdown-item>
				<el-dropdown-item divided @click="logout">{{ $t("layoutHeader.user.LogOut") }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="user">
import { GlobalStore } from "@/store";
import I18n from "@/language/index";
import { logoutApi } from "@/api/modules/login";

import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const globalStore = GlobalStore();
const router = useRouter();
const logout = () => {
	ElMessageBox.confirm(
		`${I18n.global.t("layoutHeader.user.LogoutTips")}`,
		`${I18n.global.t("layoutHeader.user.LogoutTipsTitle")}`,
		{
			confirmButtonText: `${I18n.global.t("SubmitBtn.Ok")}`,
			cancelButtonText: `${I18n.global.t("SubmitBtn.Cancel")}`,
			type: "warning"
		}
	).then(async () => {
		await logoutApi();
		ElMessage.success(`${I18n.global.t("layoutHeader.user.SuccessTips")}`);
		globalStore.setToken("");
		globalStore.setCollapse({ isCollapse: false });
		globalStore.setLanguage("");
		router.replace({ path: "/login" });
	});
};
</script>

<style scoped lang="scss">
.user-name {
	vertical-align: bottom;
	display: inline-block;
	font-size: 16px;
	margin: 0 10px 0 20px;
}
.user-photo {
	cursor: pointer;
}
:deep(.el-dropdown-menu__item) {
	justify-content: center;
}
</style>
