import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface EleType extends HTMLElement {
  copyData: string | number;
  _handleClick_: () => any;
}
/**
 * @description 复制指令 v-copy
 * @param binding 可拓展
 */
const copy: Directive = {
  mounted(el: EleType, binding: DirectiveBinding) {
    const handleClick2 = handleClick.bind(this, binding.value);
    el.addEventListener("click", handleClick2);
  },
  beforeUnmount(el: EleType) {
    el.removeEventListener("click", el._handleClick_);
  }
};
function handleClick(this: any, obj: any) {
  const input = document.createElement("input");
  input.value = (document.querySelector(`${obj.id}`) as HTMLInputElement).value;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  ElMessage.success("复制成功");
}
export default copy;
