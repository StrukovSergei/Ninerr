import { httpService } from './http.service'
import { showSuccessMsg } from './event-bus.service'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

  ; (() => {
    setTimeout(() => {
      socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
        console.log('GOT from socket', review)
        store.commit({ type: 'addReview', review })
      })
      socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
        showSuccessMsg(`New review about me ${review.txt}`)
      })
    }, 0)

  })()

export const orderService = {
  add,
  query,
  remove,
  save,
  getEmptyOrder
}

function query(filterBy) {

  let orders = []

  if (filterBy.sellerId) {
    orders = orders.filter((order) => order.sellerId.includes(filterBy.sellerId))
  }
  if (filterBy.buyerId) {
    orders = orders.filter((order) => order.buyerId.includes(filterBy.buyerId))
  }

  return httpService.get('order', filterBy)
}

async function remove(orderId) {
  await httpService.delete(`order/${orderId}`)
}

async function add({ txt, aboutUserId }) {
  return httpService.post(`order`, { txt, aboutUserId })
}

function getEmptyOrder() {
  return {
    txt: '',
    aboutUserId: null
  }
}

async function save(order) {
  let savedOrder
  if (order._id) {
    savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}