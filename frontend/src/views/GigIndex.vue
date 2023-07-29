<template>
  <div class="container home">
    <GigList v-if="gigs" :gigs="filteredGigs" />

  </div>
</template>

<script>
import GigList from '../cmps/GigList.vue'

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
      handler(query) {
        this.searchText = query.txt || ''
        const filterBy = { category: query.category, searchText: this.searchText }
        this.$store.dispatch({ type: 'loadGigs', filterBy })
      },
      immediate: true,
    }

  },



}
</script>
