import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'//elementPlus自动导入插件
import Components from 'unplugin-vue-components/vite'//elementPlus自动导入插件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'//elementPlus自动导入插件

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@@', replacement: path.resolve(__dirname, './src/') }]
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数
      imports: ['vue', 'vue-router', 'pinia'],
      //elementPlus自动导入函数配置
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: false,
    }),
    Components({//elementPlus自动导入组件配置
      dts: false,
      resolvers: [
        ElementPlusResolver()
      ],

    }),

  ],
  server: {
    host: '192.168.1.3',//设置IP
    port: 9090,//设置端口
    strictPort: true,//若端口被占用不自动寻找下一个可用端口
    proxy: {
      '/api': {//设置跨域
        target: 'http://192.168.1.3:28019',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      },
      // '/socket.io': {//设置长连接
      //   target: 'ws://localhost:5174',
      //   ws: true,
      // }
    }
  }


})
