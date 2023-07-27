<template>
  <div class="container home">
    <GigList v-if="gigs" :gigs="filteredGigs" />

  </div>
</template>

<script>
import GigList from '../cmps/GigList.vue'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig.service.local'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'

export default {
  name: 'GigIndex',
  components: { GigList },
  data() {
    return {
      gigToAdd: gigService.getEmptyGig(),
      searchText: '',
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    gigs() {
      return this.$store.getters.gigs
    },
    filteredGigs() {
      const searchQuery = this.$route.query.txt
      if (!searchQuery) return this.gigs
      const regex = new RegExp(searchQuery, 'i')
      return this.gigs.filter(
        (gig) => regex.test(gig.title) || regex.test(gig.description)
      )
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadGigs' })
    this.searchText = this.$route.query.txt || ''
  },
  watch: {
    '$route.query.txt'(newSearchText) {
      this.searchText = newSearchText || ''
    },
    searchText(newSearchText) {
      this.$router.replace({ query: { ...this.$route.query, txt: newSearchText } })
    },
  },
  methods: {
    async addGig() {
      try {
        await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
        showSuccessMsg('Gig added')
        this.gigToAdd = gigService.getEmptyGig()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add gig')
      }
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId))
        showSuccessMsg('Gig removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove gig')
      }
    },
    async updateGig(gig) {
      try {
        gig = { ...gig }
        gig.price = +prompt('New price?', gig.price)
        await this.$store.dispatch(getActionUpdateGig(gig))
        showSuccessMsg('Gig updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update gig')
      }
    },
    // async addGigMsg(gigId) {
    //   try {
    //     await this.$store.dispatch(getActionAddGigMsg(gigId))
    //     showSuccessMsg('Gig msg added')
    //   } catch(err) {
    //     console.log(err)
    //     showErrorMsg('Cannot add gig msg')
    //   }
    // },
    // printGigToConsole(gig) {
    //   console.log('Gig msgs:', Gig.msgs)
    // }
  }


}
</script>
