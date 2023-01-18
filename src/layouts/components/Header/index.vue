<template>
	<div id="header">
		<el-header style="font-size: 12px">
			<div class="toolbar">
				<div class="bar-left">
					<el-icon @click="changMenu">
						<component :is="globalStore.systemConfig.isCollapse ? 'expand' : 'fold'"></component>
					</el-icon>
					<!-- TODO 面包屑 -->
				</div>
				<div class="bar-right">
					<div class="bar-right-icons">
						<div class="search">
							<Search />
						</div>
						<div class="notice">
							<Notice />
						</div>
						<div class="language">
							<Language />
						</div>
						<div class="screen">
							<Screen />
						</div>
					</div>
					<User />
				</div>
			</div>
		</el-header>
	</div>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/store/index";
import Search from "./components/search.vue";
import Notice from "./components/notice.vue";
import Language from "./components/language.vue";
import Screen from "./components/screen.vue";
import User from "./components/user.vue";

const globalStore = GlobalStore();
const changMenu = () => {
	globalStore.setCollapse({ ...globalStore.systemConfig, isCollapse: !globalStore.systemConfig.isCollapse });
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
