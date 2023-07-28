<template>
    <div class="gig-payment main-layout" v-if="gig">
        <div class="payment-details flex">
            <section class="payment-container">
                <h2>Payment option</h2>
                <p class="semititle-payment">Credit & Debit Cards <span><img src="../assets/imgs/paymentlogo.png"
                            alt=""></span>
                </p>
                <div class="card-container grid">

                    <span class="card-number grid">
                        <label for="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" name="cardNumber" value="4580 5926 2262 7546" required><br><br>
                    </span>
                    <span class="card-date grid">
                        <label for="expirationDate">Expiration Date:</label>
                        <input type="text" id="expirationDate" name="expirationDate" value="12 / 26" required><br><br>
                    </span>
                    <span class="card-security grid">
                        <label for="securityCode">Security Code:</label>
                        <input type="text" id="securityCode" name="securityCode" value="999" required><br><br>
                    </span>
                    <span class="card-name grid">
                        <label for="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" required><br><br>
                    </span>
                    <span class="card-lname grid">
                        <label for="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" required><br><br>
                    </span>

                </div>
            </section>

            <section class="confirm-container">
                <span class="payment-header">
                    <img :src="gig.imgUrls[0]" alt="">
                    <span class="confirm-title"> {{ gig.title }}</span>
                </span>

                <div>
                    <p class="payment-price">US${{ gig.price }}</p>
                    <p class="payment-info">{{ gig.info }}</p>
                    <div class="payment-features-list ">
                        <template v-for="(feature, index) in gig.features" :key="index">
                            <div class="payment-feature">
                                <span class="payment-feature-icon" v-html="$svg('greenCheck')"></span>
                                <span class="payment-feature-text">{{ feature }}</span>
                            </div>
                        </template>
                    </div>
                </div>

                <button class="btn-continue">

                    <span class="btn-continue-arrow" aria-hidden="true" style="width: 16px; height: 16px; fill: white;">
                        <span v-html="$svg('arrowRight')"></span>
                    </span>
                </button>


            </section>
        </div>
    </div>
</template>

<script>

import { userService } from '../services/user.service'
import { gigService } from '../services/gig.service.local'

export default {
    name: 'Payment',
    data() {
        return {
            gig: null,
        }
    },
    async created() {
        try {
            const user = userService.getLoggedinUser()
            if (user) {
                this.$store.commit({ type: "setLoggedinUser", user })
            }

            const { gigId } = this.$route.params
            if (gigId) {
                this.gig = await gigService.getById(gigId)
                await this.$store.dispatch({ type: "loadReviews", filterBy: { gigId: this.gig._id } })
            }
        } catch (err) {
            console.error(err)
        }
    },

}

</script>
