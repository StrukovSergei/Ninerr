<template>
  <section class="home full">
    <Hero />

    <div class="main-layout vueperslides">
      <h2>Popular services:</h2>
      <vueper-slides class="no-shadow" :visible-slides="slidesNum" slide-multiple :gap="3" :slide-ratio="1 / 3"
        :bullets="false" :dragging-distance="200" :breakpoints="{
          550: { visibleSlides: 1, slideMultiple: 2 },
          800: { visibleSlides: 2, slideMultiple: 2 },
          1000: { visibleSlides: 3, slideMultiple: 2 },
          1330: { visibleSlides: 5, slideMultiple: 2 },
        }">
        <template #arrow-left>
          <i class="fa-solid fa-angle-left"></i>
        </template>
        <template #arrow-right>
          <i class="fa-solid fa-angle-right"></i>
        </template>
        <vueper-slide v-for="(slide, i) in slides" :key="i" :content="slide.content" :link="slide.link"
          />
      </vueper-slides>
    </div>
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
                Find the right service for every price point. No hourly rates, just
                project-based pricing.
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
                Hand your project over to a talented freelancer in minutes, get
                long-lasting results.
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
                Upfront quotes mean no surprises. Payments only get released when you
                approve.
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
              alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="icon-category main-layout">
    <h2 class="bold">Explore the marketplace</h2>
    <section class="category-list main-layout">
      <section class="icons full">
        <RouterLink to="/explore?category=Graphics+%26+Design">
          <span class="flex">
            <div>
              <span v-html="$svg('graphic')"></span>
              <h4 class="regular">Graphics & Design</h4>
            </div>
          </span>
        </RouterLink>
        <RouterLink to="/explore?category=Digital+Marketing">
          <span class="flex">
            <div>
              <span v-html="$svg('marketing')"> </span>
              <h4 class="regular">Digital Marketing</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Writing+%26+Translation">
          <span class="flex">
            <div>
              <span v-html="$svg('writing')"></span>
              <h4 class="regular">Writing & Translation</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Video+%26+Animation">
          <span class="flex">
            <div>
              <span v-html="$svg('video')"> </span>
              <h4 class="regular">Video & Animation</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Music+%26+Audio">
          <span class="flex">
            <div>
              <span v-html="$svg('music')"> </span>
              <h4 class="regular">Music & Audio</h4>
            </div>
          </span>
        </RouterLink>
        <RouterLink to="/explore?category=Programming+%26+Tech">
          <span class="flex">
            <div>
              <span v-html="$svg('tech')"> </span>
              <h4 class="regular">Programming & Tech</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Business">
          <span class="flex">
            <div>
              <span v-html="$svg('business')"></span>
              <h4 class="regular">Business</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Lifestyle">
          <span class="flex">
            <div>
              <span v-html="$svg('lifestyle')"></span>
              <h4 class="regular">Lifestyle</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Data">
          <span class="flex">
            <div>
              <span v-html="$svg('data')"></span>
              <h4 class="regular">Data</h4>
            </div>
          </span>
        </RouterLink>

        <RouterLink to="/explore?category=Photography">
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
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import Hero from "../cmps/Hero.vue";

export default {
  name: "home",
  data: () => ({
    slides: [
      {
        content: `<a href="#/explore?category=ai-services">
                <div class="subcategory-warper"
                    style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161238/book-covers-2x.png) ;">
                    <span>Add talent to AI</span>
                    <h4>AI Artists</h4>
                </div>
                </a>`,
        props: {
          allow: "click",
        },
      },
      {
        // title: 'Slide #2',
        content: `
                
                    <a href="#/explore?category=logo-design">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png) ;">
                            <span>Build your brand</span>
                            <h4>Logo Design</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #3',
        content: `<a href="#/explore?category=word-press">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png) ;">
                            <span>Customize your site</span>
                            <h4>WordPress</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #4',
        content: `<a href="#/explore?category=voice-over">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png) ;">
                            <span>Share your message</span>
                            <h4>Voice Over</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #5',
        content: `<a href="#/explore?category=video">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png) ;">
                            <span>Engage your audience</span>
                            <h4>Video Explainer</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #6',
        content: `<a href="#/explore?category=social-media">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png) ;">
                            <span>Reach more costumers</span>
                            <h4>Social Media</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #7',
        content: `<a href="#/explore?category=marketing">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png);">
                            <span>Unlock growth online</span>
                            <h4>SEO</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #8',
        content: `<a href="#/explore?category=graphics-design">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png) ;">
                            <span>Color your dreams</span>
                            <h4>Illustration</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #9',
        content: `<a href="#/explore?category=word-press">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/translation-2x.png) ;">
                            <span>Go global</span>
                            <h4>Translation</h4>
                        </div>
                    </a>`,
      },
      {
        // title: 'Slide #10',
        content: `<a href="#/explore?category=data">
                        <div class="subcategory-warper"
                            style="background-image: url(https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png) ;">
                            <span>Learn your business</span>
                            <h4>Data Entry</h4>
                        </div>
                    </a>`,
      },
    ],
    slidesNum: 5,
    width: window.innerWidth,
  }),
  computed: {},
  created() { },
  methods: {},
  components: { VueperSlides, VueperSlide, Hero },
};
</script>

<style>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
