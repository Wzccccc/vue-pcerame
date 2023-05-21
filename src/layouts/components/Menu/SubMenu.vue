<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ $t(`layoutMenu.${item.meta.title}`) }}</span>
      </template>
      <SubMenu :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ $t(`layoutMenu.${item.meta.title}`) }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts" name="SubMenu">
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style lang="scss">
.el-menu--popup.el-menu {
  padding: 0;
  .el-menu-item.is-active {
    background-color: #eef5fe;
  }
  .el-menu-item:not(.is-active):hover,
  .el-sub-menu .el-sub-menu__title:hover {
    background-color: #eeeff2;
  }
}
</style>
