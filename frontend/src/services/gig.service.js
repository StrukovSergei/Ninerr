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

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('gig', filterBy)
}
function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)
    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

// async function addCarMsg(carId, txt) {
//     const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
//     return savedMsg
// }


function getEmptyGig() {
    return {
        title: 'random gig' ,
        price: utilService.getRandomIntInclusive(10, 90),
    }
}