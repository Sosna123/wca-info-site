import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Comps from '../views/Comps.vue'
import Stats from '../views/Stats.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/comps',
    name: 'comps',
    component: Comps
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
