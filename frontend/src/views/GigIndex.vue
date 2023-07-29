<template>
  <div class="container home main-layout">
    <section class="index-filter">
      <div class="price-filter-section">
        <input type="number" v-model="minPrice" placeholder="Min Price" />
        <input type="number" v-model="maxPrice" placeholder="Max Price" />
        <button @click="applyFilter">Apply</button>
      </div>
      <div class="delivery-filter-section">
        <label>
          <input type="radio" v-model="deliveryTime" value="3" />
          Up to 3 days
        </label>
        <label>
          <input type="radio" v-model="deliveryTime" value="5" />
          Up to 5 days
        </label>
        <label>
          <input type="radio" v-model="deliveryTime" value="" />
          Anytime
        </label>
        <button @click="applyFilter">Apply</button>
      </div>
    </section>
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
      deliveryTime: '',
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
        this.deliveryTime = query.deliveryTime ? parseInt(query.deliveryTime) : null
        const filterBy = { category: query.category, searchText: this.searchText, minPrice: this.minPrice, maxPrice: this.maxPrice, delivery: this.deliveryTime }
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
        category: this.$route.query.category,
        deliveryTime: this.deliveryTime
      }

      const query = { ...this.$route.query, ...filterBy }
      this.$router.push({ path: this.$route.path, query })
    },

  }
}



</script>
