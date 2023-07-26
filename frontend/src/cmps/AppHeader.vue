<template>
  <div class="main-layout">
    <header>
      <RouterLink to="/" class="site-logo">
        <div>
          <img src="../assets/imgs/fiverr-2.svg" alt="">

        </div>
      </RouterLink>
      <div class="search">
        <input type="text" placeholder="What service are you looking for today?">
        <button>Search</button>
      </div>
      <div class="links">
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/user/:id">Become a Seller </RouterLink>
        <RouterLink :to="userProfile">Profile</RouterLink>
        <RouterLink to="/login">Login <span> Signup</span> </RouterLink>
      </div>
    </header>
    <section class="categories-menu-package">
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
    loadGig() {
      let { txt, tag } = this.$route.query
      let filterBy = { txt, tag }
      this.$store.dispatch({ type: 'loadGigs', filterBy })
      this.filterBy.txt = null
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
    }


  },
  watch: {
    '$route.params': {
      handler: function () {
        window.scrollTo(0, 0);
      }
    }
  },
}

</script>