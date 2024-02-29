import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('@user'))
  try {
    console.log('Checking authentication...')
    if (user) {
      return user
    }
    return user
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

const guestGuard = (to, from, next) => {
  if (!isAuthenticated()) {
    next()
  } else {
    next('/')
  }
}

const userGuard = (to, from, next) => {
  if (isAuthenticated()) {
    next()
  } else {
    next('/login')
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '../views/LoginView.vue'),
    beforeEnter: guestGuard 
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'signup' */ '../views/RegisterView.vue'),
    beforeEnter: guestGuard
  },
  {
    path: '/score',
    name: 'score',
    component: () => import(/* webpackChunkName: 'score' */ '../views/ScoreView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: 'logout' */ '../views/ProfilView.vue'),
    beforeEnter: userGuard
  },
  {
    path: '/quizz',
    name: 'randomquizz',
    component: () => import(/* webpackChunkName: 'logout' */ '../views/QuizzView.vue'),
    beforeEnter: userGuard
  },
  {
    path: '/quizz/:id',
    name: 'quizz',
    component: () => import(/* webpackChunkName: 'logout' */ '../views/QuizzView.vue'),
    beforeEnter: userGuard
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: 'category' */ '../views/CategoriesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
