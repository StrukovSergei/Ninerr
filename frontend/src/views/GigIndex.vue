<template>
  <div class="container home main-layout index-mobile-helper">
    <h1 class="main-index-title">{{ filterHeading }}</h1>
    <div class="gig-small-nav index-nav flex">
      <RouterLink class="home-icon" to="/">
        <span v-html="$svg('homeExplore')"></span>
      </RouterLink>
      <span class="small-devider">/</span>
      <RouterLink class="btn-back" to="/explore">All Gigs</RouterLink>
    </div>
    <section class="index-filter ">
      <div class="flex flex-wrap items-center">
        <el-dropdown trigger="click" placement="bottom-start" ref="dropdownBudget">
          <el-button type="primary">
            Budget <span v-html="$svg('arrowDown')"></span><el-icon class="el-icon--right"></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <div>
                <span class="demo-input-suffix">
                  <el-row :gutter="20" class="price-filter-section ">
                    <span class="input-min">
                      <span>MIN.</span>
                      <el-input type="number" v-model="minPrice" class="w-50 m-2" placeholder="Any" />
                    </span>
                    <span class="input-max">
                      <span>MAX.</span>
                      <el-input type="number" v-model="maxPrice" class="w-50 m-2" placeholder="Any" />

                    </span>
                    <span class="border-helper"></span>
                    <button class="btn-apply" @click="applyFilter">Apply</button>
                    <button class="btn-clear" @click="clearFilter('budget')">Clear All</button>
                  </el-row>
                </span>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex flex-wrap items-center">
        <el-dropdown trigger="click" placement="bottom-start" ref="dropdownDelivery">
          <el-button type="primary">
            Delivery time<span v-html="$svg('arrowDown')"></span><el-icon class="el-icon--right"></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>

              <div class="delivery-filter-section flex">
                <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="delivery" class="ml-4">
                    <el-radio label="3" size="large">Up to 3 days</el-radio>
                    <el-radio label="5" size="large">Up to 5 days</el-radio>
                    <el-radio label="" size="large">Anytime</el-radio>
                  </el-radio-group>
                </div>
                <span class="border-helper"></span>

                <div class="btn-container flex">
                  <button class="btn-clear" @click="clearFilter('delivery')">Clear All</button>
                  <button class="btn-apply" @click="applyFilter">Apply</button>
                </div>
              </div>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </section>
    <template v-if="showFilters">
      <div class="applied-filters flex">
        <div v-if="minPrice || (maxPrice && maxPrice !== 99999)" class="filter-pill" @click="clearFilter('budget')">
          {{ minPrice }}$ - {{ maxPrice }}$
          <button @click="clearFilter('budget')">✕</button>
        </div>
        <div v-if="delivery !== 999 && delivery" class="filter-pill" @click="clearFilter('delivery')">
          Up to {{ this.delivery }} days
          <button @click="clearFilter('delivery')">✕</button>
        </div>
      </div>
    </template>
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
      delivery: '',
      showFilters: false,
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
    filterHeading() {
      const hasCategoryFilter = this.$route.query.category
      if (hasCategoryFilter) {
        return this.$route.query.category
      } else {
        return "All services"
      }
    },

  },
  created() {
    this.updateHeadingFromQuery()
  },
  watch: {
    '$route.query': {
      handler(query) {
        const filterBy = {
          category: query.category || '',
          searchText: query.txt || '',
          minPrice: query.minPrice ? parseInt(query.minPrice) : null,
          maxPrice: query.maxPrice ? parseInt(query.maxPrice) : null,
          delivery: query.delivery ? parseInt(query.delivery) : null
        }
        this.$store.dispatch({ type: 'loadGigs', filterBy })
        this.updateHeadingFromQuery()
      },
      immediate: true,
    }
  },

  methods: {
    applyFilter(ev) {
      const filterBy = {
        txt: this.searchText,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        category: this.$route.query.category,
        delivery: this.delivery
      }
      const query = { ...this.$route.query, ...filterBy }
      this.$router.replace({ query })
      this.$refs.dropdownBudget.handleClose()
      this.$refs.dropdownDelivery.handleClose()
      this.showFilters = true
    },
    updateHeadingFromQuery() {
      if (this.$route.query.category) {
        // this.$store.dispatch({ type: 'loadGigs', filterBy: { category: this.$route.query.category } })
      }
    },
    clearFilter(filterType) {
      const query = { ...this.$route.query }
      if (filterType === 'budget') {
        query.minPrice = null
        query.maxPrice = null
        this.minPrice = null
        this.maxPrice = null
      } else if (filterType === 'delivery') {
        query.delivery = null
        this.delivery = ''
      }
      this.$router.replace({ query })
      this.showFilters = Object.values(query).some(val => val !== null && val !== '')
    },
  }
}



</script>
