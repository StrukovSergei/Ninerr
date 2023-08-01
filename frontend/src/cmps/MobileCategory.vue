<template>
    <section class="mobil flex">
        <nav>
            <h3>Categories</h3>
        </nav>
        <RouterLink to="/explore?category=Graphics+%26+Design">
            <span class="item flex align-center">
                <span v-html="$svg('graphic')"></span>
                <div>
                    <h4 class="regular">Graphics & Design</h4>
                    <p>Logo & Brand Identity, Gaming</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Digital+Marketing">
            <span class="item flex align-center">
                <span v-html="$svg('marketing')"> </span>
                <div>
                    <h4 class="regular">Digital Marketing</h4>
                    <p>Social Medida Marketing, Search Engine Optimization (SEO)</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Writing+%26+Translation">
            <span class="item flex align-center">
                <span v-html="$svg('writing')"></span>
                <div>
                    <h4 class="regular">Writing & Translation</h4>
                    <p>Article & BlogPosts, Translation</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Video+%26+Animation">
            <span class="item flex align-center">
                <span v-html="$svg('video')"> </span>
                <div>
                    <h4 class="regular">Video & Animation</h4>
                    <p>Video Editing, Video Ads & Commercials</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Music+%26+Audio">
            <span class="item flex align-center">
                <span v-html="$svg('music')"> </span>
                <div>
                    <h4 class="regular">Music & Audio</h4>
                    <p>Producers & Composers, Mixing & Mastering</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Programming+%26+Tech">
            <span class="item flex align-center">
                <span v-html="$svg('tech')"> </span>
                <div>
                    <h4 class="regular">Programming & Tech</h4>
                    <p>Website Development, Website Maitenance</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Data">
            <span class="item flex align-center">
                <span v-html="$svg('data')"></span>
                <div>
                    <h4 class="regular">Data</h4>
                    <p>Databases, Data Processing</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Business">
            <span class="item flex align-center">
                <span v-html="$svg('business')"></span>
                <div>
                    <h4 class="regular">Business</h4>
                    <p>Virtual Assistant, E-Commerce Management</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Lifestyle">
            <span class="item flex align-center">
                <span v-html="$svg('lifestyle')"></span>
                <div>
                    <h4 class="regular">Lifestyle</h4>
                    <p>Self Impruvment, Wellness & Fitness</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Photography">
            <span class="item flex align-center">
                <span v-html="$svg('photography')"></span>
                <div>
                    <h4 class="regular">Photography</h4>
                    <p>Product Photographers, Portrait Photographers</p>
                </div>
            </span>
        </RouterLink>

        <RouterLink to="/explore?category=Photography">
            <span class="item flex align-center">
                <span v-html="$svg('robot')"></span>
                <div>
                    <h4 class="regular">AI Services</h4>
                    <p>Build your AI app, Get your data right</p>
                </div>
            </span>
        </RouterLink>
    </section>
</template>

<script></script>

<style lang="scss" scoped></style>
