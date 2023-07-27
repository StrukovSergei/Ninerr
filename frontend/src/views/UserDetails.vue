<template>
  <section v-if="user" class="main-user">
    <h1>User Details - {{ user.fullname }}</h1>
    <h2 v-if="isMe">Its me</h2>
    <img style="max-width: 200px;" :src="user.imgUrl" />
    <ul>
      <li v-for="review in user.givenReviews" :key="review._id">
        {{ review.txt }}
        <RouterLink :to="`/user/${review.aboutUser._id}`">
          About {{ review.aboutUser.fullname }}
        </RouterLink>
      </li>
    </ul>
    <button @click="openModal">Add Gig</button>
    <add-gig-modal :is-modal-open="isModalOpen" @close="closeModal" @add="handleAddGig"></add-gig-modal>

    <!-- List of Current Gigs -->
    <div v-if="gigs && gigs.length">
      <h2>Current Gigs:</h2>
      <ul>
        <li v-for="gig in gigs" :key="gig._id">
          {{ gig.title }} - Price: {{ gig.price }}
          <button @click="updateGig(gig)">Update</button>
          <button @click="removeGig(gig._id)">Remove</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No gigs available.</p>
    </div>
  </section>
</template>

<script>
import { SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED, socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service.local'
import GigList from '../cmps/GigList.vue'
import { gigService } from '../services/gig.service.local'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'
import AddGigModal from '../cmps/AddGigModal.vue'

export default {
  components: { GigList },
  data() {
    return {
      user: null,
      isModalOpen: false
    }
  },
  watch: {
    userId: {
      handler() {
        this.loadUser()
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
    gigs() {
      return this.$store.getters.gigs
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadGigs' })
  },
  methods: {
    async loadUser() {
      if (!this.userId) return
      try {
        const user = await userService.getById(this.userId)
        socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)

        socketService.emit(SOCKET_EMIT_USER_WATCH, this.userId)
        socketService.on(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        this.user = user
      } catch (err) {
        showErrorMsg('Cannot load user: ' + this.userId)
        console.error('Failed to load user', err)
      }
    },
    onUserUpdate(updatedUser) {
      showSuccessMsg(`This user ${updatedUser.fullname} just got updated from socket,
       new score: ${updatedUser.score}`)
      this.user = updatedUser
    },
    unmounted() {
      socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
    },
    async addGig() {
      try {
        await this.$store.dispatch({ type: 'addGig', gig: this.gigToAdd })
        showSuccessMsg('Gig added')
        this.gigToAdd = gigService.getEmptyGig()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add gig')
      }
    },
    async removeGig(gigId) {
      try {
        await this.$store.dispatch(getActionRemoveGig(gigId))
        showSuccessMsg('Gig removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove gig')
      }
    },
    async updateGig(gig) {
      try {
        gig = { ...gig }
        gig.price = +prompt('New price?', gig.price)
        await this.$store.dispatch(getActionUpdateGig(gig))
        showSuccessMsg('Gig updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update gig')
      }
    },
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    async handleAddGig(gig) {
      try {
        await this.$store.dispatch({ type: 'addGig', gig })
        showSuccessMsg('Gig added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add gig')
      }
    }
  },
  components: {
    AddGigModal
  }
}

</script>