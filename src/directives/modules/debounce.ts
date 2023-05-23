import type { Directive, DirectiveBinding } from "vue";
interface EleType extends HTMLElement {
  _handleClick_: () => any;
}
/**
 * @description 防抖指令 v-debounce
 * @param binding 参数可拓展 binding:obj
 */
const debounce: Directive = {
  mounted(el: EleType, binding: DirectiveBinding) {
    if (typeof binding.value.fn !== "function") {
      throw new Error("callback must be a function");
    }
    if (binding.value?.delay ? typeof binding.value.delay !== "number" : false) {
      throw new Error("delay must be a number");
    }
    let timer: NodeJS.Timeout | null = null;
    el._handleClick_ = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        binding.value.fn();
      }, binding.value.delay || 500);
    };
    el.addEventListener("click", el._handleClick_);
  },
  beforeUnmount(el: EleType) {
    el.removeEventListener("click", el._handleClick_);
  }
};
export default debounce;
