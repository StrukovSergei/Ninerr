import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'orderDB'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  // addGigMsg
}
window.cs = orderService

async function query(
  filterBy = {
    txt: '',
    minPrice: 0,
    maxPrice: 0,
    category: '',
    delivery: 0,
    id: '',
    buyerId: '',
  }
) {
  var orders = await storageService.query(STORAGE_KEY)

  if (filterBy.id) {
    orders = orders.filter((order) => order.sellerId === filterBy.id)
  }

  if (filterBy.buyerId) {
    orders = orders.filter((order) => order.buyerId === filterBy.buyerId)
  }

  if (filterBy.searchText) {
    const regex = new RegExp(filterBy.searchText, 'i')
    orders = orders.filter(
      (order) => regex.test(order.title) || regex.test(order.description)
    )
  }

  if (filterBy.minPrice) {
    orders = orders.filter((order) => order.price >= filterBy.minPrice)
  }

  if (filterBy.maxPrice) {
    orders = orders.filter((order) => order.price <= filterBy.maxPrice)
  }
  if (filterBy.delivery) {
    orders = orders.filter((order) => order.daysToMake <= filterBy.delivery)
  }

  if (filterBy.category) {
    orders = orders.filter((order) =>
      order.categories.includes(filterBy.category)
    )
  }

  return orders
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    // Later, owner is set by the backend
    order.owner = userService.getLoggedinUser()
    savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}

// async function addCarMsg(carId, txt) {
//     // Later, this is all done by the backend
//     const car = await getById(carId)
//     if (!car.msgs) car.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     car.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, car)

//     return msg
// }

function getEmptyOrder() {
  return {
    title: 'random order',
    price: utilService.getRandomIntInclusive(10, 90),
  }
}

// Initial data
// ;(async () => {
//   await storageService.post(STORAGE_KEY, {
//     _id: 'o101',
//     sellerId: 'u101',
//     buyerId: 'u102',
//     gigId: 'g101',
//     price: 123,
//     status: 'pending',
//     level: 'basic/premium',
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'o102',
//     sellerId: 'u101',
//     buyerId: 'u103',
//     gigId: 'g104',
//     price: 123,
//     status: 'rejected',
//     level: 'basic/premium',
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'o103',
//     sellerId: 'u103',
//     buyerId: 'u102',
//     gigId: 'g106',
//     price: 123,
//     status: 'completed',
//     level: 'basic/premium',
//   })
// })()
