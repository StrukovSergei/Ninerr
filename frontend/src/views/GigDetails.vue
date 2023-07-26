<template>
    <section v-if="currGig" class="gig-details flex gap-2">
        <div class="gig-details__details grid">
            <h2 class="gig-details__title">{{ currGig.title }}</h2>
            <img :src="currGig.owner.imgUrl" alt="" class="owner-small-logo">
            <h3> {{ currGig.owner.fullname }} , {{ currGig.owner.level }} , {{ currGig.owner.rate }}</h3>
            <div>
                <vueper-slides ref="vueperslides1" :touchable="false" fade :autoplay="false" :bullets="false"
                    @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })" fixed-height="400px">
                    <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image">
                    </vueper-slide>
                </vueper-slides>

                <vueper-slides class="no-shadow thumbnails" ref="vueperslides2"
                    @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
                    :visible-slides="slides.length" fixed-height="75px" :bullets="false" :touchable="false" :gap="2.5"
                    :arrows="false">
                    <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image"
                        @click.native="$refs.vueperslides2.goToSlide(i)">
                    </vueper-slide>
                </vueper-slides>

            </div>
            <div class="aboutgig-container">
                <h2>About this gig:</h2>
                {{ currGig.description }}
            </div>

            <div class="order-container">
                <h3>Basic</h3>
                <p>${{ currGig.price }}</p>
                <button class="btn-continue">Continue</button>
            </div>

            <div class="flex justify-end self-end">
                <router-link v-if="user?.isAdmin" class="btn-light" :to="'/gig/edit/' + currGig._id">Edit</router-link>
            </div>
        </div>
        <div class="">
            <h1 class="review-header">Reviews</h1>
            <div v-for="review in reviews" :key="review._id" class="review-preview">
                <h4>About: {{ review.currGig.title }}</h4>
                <h4>By: {{ review.user.username }}</h4>
                <p>Review: {{ review.txt }}</p>
            </div>

        </div>
    </section>
</template>

<script>
import { gigService } from '../services/gig.service.local'
import { userService } from '../services/user.service.js'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    name: 'GigDetails',
    props: {
        gig: Object,
    },
    data() {
        return {
            currGig: null,
            addReview: '',
            slides: []
        }
    },
    async created() {
        try {
            const user = userService.getLoggedinUser()
            if (user) {
                this.$store.commit({ type: 'setLoggedinUser', user })
            }
            await this.loadGig()
            await this.$store.dispatch({ type: 'loadReviews', filterBy: { gigId: this.currGig._id } })

            this.slides = this.currGig.imgUrls.map(imageUrl => ({ image: imageUrl }))
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        async loadGig() {
            try {
                const { gigId } = this.$route.params
                const gig = await gigService.getById(gigId)
                this.currGig = gig
            } catch {
                console.log('Could Not load gig')
            }
        },
        goBack() {
            this.$router.push('/explore')
        },
        async sendReview() {
            await this.$store.dispatch({
                type: 'addReview',
                newReview: { txt: this.addReview, gigId: this.currGig._id },
            })
            this.$store.dispatch({ type: 'getReviews', filterBy: { gigId: this.currGig._id } })
            this.newReview = ''
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser
        },
        reviews() {
            return this.$store.getters.getReviews
        },
    },
    components: { VueperSlides, VueperSlide },
}
</script>