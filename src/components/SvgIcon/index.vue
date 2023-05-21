<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";
// 后期需要借助 vite-plugin-svg-icons 插件 完成 svg 的使用
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "#000"
  }
});

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>

<style scoped lang="scss">
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.svg-icon:focus {
  outline: 0;
}
</style>
