<template>
    <div class="gig-payment main-layout" v-if="gig">
        <div class="payment-details flex">
            <section class="payment-container">
                <h2>Payment option</h2>
                <p class="semititle-payment">
                    <span class="radio-dot"><el-radio size="large"></el-radio></span>

                    Credit & Debit Cards
                    <span><img src="../assets/imgs/paymentlogo.png" alt="" /></span>
                </p>
                <div class="card-container grid">
                    <span class="card-number grid">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" value="4580 5926 2262 7546"
                            required /><br /><br />
                    </span>
                    <span class="card-date grid">
                        <label for="expirationDate">Expiration Date</label>
                        <input type="text" id="expirationDate" name="expirationDate" value="12 / 26" required /><br /><br />
                    </span>
                    <span class="card-security grid">
                        <label for="securityCode">Security Code</label>
                        <input type="text" id="securityCode" name="securityCode" value="999" required /><br /><br />
                    </span>
                    <span class="card-name grid">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required /><br /><br />
                    </span>
                    <span class="card-lname grid">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required /><br /><br />
                    </span>
                </div>
                <div class="paypal">
                    <span class="radio-dot"><el-radio size="large"></el-radio></span>
                    <span v-html="$svg('paypal')"></span>
                </div>
            </section>

            <section class="confirm-container">
                <span class="payment-header">
                    <img :src="gig.imgUrls[0]" alt="" />
                    <span class="confirm-title"> {{ gig.title }}</span>
                </span>

                <div>
                    <p class="payment-price">US${{ gig.price }}</p>
                    <p class="payment-info">{{ gig.info }}</p>
                    <div class="payment-features-list">
                        <template v-for="(feature, index) in gig.features" :key="index">
                            <div class="payment-feature">
                                <span class="payment-feature-icon" v-html="$svg('greenCheck')"></span>
                                <span class="payment-feature-text">{{ feature }}</span>
                            </div>
                        </template>
                    </div>
                    <div class="payment-fees flex">
                        <p class="payment-fee">
                            <span class="payment-fee-label">Service Fee</span>
                            <span class="payment-fee-value">US${{ serviceFee.toFixed(2) }}</span>
                        </p>
                        <p class="payment-vat">
                            <span class="payment-vat-label">VAT</span>
                            <span class="payment-vat-value">US${{ vat.toFixed(2) }}</span>
                        </p>
                        <p class="payment-total fs20">
                            <span class="payment-total-label">Total</span>
                            <span class="payment-total-value">US${{ total.toFixed(2) }}</span>
                        </p>
                        <p class="payment-delivery">
                            <span class="payment-delivery-label">Total delivery time</span>
                            <span class="payment-total-value">{{ gig.daysToMake }}</span>
                        </p>
                    </div>
                </div>

                <RouterLink v-if="user" :to="{ name: 'UserDetails', params: { id: user._id } }">
                    <button @click="addOrder()" class="btn-confirm">Confirm & Pay</button>
                </RouterLink>
                <button v-else class="btn-confirm" @click="handleConfirmAndPay()">
                    Confirm & Pay
                </button>
            </section>
        </div>
    </div>
</template>

<script>
import { userService } from "../services/user.service";
import { gigService } from "../services/gig.service";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { socketService } from "../services/socket.service";

export default {
    name: "Payment",
    data() {
        return {
            gig: null,
            user: null,
            order: {},
        };
    },
    async created() {
        try {
            const user = userService.getLoggedinUser();
            if (user) {
                this.$store.commit({ type: "setLoggedinUser", user });
                this.user = user;
            }

            const { gigId } = this.$route.params;
            if (gigId) {
                this.gig = await gigService.getById(gigId);
                await this.$store.dispatch({
                    type: "loadReviews",
                    filterBy: { gigId: this.gig._id },
                });
            }
        } catch (err) {
            console.error(err);
        }
    },
    computed: {
        serviceFee() {
            return this.gig ? this.gig.price * 0.15 : 0;
        },
        vat() {
            return this.gig ? this.gig.price * 0.17 : 0;
        },
        total() {
            return this.gig ? this.gig.price + this.serviceFee + this.vat : 0;
        },
    },
    methods: {
        handleConfirmAndPay() {
            alert("Login required");
        },
        async addOrder() {
            this.order.sellerId = this.gig.owner._id;
            this.order.buyerId = this.user._id;
            this.order.buyerName = this.user.fullname;
            this.order.gigId = this.gig._id;
            this.order.gigTitle = this.gig.title;
            this.order.imgUrl = this.gig.imgUrls[0];
            this.order.price = this.total.toFixed(2);
            this.order.status = "pending";
            try {
                await this.$store.dispatch({ type: "addOrder", order: this.order });
                showSuccessMsg("Order added");
                socketService.emit("gig-ordered", this.order);
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot add order");
            }
        },
    },
};
</script>
