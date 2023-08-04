<template>
    <div>
        <div class="rate-summary ">
            <span class="rate-review-number">{{ reviews.length }} reviews for this Gig

                <div class="rate-avg">
                    <span class="rate-avg-stars">
                        <span v-for="(star, index) in generateStars(averageRating).fullStars" :key="index">
                            <span v-html="$svg('star')"></span>
                        </span>
                        <span v-for="(star, index) in generateStars(averageRating).emptyStars" :key="index">
                            <span v-html="$svg('emptyStar')"></span>
                        </span>
                        <span class="rate-avg-number">{{ averageRating.toFixed(1) }}</span>
                    </span>
                </div>

            </span>
        </div>

        <table class="rate-bars">
            <tr v-for="i in stars" class="row" :class="{ 'faded': !getRateCount(i) }">
                <span class="num">{{ i }}</span>
                <span v-if="(i>1)">Stars</span>
                <span v-else>Star</span>
                <td class="progress-bar-container">
                <td class="progress-bar" :style="{ width: `${getPercentage(i)}%` }"></td>
                </td>
                <span>({{ getRateCount(i) }})</span>
            </tr>
        </table>


    </div>
</template>

<script>
export default {
    props: {
        reviews: Array
    },
    data() {
        return {
            stars: [5, 4, 3, 2, 1]
        }
    },
    methods: {
        getRateCount(num) {
            const countRate = this.reviews.reduce((count, review) => {
                const reviewRate = review.rate >= 4.5 ? Math.ceil(review.rate) : Math.floor(review.rate)
                return reviewRate === num ? count + 1 : count
            }, 0)
            return countRate
        },
        getPercentage(num) {
            const sum = this.stars.reduce((total, star) => total + this.getRateCount(star), 0)
            const rateCount = this.getRateCount(num)
            return (rateCount / sum) * 100
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
        averageRating() {
            if (this.reviews.length === 0) {
                return 0
            }
            const totalRating = this.reviews.reduce((sum, review) => sum + review.rate, 0)
            return totalRating / this.reviews.length
        }
    },
}
</script>
