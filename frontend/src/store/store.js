import Vuex from 'vuex'
import { orderStore } from './order.store.js'
import { userStore } from './user.store.js'
import { gigStore } from './gig.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    gigStore,
    reviewStore,
    orderStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
