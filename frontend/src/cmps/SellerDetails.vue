<template>
    <div class="seller-preview-big flex">
        <img :src="gig.owner.imgUrl" alt="">
        <div class="seller-details">
            <span class="seller-name">{{ gig.owner.fullname }}</span>
            <div class="seller-level">{{ gig.owner.level }}</div>
            <span class="seller-rate flex">
                <span v-for="(star, index) in generateStars(gig.owner.rate).fullStars" :key="index">
                    <span v-html="$svg('star')"></span>
                </span>
                <span v-for="(star, index) in generateStars(gig.owner.rate).emptyStars" :key="index">
                    <span v-html="$svg('emptyStar')"></span>
                </span>
                <span class="rate-number">{{ gig.owner.rate }}</span>
            </span>
            <button class="btn-contact">Contact me</button>
        </div>
    </div>
    <section class="seller-details-box">
        <div class="user-stats grid">
            <span class="stat-country">From <div class="fw700">{{ gig.owner.country }}</div></span>
            <span class="stat-since">Member since <div class="fw700">{{ gig.owner.since }}</div></span>
            <span class="stat-response">Avg. response time <div class="fw700">{{ gig.owner.response }}</div></span>
            <span class="stat-lastDelivery">Last delivery<div class="fw700">{{ gig.owner.lastDelivery }}</div></span>
            <span class="stat-language">Languages <div class="fw700">{{ gig.owner.language.join(', ') }}</div></span>
        </div>
        <div class="user-about">{{ gig.owner.about }}</div>
    </section>
</template>

<script>


export default {
    name: 'SellerInfo',
    props: {
        gig: Object,
    },
    data() {
        return {

        }
    },

    created() {

    },
    computed: {

    },

    methods: {
        generateStars(rate) {
            const fullStars = Math.floor(rate)
            const emptyStars = 5 - fullStars

            return {
                fullStars: Array(fullStars).fill(1),
                emptyStars: Array(emptyStars).fill(0),
            }
        },

    },
}

</script>
