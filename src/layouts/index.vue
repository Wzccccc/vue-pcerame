<template>
	<div id="layout">
		<el-container class="left-con">
			<el-aside width="200px">
				<div class="menu">
					<div class="logo">
						<img src="@/assets/images/logo.svg" alt="VUE - PREVIEW" />
						<span>VUE-PREVIEW</span>
					</div>
					<el-scrollbar> <Menu /> </el-scrollbar>
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
	</div>
</template>

<script lang="ts" setup>
import Menu from "@/layouts/Menu/index.vue";
import Header from "@/layouts/Header/index.vue";
import Tabs from "@/layouts/Tabs/index.vue";
import Main from "@/layouts/Main/index.vue";
import Footer from "@/layouts/Footer/index.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
