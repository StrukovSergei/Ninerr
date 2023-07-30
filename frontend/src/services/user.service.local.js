import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
}

window.userService = userService

function getUsers() {
  return storageService.query('user')
}

async function getById(userId) {
  const user = await storageService.get('user', userId)
  return user
}

function remove(userId) {
  return storageService.remove('user', userId)
}

async function update({ _id, score }) {
  const user = await storageService.get('user', _id)
  user.score = score
  await storageService.put('user', user)

  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const users = await storageService.query('user')
  const user = users.find((user) => user.username === userCred.username)
  if (user) {
    return saveLocalUser(user)
  }
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await storageService.post('user', userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}


function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveUsersToFile() {
  return new Promise((resolve, reject) => {
    const usersStr = JSON.stringify(users, null, 2)
    fs.writeFile('data/user.json', usersStr, (err) => {
      if (err) {
        return console.log(err)
      }
      resolve()
    })
  })
}

// Initial data
// ;(async () => {
//   await userService.signup({
//     _id: 'u101',
//     isSeller: true,
//     fullname: 'User 1',
//     imgUrl: '/img/img1.jpg',
//     username: 'user1',
//     password: '123',
//     level: 'basic/premium',
//     reviews: [
//       {
//         id: 'madeId',
//         gig: '{optional-mini-gig}',
//         txt: 'Very kind and works fast',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'user2',
//           imgUrl: '/img/img2.jpg',
//         },
//       },
//     ],
//   })
//   await userService.signup({
//     _id: 'u102',
//     fullname: 'User 2',
//     imgUrl: '/img/img2.jpg',
//     username: 'user2',
//     password: '123',
//     level: 'basic/premium',
//     reviews: [
//       {
//         id: 'madeId',
//         gig: '{optional-mini-gig}',
//         txt: 'Very kind and works fast',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'user2',
//           imgUrl: '/img/img2.jpg',
//         },
//       },
//     ],
//   })
//   await userService.signup({
//     _id: 'u103',
//     isSeller: true,
//     fullname: 'User 3',
//     imgUrl: '/img/img3.jpg',
//     username: 'user3',
//     password: '123',
//     level: 'basic/premium',
//     reviews: [
//       {
//         id: 'madeId',
//         gig: '{optional-mini-gig}',
//         txt: 'Very kind and works fast',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'user1',
//           imgUrl: '/img/img1.jpg',
//         },
//       },
//     ],
//   })
// })()
