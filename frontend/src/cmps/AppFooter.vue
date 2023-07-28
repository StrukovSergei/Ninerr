<template>
    <section class="app-footer main-layout full">
        <div class="content-container flex align-center ">
            <div class="title">
                <span class="logo"><img src="../assets/imgs/footer-logo.png" alt=""><span class="smallRForLogo">®</span>
                </span>
                <small class="copy-rights">© Ninerr International Ltd. 2023</small>
            </div>
            <div class="social-links flex space-between">
                <div>
                    <a>
                        <span v-html="$svg('twitwer')"></span>
                    </a>
                </div>
                <div>
                    <a>
                        <span v-html="$svg('facebook')"></span>
                    </a>
                </div>
                <div>
                    <a>
                        <span v-html="$svg('linkdin')"></span>
                    </a>
                </div>
                <div>
                    <a>
                        <span v-html="$svg('pintres')"></span>
                    </a>
                </div>
                <div>
                    <a>
                        <span v-html="$svg('instegram')"></span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>