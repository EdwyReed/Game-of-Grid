import {createRouter, createWebHistory} from 'vue-router/auto'
import auth from "../pages/auth.vue";
import game from "../pages/game.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/auth'},
    {path: '/auth', component: auth},
    {path: '/game', component: game},
  ]
})

export default router
