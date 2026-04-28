import { createRouter, createWebHistory } from 'vue-router'
import { state } from '../store'
import TrackerView from '../views/TrackerView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { 
    path: '/', 
    name: 'tracker', 
    component: TrackerView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: LoginView 
  },
  { 
    path: '/profile', 
    name: 'profile', 
    component: ProfileView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !state.isAuth) {
    next({ name: 'login' })
  } else if (to.name === 'login' && state.isAuth) {
    next({ name: 'tracker' })
  } else {
    next()
  }
})

export default router
