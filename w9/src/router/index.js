import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BreakoutView from '../views/BreakoutView.vue'
import SnakeView from '../views/SnakeView.vue'
import RacingView from '../views/RacingView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/games/breakout', name: 'breakout', component: BreakoutView },
    { path: '/games/snake', name: 'snake', component: SnakeView },
    { path: '/games/racing', name: 'racing', component: RacingView },
    { path: '/games/runner', redirect: '/games/snake' },
    { path: '/games/coin', redirect: '/games/racing' },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
