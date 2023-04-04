import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import 'ant-design-vue/dist/antd.variable.min.css'
import './style.css'


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')