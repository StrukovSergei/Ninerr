<template>
  <div class="container home main-layout">
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
        <el-dropdown trigger="click" placement="bottom-start">
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
                    <button @click="applyFilter">Apply</button>

                  </el-row>
                </span>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex flex-wrap items-center">
        <el-dropdown trigger="click" placement="bottom-start">
          <el-button type="primary">
            Delivery time<span v-html="$svg('arrowDown')"></span><el-icon class="el-icon--right"></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>

              <div class="delivery-filter-section flex">
                <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="deliveryTime" class="ml-4">
                    <el-radio label="3" size="large">Up to 3 days</el-radio>
                    <el-radio label="5" size="large">Up to 5 days</el-radio>
                    <el-radio label="" size="large">Anytime</el-radio>
                  </el-radio-group>
                </div>
                <button @click="applyFilter">Apply</button>
              </div>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
      visible: false,
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
        this.searchText = query.txt || ''
        this.minPrice = query.minPrice ? parseInt(query.minPrice) : null
        this.maxPrice = query.maxPrice ? parseInt(query.maxPrice) : null
        this.deliveryTime = query.deliveryTime ? parseInt(query.deliveryTime) : null
        const filterBy = { category: query.category, searchText: this.searchText, minPrice: this.minPrice, maxPrice: this.maxPrice, delivery: this.deliveryTime }
        this.$store.dispatch({ type: 'loadGigs', filterBy })
        this.updateHeadingFromQuery()
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
    updateHeadingFromQuery() {
      if (this.$route.query.category) {
        this.$store.dispatch({ type: 'loadGigs', filterBy: { category: this.$route.query.category } })
      }
    },

  }
}



</script>
