import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/pages/login.vue'
import Home from '@/pages/home.vue'
import storage from '@/utils/storage'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/outing',
    redirect: '/outing/list',
    component: () => import('@/pages/outing/index.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/pages/outing/list.vue')
      },
      {
        path: 'statistics',
        component: () => import('@/pages/outing/statistics.vue')
      }
    ]
  },
  {
    path: '/accident',
    component: () => import('@/pages/accident/list.vue')
  },
  {
    path: '/discipline',
    component: () => import('@/pages/discipline/index.vue'),
    redirect: '/discipline/list',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/discipline/list.vue')
      },
      {
        path: 'statistics',
        component: () => import('@/pages/discipline/statistics.vue')
      }
    ]
  },
  {
    path: '/policy',
    component: () => import('@/pages/policy/list.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  if (to.path === '/login') return true
  if (storage.getToken()) return true
  else {
    return { path: '/login' }
  }
})

export default router
