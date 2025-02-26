import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import './src/style.css'
import './src/assets/css/md.css'
import App from './src/App.vue'
import router from './src/router';
const app = createApp(App)
app.use(router)
app.mount('#app')