import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/itemList',
    name: 'ItemList',
    component: () => import(/* webpackChunkName: "itemList" */ '../views/ItemList.vue')
  },
  {
    path: '/voteItem/:id',
    name: 'VoteItem',
    component: () => import(/* webpackChunkName: "voteIte," */ '../views/VoteItem.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
