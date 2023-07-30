<template>
  <div class="header-main-layout main-layout full" :class="{
    scrolled: scrolled,
    'search-visible': searchVisible || !isHomePage,
    'categories-visible': categoriesVisible || !isHomePage,
    'header-position': !isHomePage
  }">
    <header class="header-container flex full">
      <RouterLink to="/" class="site-logo">
        <img src="../assets/imgs/main-logo.png" alt="" />
      </RouterLink>
      <div class="search">
        <input type="text" placeholder="What service are you looking for today?" v-model="searchText" />
        <button @click.prevent="searchGigs">
          <span class="search-icon" v-html="$svg('search')"></span>
        </button>
      </div>
      <div class="links">
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/user/:id">Become a Seller </RouterLink>
        <RouterLink :to="userProfile">
          <span v-if="loggedinUser" class="user-profile-photo">
            <img :src="userImg" alt="Profile Photo" />
          </span>
          <span v-else>
            <RouterLink to="/login">Login <span> Signup</span> </RouterLink>
          </span>
        </RouterLink>
      </div>
    </header>
    <section class="categories-menu-package full">
      <ul class="flex clean-list header-categories">
        <li @click="filterByCategory('Graphics & Design')">Graphics & Design</li>
        <li @click="filterByCategory('Digital Marketing')">Digital Marketing</li>
        <li @click="filterByCategory('Writing & Translation')">Writing & Translation</li>
        <li @click="filterByCategory('Video & Animation')">Video & Animation</li>
        <li @click="filterByCategory('Music & Audio')">Music & Audio</li>
        <li @click="filterByCategory('Programming & Tech')">Programming & Tech</li>
        <li @click="filterByCategory('Photography')">Photography</li>
        <li @click="filterByCategory('Business')">Business</li>
        <li @click="filterByCategory('AI Services')">AI Services</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      searchText: "",
      scrolled: false,
      searchVisible: false,
      categoriesVisible: false,
    }
  },

  mounted() {
    if (this.isHomePage) {
      window.addEventListener("scroll", this.handleScroll)
    } else {
      this.scrolled = true
    }
  },
  beforeDestroy() {
    if (this.isHomePage) {
      window.removeEventListener("scroll", this.handleScroll)
    }
  },
  computed: {
    isHomePage() {
      return this.$route.name === "Home"
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    userProfile() {
      if (!this.loggedinUser) return ""
      return "/user/" + this.loggedinUser._id
    },
    fullname() {
      if (!this.loggedinUser) return ""
      return this.loggedinUser.fullname
    },
    userImg() {
      if (!this.loggedinUser) return ""
      return this.loggedinUser.imgUrl
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  watch: {

  },
  methods: {
    searchGigs() {
      const searchQuery = this.searchText.trim()
      if (searchQuery) {
        this.$router.push({
          path: "/explore",
          query: { txt: searchQuery },
        })
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY

      const firstStageThreshold = 20
      const secondStageThreshold = 90


      this.scrolled = scrollPosition >= firstStageThreshold

      if (scrollPosition >= firstStageThreshold) {

      } else {
        this.searchVisible = false
      }

      if (scrollPosition >= secondStageThreshold) {
        this.categoriesVisible = true
        this.searchVisible = true
      } else {
        this.categoriesVisible = false
      }
    },
    filterByCategory(category) {
      const filterBy = { category, searchText: this.searchText }
      this.$store.dispatch({ type: "loadGigs", filterBy })

      const searchQuery = this.searchText.trim()
      if (searchQuery) {
        this.$router.push({
          path: "/explore",
          query: { txt: searchQuery, category },
        })
      } else {
        this.$router.push({
          path: "/explore",
          query: { category },
        })
      }
    },
  },
}
</script>
