<template>
    <div class="order-modal">
        <div class="modal-tip"></div>
        <div class="small-order-info" v-for="order in orders">
            <img :src="order.imgUrl" alt="" class="gig-img">
            <div class="gig-title">{{ order.gigTitle }}</div>
            <span class="gig-status" :class="`status-${order.status}`">{{ order.status }}</span>
        </div>
        <RouterLink active-class="active" :to="`/user/${userId}`"><span class="btn-all-orders fs14">View all orders ></span></RouterLink>
    </div>
</template>
  
  
<script>


export default {
    created() {
        this.$store.dispatch({
            type: "loadOrders",
            filterBy: { buyerId: this.userId },
        })
    },
    data() {
        return {

        }
    },
    computed: {
        userId() {
            return this.$store.getters.loggedinUser._id
        },
        orders() {
            return this.$store.getters.orders
        },
    },
    methods: {

    }
}
</script>