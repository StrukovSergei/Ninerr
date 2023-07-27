<!-- AddGigModal.vue -->
<template>
    <div class="modal" v-if="isModalOpen">
        <div class="modal-content">
            <h2>Add New Gig</h2>
            <form @submit.prevent="addGig">
                <label>Title:</label>
                <input v-model="title" required />

                <label>Price:</label>
                <input v-model="price" type="number" required />

                <label>Description:</label>
                <textarea v-model="description" required></textarea>

                <label>Tags (comma-separated):</label>
                <input v-model="tags"/>

                <label>Images (comma-separated URLs):</label>
                <input v-model="imageUrls"/>

                <button type="submit">Add Gig</button>
                <button @click="closeModal">Cancel</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['isModalOpen'],
    data() {
        return {
            title: '',
            price: '',
            description: '',
            tags: '',
            imageUrls: ''
        };
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        addGig() {
            const gig = {
                title: this.title,
                price: parseFloat(this.price),
                description: this.description,
                tags: this.tags.split(',').map(tag => tag.trim()),
                imgUrls: this.imageUrls.split(',').map(url => url.trim())
            };
            this.$emit('add', gig)
            this.closeModal()
        }
    }
}
</script>
