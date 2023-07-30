<template>
    <section v-if="currGig" class="gig-details flex gap-2">

        <div class="gig-details-overview">
            <div class="gig-small-nav flex">
                <RouterLink class="home-icon" to="/">
                    <span v-html="$svg('home')"></span>
                </RouterLink>
                <span class="small-devider">/</span>
                <RouterLink class="btn-back" to="/explore">All Gigs</RouterLink>
            </div>
            <h2 class="gig-details__title">{{ currGig.title }}</h2>
            <div class="mini-user-info flex">
                <img :src="currGig.owner.imgUrl" alt="" class="owner-small-logo">
                <h3 class="mini-user-title">{{ currGig.owner.fullname }} <span class="mini-user-level fs14">{{ currGig.owner.level }} </span>
                <span class="mini-user-devider fs14">|</span>
                </h3>
                <div v-if="currGig.owner.rate" class="star-rating">
                    <span v-for="(star, index) in generateStars(currGig.owner.rate).fullStars" :key="index">
                        <span v-html="$svg('star')"></span>
                    </span>
                    <span v-for="(star, index) in generateStars(currGig.owner.rate).emptyStars" :key="index">

                        <span v-html="$svg('emptyStar')"></span>
                    </span>
                </div>
                <span class="rate-number">{{ currGig.owner.rate }}</span>
            </div>
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
                <h2 class="gig-title fs20">About this gig</h2>
                <span class="gig-description">{{ currGig.description }}</span>
            </div>

            <div class="aboutseller-container">
                <h2 class="seller-title fs20">About the seller</h2>
                <SellerDetails :gig="currGig"></SellerDetails>
            </div>

            <div class="flex justify-end self-end">
                <router-link v-if="user?.isAdmin" class="btn-light" :to="'/gig/edit/' + currGig._id">Edit</router-link>
            </div>
            <div v-if="reviews" class="">
                <h2 class="review-header">Reviews</h2>
                <ReviewList :reviews="reviews"></ReviewList>

            </div>
        </div>
        <div class="order-container ">
            <div class="order-header">
                <p>Basic</p>
            </div>
            <div class="order-details flex">
                <span class="order-offer">Special offer</span>
                <span class="order-price">${{ currGig.price }}</span>
                <span class="order-mini-info">{{ currGig.info }}</span>
                <div class="payment-features-list ">
                    <template v-for="(feature, index) in currGig.features" :key="index">
                        <div class="payment-feature">
                            <span class="payment-feature-icon" v-html="$svg('greenCheck')"></span>
                            <span class="payment-feature-text">{{ feature }}</span>
                        </div>
                    </template>
                </div>
                <span class="order-properties"><span v-html="$svg('clock')" class="clock-icon"></span> {{
                    currGig.daysToMake }} Days Delivery</span>
            </div>
            <RouterLink class="btn-continue-route"
                :to="{ name: 'payment-details', params: { gigId: currGig._id }, props: { gig: currGig } }">
                <button class="btn-continue">
                    Continue

                    <span class="btn-continue-arrow" aria-hidden="true" style="width: 16px; height: 16px; fill: white;">
                        <span v-html="$svg('arrowRight')"></span>
                    </span>
                </button>
            </RouterLink>
        </div>
    </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import SellerDetails from '../cmps/SellerDetails.vue'
import ReviewList from '../cmps/ReviewList.vue'
import { gigService } from '../services/gig.service.local'
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.local'
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
            slides: [],
            reviews: null
        }
    },
    async created() {
        try {
            const user = userService.getLoggedinUser()
            if (user) {
                this.$store.commit({ type: 'setLoggedinUser', user })
            }
            await this.loadGig()
            await this.loadReviews()
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
        async loadReviews() {
            try {
                const reviews = await reviewService.query()
                this.reviews = reviews
            } catch {
                console.log('Could Not load reviews')
            }
        },
        generateStars(rate) {
            const fullStars = Math.floor(rate)
            const emptyStars = 5 - fullStars

            return {
                fullStars: Array(fullStars).fill(1),
                emptyStars: Array(emptyStars).fill(0),
            }
        },
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser
        },
        // reviews() {
        //     return this.$store.getters.getReviews
        // },
    },
    components: { VueperSlides, VueperSlide, SellerDetails, RouterLink, ReviewList },
}
</script>