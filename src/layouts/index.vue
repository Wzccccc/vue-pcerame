<template>
	<el-container class="layout">
		<el-aside>
			<div
				class="menu"
				:style="{ width: globalStore.systemConfig.isCollapse ? '65px' : globalStore.language === 'zh' ? '240px' : '260px' }"
			>
				<div class="logo">
					<img src="@/assets/images/logo.png" alt="" />
					<span v-if="!globalStore.systemConfig.isCollapse">Vue - Pcerame</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="true"
						:collapse="globalStore.systemConfig.isCollapse"
						:collapse-transition="false"
					>
						<SubMenu :menuList="menuStore.dataMneuList" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container class="right-con">
			<!-- * 头部 -->
			<Header />
			<!-- * 内容 -->
			<Main />
			<!-- * 页脚 -->
			<Footer />
		</el-container>
	</el-container>
</template>

<script lang="ts" setup name="layout">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import { GlobalStore } from "@/store";

import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import Header from "@/layouts/components/Header/index.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Main from "@/layouts/components/Main/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const globalStore = GlobalStore();
const menuStore = MenuStore();
const route = useRoute();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
</script>

<script lang="ts" name="layout">
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import I18n from "@/language/index";
import { getTimeState } from "@/utils/utilsFn";

export default defineComponent({
	beforeRouteEnter(to, from, next) {
		if (from.path !== "/dataScreen") {
			// 根据时间展示不同的提示语
			ElNotification.success({
				title: getTimeState(),
				message:
					I18n.global.t("WelcomeMessage.UserName") +
					" " +
					JSON.parse(localStorage.getItem("GlobalState")!).userName +
					"," +
					I18n.global.t("WelcomeMessage.Welcome") +
					" Vue-Pcerame",
				offset: 55,
				duration: 3000
			});
		}
		next();
	}
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
