<template>
    <section v-if="currGig" class="gig-details flex gap-2">

        <div class="gig-details-overview grid">
            <div class="gig-small-nav flex">
                <div class="home-icon" @click="redirectToHome">
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
                        <path
                            d="M12.773 14.5H3.227a.692.692 0 0 1-.482-.194.652.652 0 0 1-.2-.468V7.884H.5l7.041-6.212a.694.694 0 0 1 .918 0L15.5 7.884h-2.046v5.954a.652.652 0 0 1-.2.468.692.692 0 0 1-.481.194Zm-4.091-1.323h3.409V6.664L8 3.056 3.91 6.664v6.513h3.408v-3.97h1.364v3.97Z">
                        </path>
                    </svg>

                </div>
                <span class="small-devider">/</span>
                <p class="btn-back" @click="redirectToExplore">All Gigs</p>
            </div>
            <h2 class="gig-details__title">{{ currGig.title }}</h2>
            <div class="mini-user-info flex">
                <img :src="currGig.owner.imgUrl" alt="" class="owner-small-logo">
                <h3 class="mini-user-title">{{ currGig.owner.fullname }}, {{ currGig.owner.level }}</h3>
                <div v-if="currGig.owner.rate" class="star-rating">
                    <span v-for="(star, index) in generateStars(currGig.owner.rate).fullStars" :key="index">
                        <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                            <path class="star-icon" fill-rule="evenodd" clip-rule="evenodd"
                                d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z">
                            </path>
                        </svg>
                    </span>
                    <span v-for="(star, index) in generateStars(currGig.owner.rate).emptyStars" :key="index">
                        <!-- <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                            <path class="star-icon empty" fill="none" stroke="black" stroke-width="1.5"
                                d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z">
                            </path>
                        </svg> -->
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
                <h2>About this gig:</h2>
                {{ currGig.description }}
            </div>



            <div class="flex justify-end self-end">
                <router-link v-if="user?.isAdmin" class="btn-light" :to="'/gig/edit/' + currGig._id">Edit</router-link>
            </div>
            <div class="">
                <h2 class="review-header">Reviews</h2>
                <div v-for="review in reviews" :key="review._id" class="review-preview">
                    <h4>About: {{ review.currGig.title }}</h4>
                    <h4>By: {{ review.user.username }}</h4>
                    <p>Review: {{ review.txt }}</p>
                </div>

            </div>
        </div>
        <div class="order-container grid">
            <div class="order-header">
                <h3>Basic</h3>
            </div>
            <p class="order-offer">Special offer:</p>
            <p class="order-price">${{ currGig.price }}</p>
            <p class="order-mini-info">Info:</p>
            <p class="order-properties"> {{ currGig.daysToMake }} Days Delivery</p>
            <button class="btn-continue">Continue</button>
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
        generateStars(rate) {
            const fullStars = Math.floor(rate)
            const emptyStars = 5 - fullStars

            return {
                fullStars: Array(fullStars).fill(1),
                emptyStars: Array(emptyStars).fill(0),
            }
        },
        redirectToHome() {

            this.$router.push('/')
        },
        redirectToExplore() {

            this.$router.push('/explore')
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