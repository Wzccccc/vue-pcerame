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
					<!-- :collapse="isCollapse" -->
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

<style scoped lang="scss">
@import "./index.scss";
</style>
