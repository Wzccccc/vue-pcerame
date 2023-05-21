import type { Directive, DirectiveBinding } from "vue";
interface Eltype extends HTMLElement {
  _handleclick_: () => any;
}
/**
 * @description 防抖指令 v-debounce
 * @param binding 参数可拓展 binding:obj
 */
const debounce: Directive = {
  mounted(el: Eltype, binding: DirectiveBinding) {
    if (typeof binding.value.fn !== "function") {
      throw new Error("callback must be a function");
    }
    if (binding.value?.delay ? typeof binding.value.delay !== "number" : false) {
      throw new Error("delay must be a number");
    }
    let timer: NodeJS.Timeout | null = null;
    el._handleclick_ = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        binding.value.fn();
      }, binding.value.delay || 500);
    };
    el.addEventListener("click", el._handleclick_);
  },
  beforeUnmount(el: Eltype) {
    el.removeEventListener("click", el._handleclick_);
  }
};
export default debounce;
