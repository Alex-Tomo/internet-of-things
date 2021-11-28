import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Balance from '../views/Balance.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
