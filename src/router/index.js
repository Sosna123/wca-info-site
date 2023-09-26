import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Comps from '../views/Comps.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
