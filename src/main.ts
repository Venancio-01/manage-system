import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from '@/router'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, PieChart, LineChart, LinesChart, EffectScatterChart, BarChart } from 'echarts/charts'
import { GeoComponent, VisualMapComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import chinaGeoJSON from '@/assets/china.json'
import App from './App.vue'
import './style.css'
import 'ant-design-vue/dist/antd.variable.min.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

use([
  CanvasRenderer,
  MapChart,
  PieChart,
  LineChart,
  GeoComponent,
  VisualMapComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LinesChart,
  BarChart,
  EffectScatterChart
])
registerMap('china', chinaGeoJSON as any)

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)
app.use(router)
app.mount('#app')
