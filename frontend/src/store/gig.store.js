// import { gigService } from '../services/gig.service.local'
import { gigService } from '../services/gig.service'

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
  },
  actions: {
    async addGig(context, { gig }) {
      console.log('🚀 ~ file: gig.store.js:49 ~ addGig ~ gig:', gig)
      try {
        gig = await gigService.save(gig)
        console.log('🚀 ~ file: gig.store.js:52 ~ addGig ~ gig:', gig)
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
    async loadGigs({ commit }, { filterBy }) {
      try {
        const gigs = await gigService.query(filterBy)
        console.log('🚀 ~ file: gig.store.js:71 ~ loadGigs ~ gigs:', gigs)
        commit({ type: 'setGigs', gigs })
      } catch (err) {
        console.log('gigStore: Error in loadGigs', err)
        // throw err
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
  },
}
