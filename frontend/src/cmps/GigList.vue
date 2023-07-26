<template>
    <section>
        <ul class="gig-list grid">
            <GigPreview v-for="gig in gigs" :key="gig._id" :gig="gig" @removeGig="$emit('removeGig', gig._id)" />
        </ul>
    </section>
</template>
<script>
import GigPreview from './GigPreview.vue'

export default {
    name: 'GigList',
    props: {
        gigs: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            filterBy: {
                tag: ''
            }
        }
    },

    components: {
        GigPreview,
    },

}
</script>
