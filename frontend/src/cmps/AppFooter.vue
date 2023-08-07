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
                <span>
                    <RouterLink active-class="active" to="/mobileCategory">
                        <a class="search-svg" v-html="$svg('magnifyingGlass')"> </a>
                    </RouterLink>
                </span>
            </li>
            <li>
                <a v-html="$svg('note')"> </a>
            </li>
            <li>
                <span>
                    <RouterLink @click="this.ifNewOrder = true" active-class="active" :to="sellerProfile">
                        <a class="profile-svg" v-html="$svg('user')"> </a>
                    </RouterLink>
                    <span class="new-order-dot" :class="{ 'hidden': this.ifNewOrder }">.</span>

                </span>
            </li>
        </ul>
    </footer>
</template>

<script>
import { socketService, SOCKET_EVENT_GIG_ORDERED } from "../services/socket.service";
export default {

    name: "AppFooter",
    data() {
        return {
            ifNewOrder: true,
        }
    },
    created() {

        socketService.on(SOCKET_EVENT_GIG_ORDERED, this.dotUpdate)
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        sellerProfile() {
            return "/seller/" + this.loggedinUser?._id
        }
    },
    methods: {
        dotUpdate() {
            setTimeout(() => {
                this.ifNewOrder = false
            }, 300)


        }
    }
};
</script>
