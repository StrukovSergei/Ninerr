<template>
    <section class="app-footer main-layout full">
        <div class="content-container flex align-center">
            <div class="title flex align-center">
                <span class="logo"><img src="../assets/imgs/footer-logo.png" alt="" /><span class="smallRForLogo">®</span>
                </span>
                <small class="copy-rights">© Ninerr International Ltd. 2023</small>
            </div>
            <ul class="social-links clean-list flex space-between">
                <li>
                    <a v-html="$svg('twitwer')"> </a>
                </li>
                <li>
                    <a v-html="$svg('facebook')"> </a>
                </li>
                <li>
                    <a v-html="$svg('linkdin')"> </a>
                </li>
                <li>
                    <a v-html="$svg('pintres')"> </a>
                </li>
                <li>
                    <a v-html="$svg('instegram')"> </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>
