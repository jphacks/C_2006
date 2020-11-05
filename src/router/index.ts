import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue';
import firebase from "firebase/app";
import 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/',
    component: Tabs,
    meta: { requiresAuth: true },
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
      },
      {
        path: 'edit/name',
        component: () => import('@/views/editName.vue')
      },
      {
        path: 'edit/email',
        component: () => import('@/views/editEmail.vue')
      },
      {
        path: 'edit/password',
        component: () => import('@/views/editPassword.vue')
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/signin.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    component: () => import('@/views/signup.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next();
  }
})

export default router
