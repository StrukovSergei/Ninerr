<template>
    <section class="seller-register main-layout">
        <h1>Register as Seller</h1>
        <form>
            <label class="flex align-center">
                <span>Full Name
                    <p>Ex. John Smith</p>
                </span>
                <input />
            </label>
            <label class="flex align-center">
                <span>Username
                    <p>this name will be shown to other users</p>
                </span>
                <input />
            </label>
            <label class="flex align-center">
                <span>Gig Title
                    <p>Ex. I will make professional logo design</p>
                </span>
                <input />
            </label>
            <!-- <div class="flex align-center">
                <span>Profile Picture
                    <p>
                        Add a profile picture of yourself so customers will know exactly who they’ll
                        be working with.
                    </p>
                </span>
            </div> -->
            <label class="flex align-center">
                <span>Description
                    <p>
                        Share a bit about your work experience, cool projects you’ve completed, and
                        your area of expertise.
                    </p>
                </span>
                <textarea />
            </label>
            <label class="flex align-center">
                <span>Price
                    <p>Price for the gig</p>
                </span>
                <input />
            </label>
            <label class="flex align-center">
                <span>Img's
                    <p>Upload img's for the gig</p>
                </span>
                <input type="file" accept="image/*" multiple @change="handleImageUpload" />
            </label>
        </form>
        <div class="btns flex">
            <button class="cancel-btn" @click="cancel">Cancel</button>
            <button class="save-btn" @click="startProcessing">Post gig</button>
            <div v-if="processing" class="processing-message">
                Your gig is being processed. Please wait...
            </div>
        </div>
    </section>
</template>

<script>
import { uploadService } from "../services/upload.service.js"
export default {
    data() {
        return {
            processing: false,
            uploadedImages: []
        }
    },
    methods: {
        cancel() {
            this.$router.push('/')
        },
        startProcessing() {
            this.processing = true

            setTimeout(() => {
                this.processing = false

            }, 3000)
        },
        async handleImageUpload(event) {
            try {
                const uploadedImageUrls = await Promise.all(
                    Array.from(event.target.files).map(async (file) => {
                        const imageUrl = await uploadService.uploadImg(file)
                        return imageUrl.secure_url
                    })
                )

                this.uploadedImages = [...this.uploadedImages, ...uploadedImageUrls]
            } catch (error) {
                console.error('Failed to upload images', error)
            }
        }
    }
}
</script>

<style></style>
