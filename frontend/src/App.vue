<template>
  <section class="main-app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </section>
</template>

import AppFooter from './cmps/AppFooter.vue'
<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppFooter from "./cmps/AppFooter.vue";
import AppHeader from "./cmps/AppHeader.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  created() {
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
  },
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  },
};
</script>
