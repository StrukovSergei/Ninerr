<template>
    <div>
        <div v-for="(review, index) in visibleReviews" :key="index" class="review-container">
            <img :src="review.by.imgUrl" alt="" class="review-user-img">
            <div class="review-top ">
                <span class="review-user-name">{{ review.by.fullname }}</span>
                <p class="review-user-country"><img :src="getCountryFlagUrl(review.by.country)" :alt="review.by.country" />
                    {{ review.by.country }}</p>
            </div>
            <div v-if="review.rate" class="star-rating review-star">
                <span v-for="(star, index) in generateStars(review.rate).fullStars" :key="index">
                    <span v-html="$svg('star')"></span>
                </span>
                <span v-for="(star, index) in generateStars(review.rate).emptyStars" :key="index">

                    <span v-html="$svg('emptyStar')"></span>
                </span>
                <span class="review-rate-number">{{ review.rate }}</span>

            </div>
            <div class="review-txt fs18" :class="{ 'expanded': review.showFullReview }">
                <div v-if="!review.showFullReview">
                    {{ review.title.substring(0, truncateLength) }}
                    <span v-if="shouldShowShowMore(review.title)" @click="expandReview(index)">... <span
                            class="show-more">Show more</span></span>
                </div>
                <div v-else>
                    {{ review.title }}
                    <span @click="collapseReview(index)">... <span class="show-more">Show less</span></span>
                </div>
            </div>
            <section class="review-btns">
                <span>Helpful?</span>
                <span class="review-btn-yes"><span v-html="$svg('thumbsUp')"></span>Yes</span>
                <span class="review-btn-no"><span v-html="$svg('thumbsDown')"></span>No</span>
            </section>
        </div>
        <p class="review-more-btn" v-if="visibleReviews.length < reviews.length" @click="showMoreReviews">+ See More</p>
    </div>
</template>
  
<script>
export default {
    name: 'ReviewList',
    props: {
        reviews: Array,
    },
    data() {
        return {
            reviewsToShow: 4,
            reviewsToAdd: 4,
            truncateLength: 140,
        }
    },
    created() { },
    methods: {
        getCountryFlagUrl(country) {
            const countryFlags = {
                India: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f3.png',
                Canada: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
                'United States': 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
                Australia: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png',
                Spain: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ea-1f1f8.png',
                China: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1f3.png',
                'United Kingdom': 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
                France: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png',
                Japan: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png',
                Mexico: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f2-1f1fd.png',
                Italy: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f9.png',
                Vietnam: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fb-1f1f3.png'

            }

            return countryFlags[country] || ''
        },
        generateStars(rate) {
            const fullStars = Math.floor(rate)
            const emptyStars = 5 - fullStars

            return {
                fullStars: Array(fullStars).fill(1),
                emptyStars: Array(emptyStars).fill(0),
            }
        },
        showMoreReviews() {
            this.reviewsToShow += this.reviewsToAdd
        },
        shouldShowShowMore(text) {
            return text.length > this.truncateLength
        },

        expandReview(index) {
            this.reviews[index].showFullReview = true
        },

        collapseReview(index) {
            this.reviews[index].showFullReview = false
        },
    },
    computed: {
        visibleReviews() {
            return this.reviews.slice(0, this.reviewsToShow)
        },
    },
}

</script>
  