<template>
    <li class="gig-preview">


        <vueper-slides class="product_img" ref="vueperslides1" :touchable="false" fade :autoplay="false" :infinite="false"
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


        <section class="user_preview">
            <div class="user_info">
                <img class="user_img" :src="gig.owner.imgUrl" />
                <a class="user_name txt_body">{{ gig?.owner.fullname }}</a>
            </div>
            <div>
                <h3 class="level txt_body">{{ gig.owner.level }}</h3>
            </div>
        </section>
        <h3 class="title_product txt_body">{{ gig?.title }}</h3>
        <div class="rate">
            <span v-html="$svg('blackStar')"></span>
            <p class="txt_body">{{ gig?.owner.rate }}</p>
        </div>
        <p class="price_product txt_body">From ${{ gig.price?.toLocaleString() }}</p>

    </li>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides"
import "vueperslides/dist/vueperslides.css"
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
            console.log(this.$store.getters.gigs)
            return this.$store.getters.gigs
        },
    },
    watch: {
        gig: {
            handler(newGig) {
                this.slides = newGig.imgUrls
            },
            immediate: true,
        },
    },
    methods: {

    },
    components: { VueperSlides, VueperSlide },
};
</script>
