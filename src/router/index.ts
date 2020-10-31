import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'stock'
      },
      {
        path: 'stock',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'search',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'mypage',
        component: () => import('@/views/Tab3.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/setting.vue')
      },
      {
        path: 'compose',
        component: () => import('@/views/postCompose.vue')
      },
      {
        path: 'post/:id',
        component: () => import('@/views/postDetail.vue')
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/signin.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/signup.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
