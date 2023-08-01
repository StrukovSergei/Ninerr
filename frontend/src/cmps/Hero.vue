<template>
    <section class="hero-container main-layout full">
        <div class="hero-pos-container full">
            <vueper-slides autoplay class="no-shadow" fade :arrows="false" :bullets="false" :pause-on-hover="false">
                <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.img">
                    <template #content>
                        <div class="hero-info">
                            <div class="info-pic">
                                <img :src="pic[i].content" alt="pic" />
                            </div>
                            <div class="info-txt">
                                <span class="fullname">
                                    {{ info.fullname[i] }}
                                </span>
                                <span class="star">
                                    5
                                    <span v-html="$svg('star')"> </span>
                                </span>
                            </div>
                            <p class="expert">{{ info.expert[i] }}</p>
                        </div>
                    </template>
                </vueper-slide>
            </vueper-slides>
        </div>
        <div class="search-container main-layout">
            <h1>
                Find the right
                <i class="fancy-word">freelance </i>
                services, right away
            </h1>
            <div class="hero-search flex">
                <div class="input-container flex">
                    <input type="text" name="" placeholder=' Try "Logo Design"' />
                </div>
                <button class="el-button">
                    <span class="search-icon" v-html="$svg('search')"></span>
                </button>
            </div>
            <div class="categories flex">
                <span> Popular: </span>
                <RouterLink to="/explore?category=Digital+Marketing">
                    <div class="category flex">Website Design</div>
                </RouterLink>
                <RouterLink to="/explore?category=Writing+%26+Translation">
                    <div class="category flex">WordPress</div>
                </RouterLink>
                <RouterLink to="/explore?category=Graphics+%26+Design">
                    <div class="category flex">Logo Design</div>
                </RouterLink>
                <RouterLink to="/explore?category=AI+Services">
                    <div class="category flex">AI Services</div>
                </RouterLink>
            </div>
        </div>
    </section>

    <div class="trusted-container main-layout full">
        <div class="logos flex align-center justify-center">
            <span class="trusted-by-title">Trusted By:</span>
            <div class="icon-container">
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
                    alt="" />
            </div>
            <div class="icon-container">
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
                    alt="" />
            </div>
            <div class="icon-container">
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
                    alt="" />
            </div>
            <div class="icon-container">
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
                    alt="" />
            </div>
            <div class="icon-container">
                <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
                    alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
    name: "Hero",
    data() {
        return {
            filterBy: {
                txt: "",
            },
            pic: [
                {
                    content:
                        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png",
                },

                {
                    content:
                        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png",
                },

                {
                    content:
                        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png",
                },

                {
                    content:
                        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png",
                },

                {
                    content:
                        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png",
                },
            ],
            info: {
                fullname: ["@christina", "@jenny ", "@colin", "@scarlett ", "@jordan"],
                expert: [
                    "Jewelry Shop Owner",
                    "Children's Voice Over",
                    "Creative Director",
                    "Business Founder",
                    "Production Assistant",
                ],
                rate: [5, 0, 5, 0, 0, 5],
            },
            slides: [
                {
                    // christina,
                    img:
                        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg",
                },
                {
                    // jenny,
                    img:
                        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg",
                },
                {
                    // colin,
                    img:
                        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg",
                },
                {
                    // scarlett ,
                    img:
                        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg",
                },
                {
                    // jordan,
                    img:
                        "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg",
                },
            ],
        };
    },
    methods: {},
    components: { VueperSlides, VueperSlide },
};
</script>
