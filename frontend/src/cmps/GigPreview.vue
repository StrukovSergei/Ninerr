<template>
    <!-- <section class="main-layout"> -->
    <li class="gig-preview card-container">
        <vueper-slides class="product_img" ref="vueperslides1" :touchable="false" :autoplay="false" :infinite="false"
            disable-arrows-on-edges>
            <template #arrow-left>
                <i class="fa-solid fa-angle-left"></i>
            </template>
            <template #arrow-right>
                <i class="fa-solid fa-angle-right"></i>
            </template>
            <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide" :link="`/#/gig/${gig._id}`">
                <img :src="slide" class="product_img" />
            </vueper-slide>
        </vueper-slides>
        <button class="button_hurt"></button>

        <section class="user_preview">
            <div class="user_info">
                <img class="user_img" :src="gig.owner.imgUrl" />
                <a class="user_name txt_body">{{ gig?.owner.fullname }}</a>
            </div>
            <div>
                <h3 class="level ">{{ gig.owner.level }}</h3>
            </div>
        </section>
        <h3 class="title_product">{{ gig?.title }}</h3>
        <div class="rate">
            <span v-html="$svg('blackStar')" class="rate-star flex align-center"></span>
            <p class="txt_body">{{ gig?.owner.rate }} <span class="rate-count"> (1k+)</span></p>
        </div>
        <p class="price_product txt_body"><span>From </span>${{ gig.price?.toLocaleString() }}</p>

    </li>
    <!-- </section> -->
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
    name: "GigPreview",
    props: {
        gig: Object,
    },
    data() {
        return {
            slides: [],
        };
    },
    computed: {
        gigs() {
            console.log(this.$store.getters.gigs);
            return this.$store.getters.gigs;
        },
    },
    watch: {
        gig: {
            handler(newGig) {
                this.slides = newGig.imgUrls;
            },
            immediate: true,
        },
    },
    methods: {},
    components: { VueperSlides, VueperSlide },
};
</script>
