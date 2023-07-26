<template>
    <section class="hero-container main-layout ">
        <vueper-slides autoplay fade :arrows="false" :bullets="false">
            <div class="hero-img main-layout full">
                <img src="../assets/imgs/hero1.webp" alt="">
            </div>
            <!-- <img src="../assets/imgs/hero2.webp" alt=""> -->
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
                Popular:
                <button class="tag">Website Design</button>
                <button class="tag">WordPress</button>
                <button class="tag">Logo Design</button>
                <button class="tag">Video Editing</button>

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