<template>
    <section>
      <li class="gig-preview" @click="goToDetail">
        <vueper-slides
          ref="vueperslides1"
          :touchable="false"
          fade
          :autoplay="false"
          :bullets="false"
          fixed-height="400px"
        >
          <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide"></vueper-slide>
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
  
        <p class="price_product txt_body">
          From ${{ gig.price?.toLocaleString() }}
        </p>
        <!-- <button @click="removeGig(gig._id)">x</button> -->
        <hr />
      </li>
    </section>
  </template>
  
  <script>
  import { VueperSlides, VueperSlide } from 'vueperslides';
  import 'vueperslides/dist/vueperslides.css';
  
  export default {
    name: 'GigPreview',
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
        return this.$store.getters.gigs;
      },
    },
    created() {
      this.slides = this.gig.imgUrls;
    },
    methods: {
      goToDetail() {
        this.$router.push(`/gig/${this.gig._id}`);
      },
    },
    components: { VueperSlides, VueperSlide },
  };
  </script>
  