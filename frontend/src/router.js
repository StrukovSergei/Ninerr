import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import GigIndex from './views/GigIndex.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import SellerPage from './views/SellerPage.vue'
import GigDetails from './views/GigDetails.vue'
import Payment from './views/Payment.vue'
import SellerRegister from './views/SellerRegister.vue'
import MobileCategory from './cmps/MobileCategory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mobileCategory',
    name: 'MobileCategory',
    component: MobileCategory,
  },
  {
    path: '/explore',
    name: 'GigIndex',
    component: GigIndex,
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: ReviewIndex,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup,
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails,
  },
  {
    path: '/register/:id',
    name: 'SellerRegister',
    component: SellerRegister,
  },
  {
    path: '/seller/:id',
    name: 'SellerPage',
    component: SellerPage,
  },
  {
    path: '/gig/:gigId',
    name: 'gig-details',
    component: GigDetails,
  },
  {
    path: '/payment/:gigId',
    name: 'payment-details',
    component: Payment,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
