<template>
    <section class="hero-container main-layout ">
        <vueper-slides autoplay fade :arrows="false" :bullets="false">
            <img src="../assets/imgs/hero1.webp" alt="">
            <!-- <img src="../assets/imgs/hero2.webp" alt=""> -->
        </vueper-slides>


        <div class="search-container flex">
            <h1>
                Find the perfect
                <i class="fancy-word">freelance</i> <br>
                services for your business
            </h1>
            <div class="hero-search flex">
                <div class="input-container flex">
                    <div class="search-icon flex">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                fill="#95979D">
                                <path
                                    d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z">
                                </path>
                            </svg>
                        </span>
                    </div>
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
        </div>

        <div class="img-container full">
            <span>Trusted By:</span>
            <img src="../assets/imgs/meta.png" alt="">
            <img src="../assets/imgs/pandg.png" alt="">
            <img src="../assets/imgs/netflix.png" alt="">
            <img src="../assets/imgs/google.png" alt="">
            <img src="../assets/imgs/paypal.png" alt="">

        </div>
    </section>
</template>

<script>
export default {
    name: 'Hero',
}
</script>