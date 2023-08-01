<template>
  <div class="header-main-layout main-layout full" :class="{
    scrolled: scrolled,
    'search-visible': searchVisible || !isHomePage,
    'categories-visible': categoriesVisible || !isHomePage,
    'header-position': !isHomePage,
  }">
    <header class="header-container flex">
      <RouterLink to="/" class="site-logo">
        <img v-if="isHomePage && isHomePageNotScrolled" src="../assets/imgs/main-logo-white.png" alt="" />
        <img v-else src="../assets/imgs/main-logo.png" alt="" />
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
            <div class="online-dot"></div>
            <span v-if="userImg">
              <img :src="userImg" :alt="userImgAlt" />
            </span>
            <span v-else class="img-user-alt"> {{ userImgAlt }}</span>
          </span>
          <span v-else>
            <RouterLink to="/login"> Sign in </RouterLink>
            <RouterLink to="/login"><span class="join"> Join</span> </RouterLink>
          </span>
        </RouterLink>
      </div>
    </header>
    <section class="categories-menu-package main-layout full">
      <ul class="flex clean-list header-categories">
        <div class="header-link">
          <RouterLink to="/explore?category=Graphics+%26+Design">Graphics & Design</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Digital+Marketing">Digital Marketing</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Writing+%26+Translation">Writing & Translation</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Video+%26+Animation">Video & Animation</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Music+%26+Audio">Music & Audio</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Programming+%26+Tech">Programming & Tech</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Photography">Photography</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=Business">Business</RouterLink>
        </div>
        <div class="header-link">
          <RouterLink to="/explore?category=AI+Services">AI Services</RouterLink>
        </div>
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
      isHomePageNotScrolled: false,
    }
  },
  mounted() {
    // if (this.isHomePage) {
    window.addEventListener("scroll", this.handleScroll)
    this.isHomePageNotScrolled = this.isHomePage
    // } else {
    //   this.scrolled = true
    // }
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
      if (this.loggedinUser.isSeller) return "/seller/" + this.loggedinUser._id
      if (!this.loggedinUser.isSeller) return "/user/" + this.loggedinUser._id
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
    userImgAlt() {
      return this.loggedinUser.fullname.charAt(0).toUpperCase()
    }

  },
  watch: {},
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
      if (!this.isHomePage) return
      const scrollPosition = window.scrollY

      const firstStageThreshold = 20
      const secondStageThreshold = 90

      // this.scrolled = scrollPosition >= firstStageThreshold

      if (scrollPosition >= firstStageThreshold) {
        this.isHomePageNotScrolled = false
        this.scrolled = true
      } else {
        this.isHomePageNotScrolled = true
        this.scrolled = false
        this.searchVisible = false
      }

      if (scrollPosition >= secondStageThreshold) {
        this.categoriesVisible = true
        this.searchVisible = true
      } else {
        this.categoriesVisible = false
      }
    },
  },
}
</script>
