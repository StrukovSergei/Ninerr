<template>
  <div class="container home">
    <GigList v-if="gigs" :gigs="filteredGigs" />

  </div>
</template>

<script>
import GigList from '../cmps/GigList.vue'
import { gigService } from '../services/gig.service.local'

export default {
  name: 'GigIndex',
  components: { GigList },
  data() {
    return {
      searchText: '',
      gigs: []
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    filteredGigs() {
      return this.$store.getters.gigs
    },
  },
  created() {
   
  },
  watch: {

    '$route.query': {
      handler() {
        this.$store.dispatch({ type: 'loadGigs', filterBy: this.$route.query })
      },
      immediate: true,
    }

  },



}
</script>
