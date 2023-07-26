<template>
    <section class="hero-container main-layout full">
        <div class="hero-pos-container main-layout full">
            <vueper-slides autoplay class="no-shadow" fade :arrows="false" :bullets="false" :pause-on-hover=false>
                <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" />
            </vueper-slides>

            <div class="search-container">
                <h1>
                    Find the perfect
                    <i class="fancy-word">freelance</i> <br>
                    services for your business
                </h1>
                <div class="hero-search flex">
                    <div class="input-container flex">
                        <input type="text" name="" placeholder='Try "Logo Design"'>
                    </div>
                    <a href="'/#/gig?txt=' + filterBy.txt">
                        <button class="el-button">
                            <span>
                                Search
                            </span>
                        </button>
                    </a>
                </div>
                <div class="categories flex">
                    <span>
                        Popular:
                    </span>
                    <RouterLink to="/gig?tag=website-design">
                        <div class="category flex">Website Design</div>
                    </RouterLink>
                    <RouterLink to="/gig?tag=word-press">
                        <div class="category flex">WordPress</div>
                    </RouterLink>
                    <RouterLink to="/gig?tag=logo-design">
                        <div class="category flex">Logo Design</div>
                    </RouterLink>
                    <RouterLink to="/gig?tag=ai-services">
                        <div class="category flex">AI Services</div>
                    </RouterLink>
                </div>
            </div>
        </div>

    </section>
    <div class="trusted-container full">
        <div class="trusted main-layout full">
            <div class="logos flex align-center justify-center">
                <span>Trusted By:</span>
                <div class="icon-container"><img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
                        alt=""> </div>
                <div class="icon-container"><img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
                        alt=""> </div>
                <div class="icon-container"><img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
                        alt=""> </div>
                <div class="icon-container"><img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
                        alt=""> </div>
                <div class="icon-container"><img
                        src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
                        alt=""> </div>
            </div>
        </div>
        <section class="categories-list main-layout full">
        </section>
    </div>
</template>

<script>


import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    name: 'Hero',
    data() {
        return {
            filterBy: {
                txt: '',
            },
            slides: [
                { image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/062d9604f20f64f4b45f8501aeea8212-1674662964518/bg-hero-6-900-x1.png" },
                { image: "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670768271/gigs/zj3dflxnixaytffgqpn9.webp" },
                { image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203045/bg-hero-2-1792-x1.png" },
                { image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png" },
                { image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734108/bg-hero-4-1792-x1.png" },
                { image: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png" },
            ],

        }
    },
    components: { VueperSlides, VueperSlide },
}

</script>