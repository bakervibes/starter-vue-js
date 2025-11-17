import AboutPage from '@/views/AboutPage.vue'
import HomePage from '@/views/HomePage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {
      title: 'About',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: '404 Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Update document title
  const title = to.meta.title as string | undefined
  if (title) {
    document.title = `${title} - ${import.meta.env.VITE_APP_NAME}`
  }

  next()
})

export default router
