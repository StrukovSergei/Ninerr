import { gigService } from '../services/gig.service.local'
// import { gigService } from '../services/gig.service'

export function getActionRemoveGig(gigId) {
  return {
    type: 'removeGig',
    gigId,
  }
}
export function getActionAddGig(gig) {
  return {
    type: 'addGig',
    gig,
  }
}
export function getActionUpdateGig(gig) {
  return {
    type: 'updateGig',
    gig,
  }
}
// export function getActionAddCarMsg(carId) {
//     return {
//         type: 'addCarMsg',
//         carId,
//         txt: 'Stam txt'
//     }
// }

export const gigStore = {
  state: {
    gigs: [],
  },
  getters: {
    gigs({ gigs }) {
      return gigs
    },
  },
  mutations: {
    setGigs(state, { gigs }) {
      state.gigs = gigs
    },
    addGig(state, { gig }) {
      state.gigs.push(gig)
    },
    updateGig(state, { gig }) {
      const idx = state.gigs.findIndex((g) => g._id === gig._id)
      state.gigs.splice(idx, 1, gig)
    },
    removeGig(state, { gigId }) {
      state.gigs = state.gigs.filter((gig) => gig._id !== gigId)
    },
    // addGigMsg(state, { gigId , msg}) {
    //     const gig = state.gigs.find(gig => gig._id === gigId)
    //     if (!gig.msgs) gig.msgs = []
    //     gig.msgs.push(msg)
    // },
  },
  actions: {
    async addGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        context.commit(getActionAddGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in addGig', err)
        throw err
      }
    },
    async updateGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        context.commit(getActionUpdateGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in updateGig', err)
        throw err
      }
    },
    async loadGigs(context) {
      try {
        const gigs = await gigService.query()
        console.log('gigs', gigs)
        context.commit({ type: 'setGigs', gigs })
      } catch (err) {
        console.log('gigStore: Error in loadGigs', err)
        throw err
      }
    },
    async removeGig(context, { gigId }) {
      try {
        await gigService.remove(gigId)
        context.commit(getActionRemoveGig(gigId))
      } catch (err) {
        console.log('gigStore: Error in removeGig', err)
        throw err
      }
    },
    // async addCarMsg(context, { carId, txt }) {
    //     try {
    //         const msg = await carService.addCarMsg(carId, txt)
    //         context.commit({type: 'addCarMsg', carId, msg })
    //     } catch (err) {
    //         console.log('carStore: Error in addCarMsg', err)
    //         throw err
    //     }
    // },
  },
}
