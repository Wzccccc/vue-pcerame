import { createRouter, createWebHashHistory } from 'vue-router'

import error from '../views/errorView/index.vue'
let routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    mate: {
      title: 'home'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: error,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router