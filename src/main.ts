import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, PieChart, LineChart } from 'echarts/charts'
import { GeoComponent, VisualMapComponent } from 'echarts/components'
import chinaGeoJSON from '@/assets/china.json'
import App from './App.vue'
import './style.css'
import 'ant-design-vue/dist/antd.variable.min.css'

use([CanvasRenderer, MapChart, PieChart, LineChart, GeoComponent, VisualMapComponent])
registerMap('china', chinaGeoJSON as any)

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
