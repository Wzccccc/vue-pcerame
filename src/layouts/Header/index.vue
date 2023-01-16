<template>
	<div id="header">
		<el-header style="font-size: 12px">
			<div class="toolbar">
				<div class="bar-left">
					<el-icon><Fold v-if="true" /><Expand v-else /></el-icon>
					<!-- TODO 面包屑 -->
				</div>
				<div class="bar-right">
					<div class="bar-right-icons">
						<SvgIcon iconName="icon-search1"></SvgIcon>
						<SvgIcon iconName="icon-bell1"></SvgIcon>
						<SvgIcon iconName="icon-language"></SvgIcon>
						<SvgIcon iconName="icon-quanping"></SvgIcon>
					</div>
					<span class="user-name">username</span>
					<el-dropdown class="user-photo">
						<img src="@/assets/images/avatar.gif" alt="avvtar" />
						<el-icon style="margin-right: 8px; margin-top: 1px"><setting /></el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>个人信息</el-dropdown-item>
								<el-dropdown-item>修改密码</el-dropdown-item>
								<el-dropdown-item divided>退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
		</el-header>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#header {
	.el-header {
		padding: 0 15px;
		.toolbar {
			height: 55px;
			line-height: 55px;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.bar-left {
				display: flex;
				align-items: center;
				.el-icon {
					cursor: pointer;
					font-size: 24px;
				}
			}
			.bar-right {
				display: flex;
				align-items: center;
				font-size: 22px;
				margin-right: 30px;
				.bar-right-icons {
					display: flex;
					width: 180px;
					justify-content: space-around;
					.svg-icon {
						cursor: pointer;
					}
				}
				.user-name {
					font-size: 16px;
					margin: 0 20px;
				}
				.user-photo {
					width: 40px;
					height: 40px;
					cursor: pointer;
					border-radius: 50%;
					overflow: hidden;
					.example-showcase .el-dropdown-link {
						color: var(--el-color-primary);
					}
				}
			}
		}
	}
}
</style>
