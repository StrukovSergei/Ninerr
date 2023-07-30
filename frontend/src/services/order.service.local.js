import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

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
  filterBy = { txt: '', minPrice: 0, maxPrice: 0, category: '', delivery: 0 }
) {
  var orders = await storageService.query(STORAGE_KEY)

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
    orders = orders.filter((order) => order.categories.includes(filterBy.category))
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
//     _id: 'g101',
//     title: 'I will build responsive wordpress website design',
//     price: 12,
//     status: 'pending',
//     owner: {
//       _id: 'u101',
//       fullname: 'Dudu Da',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//       level: 'basic/premium',
//       rate: 4.8,
//       country: 'India',
//       since: 'Nov 2016',
//       response: '3 Hours',
//       lastDelivery: 'Just now',
//       language: ['English', 'Hindi'],
//       about: `I'm Abhi, a passionate graphic designer based in India, with 7+ years of experience. I've worked with many notable clients like Nike, Cisco, EA Sports, DC Pro, Fiverr internal communications, etc. I am specialized in Logo Design and Brand Identity design. I'm available : Mon/Sat- 12am/12pm(EST). Let's connect :)`,
//     },
//     daysToMake: 3,
//     description:
//       'I will design a professional, Mobile friendly, And user-friendly Website for your business/ Enterprises or an organization.',
//     imgUrls: [
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726966/q1msdqaht5dsqu22ip62.webp',
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726973/jjkh0hwshulmatnflwhz.webp',
//       'https://res.cloudinary.com/dcwibf9o5/image/upload/v1673726960/hm6yg2uc0c3ktwjnw2eg.webp',
//     ],
//     tags: ['proffesional', 'accessible'],
//     likedByUsers: ['mini-user'],
//     info: 'Modern and stylish website design with unlimited revisions',
//     features: [
//       'Fully responsive design',
//       'User-friendly interface',
//       'High-quality graphics',
//       'SEO optimized',
//     ],
//     categories: ['Graphics & Design', 'Digital Marketing'],
//   })
//   
// })()
