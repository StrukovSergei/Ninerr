<template>
    <!-- <section> -->
    <!-- <ul class="gig-list"> -->
    <!-- @click="goToDetail" -->
    <li class="gig-preview" @click="goToDetail">
        <vueper-slides  ref="vueperslides1" :touchable="false" fade :autoplay="false" :bullets="false"
            height="40%" >
            <!-- fixed-height="400px"> -->
            <!-- <template #arrow-left>
                <i class="fa-solid fa-angle-left"></i>
            </template>
            <template #arrow-right>
                <i class="fa-solid fa-angle-right"></i>
            </template> -->
            <vueper-slide class="product_img" v-for="(slide, i) in slides" :key="i" :image="slide">
            </vueper-slide>
        </vueper-slides>
        <!-- visible-slides='slidesNum' -->
        <!-- <img :src="gig.imgUrls[0]" class="product_img"/> -->
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
        <p class="price_product txt_body">
            From ${{ gig.price?.toLocaleString() }}
        </p>
        <!-- <button @click="removeGig(gig._id)">x</button> -->
    </li>
    <!-- </ul> -->
    <!-- <form @submit.prevent="addGig()">
            <h2>Add gig</h2>
            <input type="text" v-model="gigToAdd.title" />
            <button>Save</button>
        </form> -->
    <!-- </section> -->
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    name: 'GigPreview',
    props: {
        gig: Object,
    },
    data() {
        return {
            slides: []

        }
    },
    computed: {
        gigs() {
            console.log(this.$store.getters.gigs)
            return this.$store.getters.gigs
        }
    },
    watch: {
        gig: {
            handler(newGig) {

                this.slides = newGig.imgUrls
            },
            immediate: true
        },
    },
    methods: {
        goToDetail() {
            this.$router.push(`/gig/${this.gig._id}`)
        },
        preventSlideClick(event) {
            event.stopPropagation()
        },
    },
    components: { VueperSlides, VueperSlide, },


}
</script>
