<template>
  <section v-if="user" class="main-user grid">
    <div class="user-container flex">
      <h1 class="user-name">{{ user.fullname }}</h1>
      <div class="user-photo">
        <img v-if="user.imgUrl" :src="user.imgUrl" alt="User Photo" style="max-width: 200px" />
        <div v-else class="user-initials">
          {{ user.fullname.charAt(0).toUpperCase() }}
        </div>
      </div>
      <div class="total-orders">Total orders</div>
      <div class="total-orders-num">{{ orders.length }}</div>
      <div class="user-country-title">From</div>
      <div class="user-country">
        Israel
        <img class="user-coutry-img" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png"
          alt="" />
      </div>
      <div class="member">Member since </div>
      <div class="year">2023</div>
      <div class="member">Last active </div>
      <div class="active">online</div>
      <RouterLink class="seller-btn" :to="becomeSeller">Become a Seller
      </RouterLink>
      <!-- <button @click="onLogout()">Logout</button> -->
      <!-- <img style="max-width: 200px;" :src="user.imgUrl" /> -->
    </div>

    <div class="orders-container">
      <p class="fs20">Manage orders</p>
      <div v-if="orders && orders.length">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Gig</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td>
                <div><img :src="order.imgUrl" alt=""> {{ order.gigTitle }}</div>
              </td>
              <td>${{ order.price }}</td>
              <td class="center-helper">
                <span :class="getStatusButtonClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No orders available.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED, SOCKET_EVENT_ORDER_UPDATE, socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'


export default {
  data() {
    return {
      user: null,
    }
  },
  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.loadUser()
          this.$store.dispatch({
            type: "loadOrders",
            filterBy: { buyerId: this.userId },
          })
        }
      },
      immediate: true,
    },
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    isMe() {
      return this.userId === this.$store.getters.loggedinUser._id
    },
    orders() {
      return this.$store.getters.orders
    },
    becomeSeller() {

      return "/register/" + this.userId
    },
  },
  created() {
    socketService.on(SOCKET_EVENT_ORDER_UPDATE, this.orderUpdate)
  },
  methods: {
    async loadUser() {
      if (!this.userId) return;
      try {
        const user = await userService.getById(this.userId)
        socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)

        socketService.emit(SOCKET_EMIT_USER_WATCH, this.userId)
        socketService.on(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        this.user = user;
      } catch (err) {
        showErrorMsg("Cannot load user: " + this.userId)
        console.error("Failed to load user", err)
      }
    },
    orderUpdate(order) {
      this.$store.dispatch({
        type: "loadOrders",
        filterBy: { buyerId: this.userId },
      })
    },
    // unmounted() {
    //   socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
    // },
    getStatusButtonClass(status) {
      return {
        "btn-rejected": status === "rejected",
        "btn-completed": status === "completed",
        "btn-in-progress": status === "in progress",
        "btn-pending": status === "pending",
      };
    },
    onLogout() {
      userService.logout()
      this.$router.push("/")
      setTimeout(() => {
        location.reload()
      }, 100)
    },
  },
  components: {},
};
</script>
