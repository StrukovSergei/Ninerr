import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigDB'

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  // addGigMsg
}
window.cs = gigService

async function query(filterBy = { txt: '', price: 0 }) {
  var gigs = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }
  if (filterBy.price) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  }
  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
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

function getEmptyGig() {
  return {
    title: 'random gig',
    price: utilService.getRandomIntInclusive(10, 90),
  }
}

// Initial data
// ;(async () => {
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g101',
//     title: 'I will build responsive wordpress website design',
//     price: 12,
//     owner: {
//       _id: 'u101',
//       fullname: 'Dudu Da',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//       level: 'basic/premium',
//       rate: 4,
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
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: 'g102',
//     title: 'I will design best custom hand drawn logo with unlimited revisions',
//     price: 36,
//     owner: {
//       _id: 'u102',
//       fullname: 'Budu Ba',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg',
//       level: 'basic/premium',
//       rate: 2,
//     },
//     daysToMake: 7,
//     description:
//       'Talented Logo Maker Team, Fully custom made, creative, original, UNIQUE and AWESOME designs',
//     imgUrls: [
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/ddf38ce88cd6f0ab8ee9c1097f3727a452715f19_xknjtm.webp',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/14c7f411ab4958c13cccf3f46e6b3be04797ce59_cp8j4w.webp',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/Doc_2_swjqrg_gvb7az.jpg',
//       'https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579338/samples/higherr/ee19f64d39ae8a60c7f7fe39895f733698981c99_sadnfj.webp',
//     ],
//     tags: ['logo-design', 'proffesional'],
//     likedByUsers: ['mini-user'],
//   })
// })()
