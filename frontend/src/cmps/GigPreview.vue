<template>
    <section>
        <!-- <ul class="gig-list"> -->
            <li class="gig-preview" @click="goToDetail">
                <img :src="gig.imgUrls[0]" class="product_img"/>
            <section class="user_preview">
                <div class="user_info">
                    <img class="user_img" :src="gig.owner.imgUrl" />
                    <a class="user_name txt_body">{{ gig?.owner.fullname }}</a>
                </div>
            <div>
                <h3 class="level txt_body">{{ gig.owner.level }}</h3>
            </div>
        </section>
            <h3 class="title_product txt_body">{{ gig?.title }}</h3>
            <div class ="rate">
             <span v-html="$svg('blackStar')"></span> 
            <p class="txt_body">{{ gig?.owner.rate }}</p>
            </div>            
          <p class="price_product txt_body">
               From ${{ gig.price?.toLocaleString() }}
            </p>
            <!-- <button @click="removeGig(gig._id)">x</button> -->
            <hr />
        </li>
        <!-- </ul> -->
        <!-- <form @submit.prevent="addGig()">
            <h2>Add gig</h2>
            <input type="text" v-model="gigToAdd.title" />
            <button>Save</button>
        </form> -->

    </section>
</template>

<script>


export default {
    name: 'GigPreview',
    props: {
        gig: Object,
    },
    data() {
        return {

        }
    },
    computed: {
        gigs() {
            return this.$store.getters.gigs
        }
    },

    methods: {
        goToDetail() {
            this.$router.push(`/gig/${this.gig._id}`)
        },

    },
}

</script>
