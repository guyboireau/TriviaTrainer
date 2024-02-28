import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from 'firebase/auth'

const auth = getAuth()

// Fonction pour vérifier si l'utilisateur est connecté
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('@user'))
  try {
    return user
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

// Garde de navigation pour restreindre l'accès aux routes 'login' et 'logout' aux utilisateurs non connectés
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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: 'about' */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '../views/LoginView.vue'),
    beforeEnter: guestGuard // Utilisation de la garde de navigation pour restreindre l'accès aux utilisateurs non connectés
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
    component: () => import(/* webpackChunkName: 'logout' */ '../views/LoginView.vue'),
    beforeEnter: userGuard
  },
  {
    path: '/randomquizz',
    name: 'logout',
    component: () => import(/* webpackChunkName: 'logout' */ '../views/QuizzView.vue'),
    beforeEnter: userGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
