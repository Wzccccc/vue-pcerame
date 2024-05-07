<template>
  <div>
    弹窗组件
    <el-button type="primary" @click="handleClick">创建弹窗组件</el-button>
  </div>
</template>

<script setup lang="ts">
import { createDialog } from "@/components/Dialog/index";
import TestDialog from "./components/testDialog.vue";

const handleClick = () => {
  createDialog(TestDialog, {}, { id: "test" });
};
</script>

<style scoped lang="scss"></style>
