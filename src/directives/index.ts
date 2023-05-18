import { App } from "vue";
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import waterMarker from "./modules/waterMark";

const directivesList: any = {
	copy,
	debounce,
	waterMarker
};

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;
