import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/pages/login.vue'
import Home from '@/pages/home.vue'
import List from '@/pages/list.vue'
import Outing from '@/pages/outing/index.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/list',
    component: List,
    redirect: '/list/outing',
    children: [
      {
        path: 'outing',
        component: Outing
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach(to => {
//   if (to.path === '/login') return true
//   if (localStorage.getItem('token')) return true
//   else {
//     return { path: '/login' }
//   }
// })

export default router
