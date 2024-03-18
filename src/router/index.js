import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      beforeEnter: (to, from, next) => {
        next({name: 'not-found'})
      }
    }
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    return to.hash
      ? {el: to.hash, behavior: 'smooth'}
      : { top: 0, behavior: 'smooth' }
  }
})

export default router
