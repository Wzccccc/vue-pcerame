import DragDialog from "./index.vue";

import { DialogPropType } from "./index.vue";

/**
 * @description 创建弹窗
 * @param {Component} component
 * @param {Object} componentProp
 * @param {DialogPropType} dialogProp
 */
export const createDialog = <T extends Object>(component: Component, componentProp: T, dialogProp: DialogPropType) => {
  const dialog = {
    render() {
      return h(DragDialog, dialogProp, {
        default: () => h(component, componentProp)
      });
    }
  };

  // 创建弹窗实例
  const app = createApp(dialog);
  // 挂载弹窗到body
  const div = document.createElement("div");
  div.classList.add("global-drag-dialog");
  document.body.appendChild(div);
  app.mount(div);

  // 创建一个集合，保存弹窗组件

  // 初始化弹窗位置

  // 关闭弹窗
  const unmountedDialog = () => {
    app.unmount();
    div.remove();
  };

  return {
    unmountedDialog
  };
};
