<template>
    <div class="seller-modal">
        <div class="modal-tip-"></div>
        <div class="small-order-info-" v-for="order in orders">
            <img :src="order.imgUrl" alt="" class="gig-img-">
            <div class="gig-title- flex"><span class="title-helper">Buyer</span>     {{ order.buyerName }} </div>
            <div class="gig-title- flex"><span class="title-helper">Price</span>     ${{ order.price }} </div>
            
        </div>
    </div>
</template>
  
  
<script>


export default {
    created() {
        this.$store.dispatch({
            type: "loadOrders",
            filterBy: { sellerId: this.userId },
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