<template>
  <div id="copy">
    <h4>复制指令(传入需要复制内容的元素id)</h4>
    <el-input class="input" v-model="input" placeholder="请输入" id="copyInput" />
    <el-button type="primary" :disabled="!input" v-copy="{ id: '#copyInput' }">复制</el-button>
  </div>
</template>

<script setup lang="ts" name="copy">
import { ref } from "vue";
const input = ref<string>("");
</script>
<style scoped lang="scss">
#copy {
  line-height: 40px;
  .input {
    width: 400px;
    margin-right: 20px;
  }
}
</style>
