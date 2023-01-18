<template>
	<el-popover placement="bottom" :width="300" trigger="click" @show="showPopover" @hide="hidePopover">
		<template #reference>
			<el-badge :value="99" :max="99">
				<i :class="'iconfont icon-bell1'"></i>
				<!-- <SvgIcon iconName="icon-bell1"></SvgIcon> -->
			</el-badge>
		</template>
		<template #default>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane :label="$t('layoutHeader.noticeTabs.Notice') + ` (${count})`" name="first" />
				<el-tab-pane :label="$t('layoutHeader.noticeTabs.Todo') + ` (${count})`" name="second" />
				<el-tab-pane :label="$t('layoutHeader.noticeTabs.Done')" name="third" />
			</el-tabs>
			<div class="infinite-list-wrapper" style="overflow: auto" v-if="isMounted">
				<ul v-infinite-scroll="loadMore" class="list" :infinite-scroll-disabled="disabled">
					<li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
				</ul>
				<p v-if="loading">{{ $t("layoutHeader.noticeTabs.Loading") }}...</p>
				<p v-if="noMore">{{ $t("layoutHeader.noticeTabs.NoMore") }}</p>
			</div>
		</template>
	</el-popover>
</template>

<script setup lang="ts" name="notice">
import { computed, ref, nextTick, Ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const isMounted: Ref<boolean> = ref(false);
const count: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const loadMore = () => {
	loading.value = true;
	setTimeout(() => {
		count.value += 5;
		loading.value = false;
	}, 500);
};

const activeName = ref("first");

// tabs 切换
const handleClick = (tab: TabsPaneContext, event: Event) => {
	// console.log(tab, event);
};

const showPopover = () => {
	nextTick(() => {
		isMounted.value = true;
	});
};

const hidePopover = () => {
	count.value = 0;
	activeName.value = "first";
	loading.value = false;
	isMounted.value = false;
};
</script>

<style scoped lang="scss">
.el-badge {
	vertical-align: top;
	:deep(.el-badge__content) {
		top: 2px;
		padding: 0 4px;
		margin: 0;
	}
}
:deep(.el-tabs__nav) {
	width: 100%;
	display: flex;
	.el-tabs__item {
		flex: 1;
		box-sizing: border-box;
		text-align: center;
	}
}
.infinite-list-wrapper {
	height: 300px;
	text-align: center;
}
.infinite-list-wrapper::-webkit-scrollbar {
	// display: none;
	width: 5px;
}
.infinite-list-wrapper .list {
	padding: 0;
	margin: 0;
	list-style: none;
}

.infinite-list-wrapper .list-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	background: var(--el-color-danger-light-9);
	color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
	margin-top: 10px;
}
</style>
