import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service.local'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'



// ; (() => {
//   setTimeout(() => {
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//       console.log('GOT from socket', review)
//       store.commit({ type: 'addReview', review })
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//       showSuccessMsg(`New review about me ${review.txt}`)
//     })
//   }, 0)

// })()



export const reviewService = {
  add,
  query,
  remove,
  getEmptyReview
}



async function query(filterBy) {
  var reviews = await storageService.query('reviewDB')




  return reviews
}

async function remove(reviewId) {
  await storageService.delete('review', reviewId)

}

async function add({ txt, aboutUserId }) {
  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getEmptyReview() {
  return {
    txt: '',
    aboutUserId: null
  }
}

// ; (async () => {
//   await storageService.post('reviewDB', {
//     _id: 'r101',
//     title: 'Received great service.',
//     rate: 4.8,
//     by: {
//       _id: 'u201',
//       fullname: 'Riri Ra',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//       country: 'India',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r102',
//     title: 'Great work, thank you!',
//     rate: 5,
//     by: {
//       _id: 'u202',
//       fullname: 'Didi Da',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//       country: 'Canada',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r103',
//     title: 'Excellent experience!',
//     rate: 4.9,
//     by: {
//       _id: 'u203',
//       fullname: 'Sam Smith',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/24530948/original/FullSizeRender_%281%29.jpg',
//       country: 'United States',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r104',
//     title: 'Highly recommended!',
//     rate: 4.7,
//     by: {
//       _id: 'u204',
//       fullname: 'Lara Johnson',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/40153225/original/1469735736947_facebook20160728-9109-1m1oi7f.jpg',
//       country: 'Australia',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r105',
//     title: 'Fantastic service!',
//     rate: 5,
//     by: {
//       _id: 'u205',
//       fullname: 'Carlos Gonzalez',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/e404a55aef3e3cfe03a3da0d1f2dcf86-1679402460852/8b769309-2bb3-4593-91b2-25675ae0e9b1.jpg',
//       country: 'Spain',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r106',
//     title: 'Quick and efficient!',
//     rate: 4.6,
//     by: {
//       _id: 'u206',
//       fullname: 'Emily Chen',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/661e208a7d5a6c5a9d05420d6453ca13-1525843406909/4da9177e-efb6-4c8d-9016-d7926689d494.jpeg',
//       country: 'China',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r107',
//     title: 'Awesome work!',
//     rate: 4.9,
//     by: {
//       _id: 'u207',
//       fullname: 'John Wilson',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/62d6bc1f2339610c16071c5b7c25c2f7-1503916959060/cf6ffea6-be90-4c77-9bf5-e65aec239d1b.jpg',
//       country: 'United Kingdom',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r108',
//     title: 'Outstanding service!',
//     rate: 5,
//     by: {
//       _id: 'u208',
//       fullname: 'Sophie Martin',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8fe71971ee80a373c812b2ed0511b067-1663498320997/1bba7e50-72af-47a6-812b-7fe0368cecb5.jpg',
//       country: 'France',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r109',
//     title: 'Very professional!',
//     rate: 4.8,
//     by: {
//       _id: 'u209',
//       fullname: 'Hiroshi Tanaka',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/34c10238fa2fd7ead8be6c23e56cfbb8-1111901021650290718.481151/E62B200A-06C4-4DC3-9CD8-FFD870500115',
//       country: 'Japan',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r110',
//     title: 'Amazing job!',
//     rate: 4.7,
//     by: {
//       _id: 'u210',
//       fullname: 'Maria Rodriguez',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2427cf32f978ab2a32e38f313fe0dd8a-1672766316702/889e66db-ca98-465b-8ec5-1a3c8137b266.png',
//       country: 'Mexico',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r111',
//     title: 'Top-notch service!',
//     rate: 5,
//     by: {
//       _id: 'u211',
//       fullname: 'Antonio Rossi',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/55420/original/RcGy4dL5i.jpeg',
//       country: 'Italy',
//     },
//   })
//   await storageService.post('reviewDB', {
//     _id: 'r112',
//     title: 'Impressed!',
//     rate: 4.9,
//     by: {
//       _id: 'u212',
//       fullname: 'Anna Nguyen',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/75f54908a7fac25c7ffa046c6c4bab8f-1611050334725/3bba988f-bf47-443f-be63-37df0646c311.png',
//       country: 'Vietnam',
//     },
//   })

// })
