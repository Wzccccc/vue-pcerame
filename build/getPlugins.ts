import vue from "@vitejs/plugin-vue";
import { type PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html"; // 可在 html 中使用环境变量
import VueSetupExtend from "vite-plugin-vue-setup-extend"; // 可在 setup 上自定义name
import viteEslint from "vite-plugin-eslint"; // ESlint校验
import { visualizer } from "rollup-plugin-visualizer"; // 打包预览
import viteImagemin from "vite-plugin-imagemin"; // 图片压缩
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import Icons from "unplugin-icons/vite";
// import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import { createCompress } from "./pack";
/**
 * @description 创建插件
 * @param viteEnv
 * @returns (PluginOption | PluginOption[])[]
 */
const pathSrc = path.resolve(__dirname, "../src");
export const createPlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  return [
    vue(),
    // name 可以写在 script 标签上
    VueSetupExtend(),
    viteEslint(),
    // 打包配置
    createCompress(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: viteEnv.VITE_APP_TITLE }
      }
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router", "vue-i18n"],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver()
        // 自动导入图标组件
        // IconsResolver({
        //   prefix: "Icon"
        // })
      ],
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: path.resolve(pathSrc, "types", "auto-imports.d.ts") // (false) 配置文件生成位置，默认是根目录 /auto-imports.d.ts
    }),
    Components({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      // 只要项目中，在components目录下的文件，会自动导入到components.d.ts中，这样，页面或者组件中就不用再次引入了，也无需在`main.js`通过app.component全局注册了
      dirs: ["src/components", "src/**/components"],
      extensions: ["vue", "jsx", "tsx", "ts", "js"],
      resolvers: [
        // 自动注册图标组件
        // IconsResolver({
        //   enabledCollections: ["ep"] //@iconify-json/ep 是 Element Plus 的图标库
        // }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "types", "components.d.ts") // (false) 配置文件生成位置，默认是根目录 /components.d.ts
    }),
    // 图片压缩
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 20 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: { plugins: [{ name: "removeViewBox" }, { name: "removeEmptyAttrs", active: false }] }
    }),
    // 预览分析打包
    viteEnv.VITE_APP_REPORT &&
      (visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true, open: true }) as PluginOption)
  ];
};
