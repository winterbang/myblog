import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import './style.css'
import App from './App.vue'
import router from './router';
import components from '@/components'
const app = createApp(App)
app.use(components)
app.use(router)
app.mount('#app')