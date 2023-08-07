<template>
    <section class="status-modal">
        <span @click="changeStatus('rejected')" class="statusmodal-rejected fs18">Reject</span>
        <span @click="changeStatus('completed')" class="statusmodal-completed">Complete</span>
        <span @click="changeStatus('accepted')" class="statusmodal-progress">Accept</span>
        <!-- <span @click="changeStatus('pending')" class="statusmodal-pending">pending</span> -->
    </section>
</template>
  
  
<script>


export default {
    props: ['order', 'statusOpen'],
    emits: ['status-changed'],
    created() {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        changeStatus(status) {

            this.$emit('status-changed', { order: this.order, status })
        },

    }
}
</script>