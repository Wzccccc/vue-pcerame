import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置别名 如报错需要安装 @types/node 
import { resolve } from "path";
// 可在 setup 上自定义name
import VueSetupExtend from 'vite-plugin-vue-setup-extend'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  // ↓解析配置
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }

})
