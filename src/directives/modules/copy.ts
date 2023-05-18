import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface Eltype extends HTMLElement {
	copyData: string | number;
	_handleclick_: () => any;
}
/**
 * @description 复制指令 v-copy
 * @param binding 可拓展
 */
const copy: Directive = {
	mounted(el: Eltype, binding: DirectiveBinding) {
		const handleclick2 = handleclick.bind(this, binding.value);
		el.addEventListener("click", handleclick2);
	},
	beforeUnmount(el: Eltype) {
		el.removeEventListener("click", el._handleclick_);
	}
};
function handleclick(this: any, obj: any) {
	const input = document.createElement("input");
	input.value = (document.querySelector(`${obj.id}`) as HTMLInputElement).value;
	document.body.appendChild(input);
	input.select();
	document.execCommand("Copy");
	document.body.removeChild(input);
	ElMessage.success("复制成功");
}
export default copy;
