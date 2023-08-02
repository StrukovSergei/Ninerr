<template>
    <footer class="app-footer main-layout full">
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
    </footer>
    <footer class="mobil-footer full">
        <ul class="menu-icons clean-list flex space-between">
            <li>
                <RouterLink active-class="active" to="/">
                    <a v-html="$svg('home')"> </a>
                </RouterLink>
            </li>
            <li>
                <a v-html="$svg('envelope')"> </a>
            </li>
            <li>
                <RouterLink active-class="active" to="/mobileCategory">
                    <a v-html="$svg('magnifyingGlass')"> </a>
                </RouterLink>
            </li>
            <li>
                <a v-html="$svg('note')"> </a>
            </li>
            <li>
                <RouterLink active-class="active" to="/user/:id">
                    <a v-html="$svg('user')"> </a>
                </RouterLink>
            </li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>
