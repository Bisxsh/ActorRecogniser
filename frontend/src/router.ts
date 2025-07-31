import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./Pages/landing.vue'),
  },
  {
    path: '/app',
    name: 'Identifier',
    component: () => import('./Pages/identifier.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
