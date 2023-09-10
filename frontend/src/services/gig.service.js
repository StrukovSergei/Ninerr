import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  // addCarMsg
}

window.cs = gigService // for console usage

async function query(
  filterBy = {
    txt: '',
    minPrice: 0,
    maxPrice: 0,
    category: '',
    delivery: 0,
    id: '',
  }
) {
  let gigs = []
  if (filterBy.searchText) {
    const regex = new RegExp(filterBy.searchText, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }

  if (filterBy.minPrice) {
    gigs = gigs.filter((gig) => gig.price >= filterBy.minPrice)
  }

  if (filterBy.maxPrice) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.maxPrice)
  }

  if (filterBy.delivery) {
    gigs = gigs.filter((gig) => gig.daysToMake <= filterBy.delivery)
  }

  if (filterBy.category) {
    gigs = gigs.filter((gig) => gig.categories.includes(filterBy.category))
  }

  if (filterBy.id) {
    gigs = gigs.filter((gig) => gig.owner._id.includes(filterBy.id))
  }

  return httpService.get('gig', filterBy)
}

function getById(gigId) {
  return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
  return httpService.delete(`gig/${gigId}`)
}

async function save(gig) {
  let savedGig
  if (gig._id) {
    savedGig = await httpService.put(`gig/${gig._id}`, gig)
  } else {
    savedGig = await httpService.post('gig', gig)
  }
  return savedGig
}

function getEmptyGig() {
  return {
    title: 'random gig',
    price: utilService.getRandomIntInclusive(10, 90),
  }
}
