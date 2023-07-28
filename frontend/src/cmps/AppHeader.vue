<template>
  <!-- <div :class="['header-main-layout full main-layout', { 'fixed-header': isHomePage }]"> -->
  <div class="header-main-layout main-layout full"
    :class="{ 'scrolled': scrolled, 'search-visible': searchVisible, 'categories-visible': categoriesVisible }">
    <header class="header-container flex">
      <RouterLink to="/" class="site-logo">

        <img src="../assets/imgs/main-logo.png" alt="">

      </RouterLink>
      <div class="search">
        <input type="text" placeholder="What service are you looking for today?" v-model="searchText">
        <button @click.prevent="searchGigs">
          <span class="search-icon" v-html="$svg('search')"></span>
        </button>
      </div>
      <div class="links">
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/user/:id">Become a Seller </RouterLink>
        <RouterLink :to="userProfile">
          <span v-if="loggedinUser" class="user-profile-photo">
            <img :src="userImg" alt="Profile Photo">
          </span>
          <span v-else>
            <RouterLink to="/login">Login <span> Signup</span> </RouterLink>
          </span>
        </RouterLink>
      </div>
    </header>
    <span class="border-helper full"></span>
    <section class="categories-menu-package ">
      <ul class="flex clean-list">
        <li>Graphics & Design</li>
        <li>Digital Marketing</li>
        <li>Writing & Translation</li>
        <li>Video & Animation</li>
        <li>Music & Audio</li>
        <li>Programming & Tech</li>
        <li>Photography</li>
        <li>Business</li>
        <li>AI Services</li>
      </ul>

    </section>
  </div>
</template>


<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      searchText: '',
      scrolled: false,
      searchVisible: false,
      categoriesVisible: false,
    }
  },
  mounted() {
    if (this.isHomePage) {
      window.addEventListener('scroll', this.handleScroll)
    } else {
      this.scrolled = true
    }
  },
  beforeDestroy() {
    if (this.isHomePage) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    },
    isHome() {
      return this.isHomePage ? (this.isDoubleScrolled ? 'grid' : 'none') : 'grid'
    },
    isDetailsPage() {
      return this.$route.path === '/gig/'
    },
    isDetails() {
      return this.isDetailsPage ? (this.isDoubleScrolled ? 'grid' : 'none') : 'grid'
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    userProfile() {
      if (!this.loggedinUser) return ''
      return '/user/' + this.loggedinUser._id
    },
    fullname() {
      if (!this.loggedinUser) return ''
      return this.loggedinUser.fullname
    },
    userImg() {
      if (!this.loggedinUser) return ''
      return this.loggedinUser.imgUrl
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },


  },
  watch: {
    '$route.params': {
      handler: function () {
        if (this.isHomePage) {
          window.scrollTo(0, 0)
        }
      },
    },
  },
  methods: {
    searchGigs() {
      const searchQuery = this.searchText.trim()
      if (searchQuery) {
        this.$router.push({
          path: '/explore',
          query: { txt: searchQuery },
        })
      }
    },
    handleScroll() {
      // Check the scroll position
      const scrollPosition = window.scrollY

      // Define the scroll thresholds for the two stages
      const firstStageThreshold = 20 // Adjust this value as needed
      const secondStageThreshold = 90 // Adjust this value as needed

      // Update the scrolled state based on the scroll position
      this.scrolled = scrollPosition >= firstStageThreshold

      // Show/hide the search input and categories-menu-package based on the scroll position
      if (scrollPosition >= firstStageThreshold) {
        // Show the search input
      } else {
        // Hide the search input
        this.searchVisible = false
      }

      if (scrollPosition >= secondStageThreshold) {
        // Show the categories-menu-package
        this.categoriesVisible = true
        this.searchVisible = true

      } else {
        // Hide the categories-menu-package
        this.categoriesVisible = false
      }
    },

  },


}

</script>