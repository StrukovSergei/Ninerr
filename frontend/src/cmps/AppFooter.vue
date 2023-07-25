<template>
    <footer>
        <div class="footer-logo">fiverr</div>
        <nav>
            <RouterLink to="/">
                <span role="img" aria-label="logo">🙏</span>
            </RouterLink>
            <RouterLink to="/explore">Explore</RouterLink>
            <RouterLink to="/review">Reviews</RouterLink>
            <RouterLink to="/chat">Chat</RouterLink>
            <RouterLink to="/login">Login / Signup</RouterLink>
        </nav>
    </footer>
</template>
<script>
export default {
    computed: {

    }
}
</script>