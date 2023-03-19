import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//全局注册elementui图标
import cloneDeep from 'lodash.clonedeep' //全局注册深复制方法

const app = createApp(App)
//注册路由
app.use(router)
//注册仓库
const pinia = createPinia()
app.use(pinia)
//挂载
app.mount('#app')
//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



