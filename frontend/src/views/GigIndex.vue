<template>
  <div class="container home main-layout">
    <div class="filter-section ">
      <input type="number" v-model="minPrice" placeholder="Min Price" />
      <input type="number" v-model="maxPrice" placeholder="Max Price" />
      <button @click="applyFilter">Apply Filter</button>
    </div>
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
      minPrice: null,
      maxPrice: null,
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
        this.minPrice = query.minPrice ? parseInt(query.minPrice) : null
        this.maxPrice = query.maxPrice ? parseInt(query.maxPrice) : null
        const filterBy = { category: query.category, searchText: this.searchText, minPrice: this.minPrice, maxPrice: this.maxPrice,}
        this.$store.dispatch({ type: 'loadGigs', filterBy })
      },
      immediate: true,
    }

  },

  methods: {
    applyFilter() {
      const filterBy = {
        txt: this.searchText,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        category: this.$route.query.category 
      }

      const query = { ...this.$route.query, ...filterBy }
      this.$router.push({ path: this.$route.path, query })
    }
  }
}



</script>
