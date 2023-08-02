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
                <span>Password
                    <p>4 characters or more</p>
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
                <span>Country
                    <p>Where are you from?</p>
                </span>
                <input />
            </label>
        </form>
        <div class="btns flex">
            <button class="cancel-btn" @click="cancelSignup">Cancel</button>
            <button class="save-btn" @click="saveUser">Sign up</button>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style></style>
