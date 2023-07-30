import { orderService } from '../services/order.service.local'
// import { gigService } from '../services/gig.service'

export function getActionRemoveOrder(orderId) {
  return {
    type: 'removeOrder',
    orderId,
  }
}
export function getActionAddOrder(order) {
  return {
    type: 'addOrder',
    order,
  }
}
export function getActionUpdateOrder(order) {
  return {
    type: 'updateOrder',
    order,
  }
}
// export function getActionAddCarMsg(carId) {
//     return {
//         type: 'addCarMsg',
//         carId,
//         txt: 'Stam txt'
//     }
// }

export const orderStore = {
  state: {
    orders: [],
  },
  getters: {
    orders({ orders }) {
      return orders
    },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders
    },
    addOrder(state, { order }) {
      state.orders.push(order)
    },
    updateOrder(state, { order }) {
      const idx = state.orders.findIndex((o) => o._id === order._id)
      state.orders.splice(idx, 1, order)
    },
    removeOrder(state, { orderId }) {
      state.orders = state.orders.filter((order) => order._id !== orderId)
    },

  },
  actions: {
    async addOrder(context, { order }) {
      try {
        order = await orderService.save(order)
        context.commit(getActionAddOrder(order))
        return order
      } catch (err) {
        console.log('orderStore: Error in addOrder', err)
        throw err
      }
    },
    async updateOrder(context, { order }) {
      try {
        order = await orderService.save(order)
        context.commit(getActionUpdateOrder(order))
        return order
      } catch (err) {
        console.log('orderStore: Error in updateOrder', err)
        throw err
      }
    },
    async loadOrder(context, { filterBy }) {
      try {
        const orders = await orderService.query(filterBy)
        context.commit({ type: 'setOrders', orders })
      } catch (err) {
        console.log('orderStore: Error in loadOrder', err)
        throw err
      }
    },
    async removeOrder(context, { orderId }) {
      try {
        await orderService.remove(orderId)
        context.commit(getActionRemoveOrder(orderId))
      } catch (err) {
        console.log('orderStore: Error in removeOrder', err)
        throw err
      }
    },

  },
}

