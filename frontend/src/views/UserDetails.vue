<template>
  <section v-if="user" class="main-user flex">
    <h1>{{ user.fullname }}</h1>

    <button @click="onLogout()">Logout</button>
    <img style="max-width: 200px" :src="user.imgUrl" />

    <p>Manage orders</p>
    <div v-if="orders && orders.length">
      <el-table :border="true" :data="orders" style="width: 100%">
        <el-table-column prop="buyerId" label="Buyer" width="150" />
        <el-table-column prop="price" label="Price" width="120" />
        <el-table-column prop="gigId" label="Gig" width="160" />
        <el-table-column prop="status" label="Status" width="160">
          <template #default="{ row }">
            <el-button :class="getStatusButtonClass(row.status)">{{
              row.status
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <p>No orders available.</p>
    </div>
  </section>
</template>

<script>
// import { SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED, socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { userService } from "../services/user.service";

export default {
  data() {
    return {
      user: null,
    };
  },
  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.loadUser();
          this.$store.dispatch({
            type: "loadOrders",
            filterBy: { buyerId: this.userId },
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    isMe() {
      return this.userId === this.$store.getters.loggedinUser._id;
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  created() { },
  methods: {
    async loadUser() {
      if (!this.userId) return;
      try {
        const user = await userService.getById(this.userId);
        // socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)

        // socketService.emit(SOCKET_EMIT_USER_WATCH, this.userId)
        // socketService.on(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        this.user = user;
      } catch (err) {
        showErrorMsg("Cannot load user: " + this.userId);
        console.error("Failed to load user", err);
      }
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
      userService.logout();
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 100);
    },
  },
  components: {},
};
</script>
