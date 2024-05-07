<template>
  <div class="dialog-container" :style="dragDialogStyle">
    <div class="dialog-header">
      <div class="dialog-header-title">{{ props.title }}</div>
      <div class="dialog-header-btn">
        <i class="iconfont icon-zuixiaohua" @click="minimize"></i>
        <i class="iconfont icon-guanbi" @click="close"></i>
      </div>
    </div>
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="DragDialog">
export interface DialogPropType {
  id: string;
  title?: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  position?:
    | "center"
    | "left-top"
    | "left-center"
    | "left-bottom"
    | "right-top"
    | "right-center"
    | "right-bottom"
    | "top-center"
    | "bottom-center";
}

const props = withDefaults(defineProps<DialogPropType>(), {
  title: "弹窗",
  width: 500,
  height: 300,
  position: "center"
});

const dragDialogStyle = computed(() => {
  const position = transformPosition(props);
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    ...position
  };
});

// 初始化弹窗位置
const transformPosition = ({ top = 0, left = 0, right = 0, bottom = 0, position }: DialogPropType) => {
  const isPositionNumFlag = top || left || right || bottom;
  if (isPositionNumFlag) {
    return { top: `${top}px`, left: `${left}px`, right: `${right}px`, bottom: `${bottom}px` };
  }
  switch (position) {
    case "center":
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    case "left-top":
      return { top: "0", left: "0" };
    case "left-center":
      return { top: "50%", left: "0", transform: "translateY(-50%)" };
    case "left-bottom":
      return { bottom: "0", left: "0" };
    case "right-top":
      return { top: "0", right: "0" };
    case "right-center":
      return { top: "50%", right: "0", transform: "translateY(-50%)" };
    case "right-bottom":
      return { bottom: "0", right: "0" };
    case "top-center":
      return { top: "0", left: "50%", transform: "translateX(-50%)" };
    case "bottom-center":
      return { bottom: "0", left: "50%", transform: "translateX(-50%)" };
    default:
      return {};
  }
};

const minimize = () => {
  console.log("最小化");
};

const close = () => {
  console.log("关闭");
};
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
