import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes //
})

router.beforeEach((to, from) => {
  if (to.path === '/login') return true
  if (localStorage.getItem('token')) return true
  return false
})

export default router
