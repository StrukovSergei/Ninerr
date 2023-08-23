<template>
  <div class="login-signin">
    <div class="img-container">
      <img
        src="https://fiverr-res.cloudinary.com/npm-assets/layout-server/standard.c6d3ba7.png"
        alt=""
      />
      <div class="txt">
        <p class="title">Success starts here</p>
        <p><i v-html="$svg('check')"></i> Over 600 categories</p>
        <p>
          <i v-html="$svg('check')"></i> Pay per project, not per
          hour
        </p>
        <p>
          <i v-html="$svg('check')"></i> Access to talent and
          businesses <br />
          <span>across the globe</span>
        </p>
      </div>
    </div>

    <div class="login">
      <p class="title">Sign in to your account</p>
      <p v-if="type === 'login'" class="sub-title">
        Don’t have an account? <span @click="typeAction">Join here</span>
      </p>
      <p v-else class="sub-title">
        Already have an account?<span @click="typeAction">Sign in</span>
      </p>
      <!-- <p class="mobile-title">fiverr <span>.</span></p> -->
      <p class="mobile-title">
        
        <!-- <i v-html="$getSvg('x')"></i> -->
      </p>
      <p class="mobile-sub-title">Success <span>starts</span> here.</p>
      <button class="ggl" @click="doLogin">
        Continue with Google
      </button>
      <button class="username" @click="loginByUsername">
         Continue with email/username
      </button>
      <p class="or">OR</p>
      <section class="social-media">
        <button class="apl" @click="doLogin">
           Apple
        </button>
        <button class="fbk" @click="doLogin">
           Facebook
        </button>
        <p class="mobile-footer">
          By joining, you agree to the Myverr <span>Terms of Service</span> and
          to <br />occasionally receive emails from us. Please read our
          <br /><span>Privacy Policy</span> to learn how we use your personal
          data.
        </p>
      </section>

      <div v-if="byUsername" class="username-login">
        <button @click="loginByUsername" class="back">
          Back
        </button>
        <p class="title">Continue with your email or username</p>
        <p class="input-title">Email or username</p>
        <input type="text" v-model="loginCred.username" />
        <p class="input-title">Password</p>
        <input type="text" v-model="loginCred.password" />
        <button class="btn-continue" @click="doLogin">Sign in</button>
      </div>

      <div>

      </div>
    </div>
  </div>
<div class="login-backdrop"></div>
</template>

<script>

export default {
  name: "login-signup",
  data() {
    return {
      msg: "",
      loginCred: { username: "user1", password: "123" },
      signupCred: {
        username: "user1",
        password: "123",
        fullname: "User 1",
        imgUrl: "",
        action: "login",
      },
      byUsername: false,
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    isLoading() {
      return this.$store.getters.usersIsLoading
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password"
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        console.log("user loged in")
        this.$router.push("/")
      } catch (err) {
        console.log(err)
        this.msg = "Failed to login"
      }
    },
    loginByUsername() {
      this.byUsername = !this.byUsername
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" })
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form"
        return
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred })
      this.$router.push("/")
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = "User removed"
      } catch (err) {
        this.msg = "Failed to remove user"
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
    typeAction(typeaction) {
      this.action = typeaction
      console.log(this.action)
    },
  },
  components: {

  },
}
</script>