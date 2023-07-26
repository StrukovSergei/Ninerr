<template>
    <section>
        <!-- <ul class="gig-list"> -->
        <li class="gig-preview" @click="goToDetail">
            <p>{{ gig?.title }}</p>

            <p>
                ${{ gig.price?.toLocaleString() }}
            </p>
            <button @click="removeGig(gig._id)">x</button>
            <hr />
        </li>
        <!-- </ul> -->
        <!-- <form @submit.prevent="addGig()">
            <h2>Add gig</h2>
            <input type="text" v-model="gigToAdd.title" />
            <button>Save</button>
        </form> -->

    </section>
</template>

<script>
import { gigService } from '../services/gig.service.local'
import { getActionRemoveGig, getActionUpdateGig } from '../store/gig.store'
export default {
    name: 'GigPreview',
    props: {
        gig: Object,
    },
    data() {
        return {
            gigToAdd: gigService.getEmptyGig()
        }
    },
    computed: {
        gigs() {
            return this.$store.getters.gigs
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadGigs' })
    },
    methods: {
        goToDetail() {
            this.$router.push(`/gig/${this.gig._id}`)
        },

    },
}

</script>
