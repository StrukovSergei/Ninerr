<template>
  <section class="home full">
    <Hero />
    <h2>Popular services:</h2>
    <vueper-slides class="no-shadow" :visible-slides='slidesNum' slide-multiple :gap="3" :slide-ratio="1 / 3"
      :bullets="false" :dragging-distance="200" :breakpoints="{
        550: { visibleSlides: 1, slideMultiple: 2 },
        800: { visibleSlides: 2, slideMultiple: 2 },
        1000: { visibleSlides: 3, slideMultiple: 2 },
        1330: { visibleSlides: 5, slideMultiple: 2 }
      }">
      <template #arrow-left>
        <i class="fa-solid fa-angle-left"></i>
      </template>
      <template #arrow-right>
        <i class="fa-solid fa-angle-right"></i>
      </template>
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" />
    </vueper-slides>
  </section>

  <div class="selling-proposition-wrapper main-layout full">
    <div class="selling-proposition">
      <div class="selling-container">
        <div class="selling-info">
          <h2>The best part? Everything.</h2>
          <ul class="clean-list">
            <li>
              <section class="flex align-center">
                <h6>
                  <span class="check-svg" v-html="$svg('check')"></span>
                  <h3>Stick to your budget</h3>
                </h6>
              </section>
              <p>
                Find the right service for every price point. No hourly rates, just project-based pricing.
              </p>
            </li>
            <li>
              <section class="flex align-center">
                <h6>
                  <span class="check-svg" v-html="$svg('check')"></span>
                  <h3>Get quality work done quickly</h3>
                </h6>
              </section>
              <p>
                Hand your project over to a talented freelancer in minutes, get long-lasting results.
              </p>
            </li>
            <li>
              <section class="flex align-center">
                <h6>
                  <span class="check-svg" v-html="$svg('check')"></span>
                  <h3>Pay when you're happy</h3>
                </h6>
              </section>
              <p>
                Upfront quotes mean no surprises. Payments only get released when you approve.
              </p>
            </li>
            <li>
              <section class="flex align-center">
                <h6>
                  <span class="check-svg" v-html="$svg('check')"></span>
                  <h3>Count on 24/7 support</h3>
                </h6>
              </section>
              <p>
                Our round-the-clock support team is available to help anytime, anywhere.
              </p>
            </li>
          </ul>
        </div>
        <div class="selling-video">
          <div class="picture-wrapper">
            <img src="https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793711/gigs/ostlxosopzlu6ccomezg.webp"
              alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="icon-category">
    <h2 class="bold"> Explore the marketplace</h2>
    <section class="category-list main-layout">
      <section class="icons full">

        <RouterLink to="/gig?tag=graphics-design">
          <span class="flex">
            <div>
              <span v-html="$svg('graphic')"></span>
              <h4 class="regular">Graphics & Design</h4>
            </div>
          </span>
        </RouterLink>
        <RouterLink to="/gig?tag=marketing">
          <span class="flex">
            <div>
              <span v-html="$svg('marketing')">

              </span>
              <h4 class="regular">Digital Marketing</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=writing">
          <span class="flex">
            <div>
              <span v-html="$svg('writing')"></span>
              <h4 class="regular">Writing & Translation</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=video">
          <span class="flex">
            <div>
              <span v-html="$svg('video')">

              </span>
              <h4 class="regular">Video & Animation</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=music">
          <span class="flex">
            <div>
              <span v-html="$svg('music')">

              </span>
              <h4 class="regular">Music & Audio</h4>
            </div>
          </span>
        </RouterLink>
        <RouterLink to="/gig?tag=programming-tech">
          <span class="flex">
            <div>
              <span v-html="$svg('tech')">

              </span>
              <h4 class="regular">Programming & Tech</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=business">
          <span class="flex">
            <div>
              <span v-html="$svg('business')"></span>
              <h4 class="regular">Business</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=lifestyle">
          <span class="flex">
            <div>
              <span v-html="$svg('lifestyle')"></span>
              <h4 class="regular">Lifestyle</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=data">
          <span class="flex">
            <div>
              <span v-html="$svg('data')"></span>
              <h4 class="regular">Data</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/gig?tag=photography">
          <span class="flex">
            <div>
              <span v-html="$svg('photography')"></span>
              <h4 class="regular">Photography</h4>
            </div>
          </span>
        </RouterLink>
      </section>
    </section>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import Hero from '../cmps/Hero.vue'
import img1 from '../assets/imgs/1.webp'
import img2 from '../assets/imgs/2.webp'
import img3 from '../assets/imgs/3.webp'
import img4 from '../assets/imgs/4.webp'
import img5 from '../assets/imgs/5.webp'
import img6 from '../assets/imgs/6.webp'
import img7 from '../assets/imgs/7.webp'
import img8 from '../assets/imgs/8.webp'
import img9 from '../assets/imgs/9.webp'
import img10 from '../assets/imgs/10.webp'

export default {
  name: 'home',
  data: () => ({
    slides: [
      {
        image: img1,
      },
      {
        image: img2
      },
      {
        image: img3
      },
      {
        image: img4
      },
      {
        image: img5
      },
      {
        image: img6
      },
      {
        image: img7
      },
      {
        image: img8
      },
      {
        image: img9
      },
      {
        image: img10
      },

    ],
    slidesNum: 5,
    width: window.innerWidth,
  }),
  computed: {
  },
  created() {
  },
  methods: {
  },
  components: { VueperSlides, VueperSlide, Hero },

}
</script>
