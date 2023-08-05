<template>
    <section v-if="user" class="main-seller flex">
        <span class="top-btns flex">
            <button @click="onLogout()"><span>Logout</span></button>

            <RouterLink :to="userProfile">Gigs I bought</RouterLink>
        </span>
        <add-gig-modal :is-modal-open="isModalOpen" @close="closeModal" @add="handleAddGig"></add-gig-modal>

        <el-row class="earning-table">
            <el-col :span="8">
                <section>
                    <h3>Total completed orders</h3>
                    <p>{{ getTotalEarningsWithoutPendingOrders() }}</p>
                </section>
            </el-col>

            <el-col :span="8">
                <section>
                    <h3>Total earnings</h3>
                    <p>{{ totalEarningsFromAllOrders }}</p>
                </section>
            </el-col>

            <el-col :span="8">
                <section>
                    <h3>Orders Pending</h3>
                    <p>{{ getNumberOfPendingOrders() }}</p>
                </section>
            </el-col>
        </el-row>
        <p>Manage gigs</p>
        <button class="addgig-btn" @click="openModal">Add Gig</button>
        <div v-if="gigs && gigs.length">
            <el-table :border="true" :data="gigs" style="width: 100%">
                <el-table-column prop="title" label="Gig" width="450" />
                <el-table-column prop="price" label="Price" width="120" />
                <el-table-column prop="status" label="Status" width="160">
                    <template #default="{ row }">
                        <el-button :class="getStatusButtonClass(row.status)">{{
                            row.status
                        }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Update Status" width="160">
                    <template #default="{ row }">
                        <select v-model="row.status" @change="updateGigStatus(row)">
                            <option v-for="status in gigStatusOptions" :key="status">
                                {{ status }}
                            </option>
                        </select>
                    </template>
                </el-table-column>
                <!-- Add the new column for the remove button -->
                <el-table-column label="Remove" width="100">
                    <template #default="{ row }">
                        <el-button @click="removeGig(row._id)" type="danger" icon="el-icon-delete">X</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-else>
            <p>No gigs available.</p>
        </div>

        <p>Manage orders</p>
        <div v-if="orders && orders.length">
            <el-table :border="true" :data="orders" style="width: 100%">
                <el-table-column prop="buyerId" label="Buyer" width="190" />
                <el-table-column prop="price" label="Price" width="150" />
                <el-table-column prop="gigId" label="Gig" width="250" />
                <el-table-column prop="status" label="Status" width="210">
                    <template #default="{ row }">
                        <el-button :class="getStatusButtonClass(row.status)">{{
                            row.status
                        }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Update Status" width="190">
                    <template #default="{ row }">
                        <select v-model="row.status" @change="updateStatus(row)">
                            <option v-for="status in statusOptions" :key="status">{{ status }}</option>
                        </select>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-else>
            <p>No orders available.</p>
        </div>
    </section>
</template>

<script>
// import { SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED, socketService } from '../services/socket.service'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { userService } from "../services/user.service";
import GigList from "../cmps/GigList.vue";
import { gigService } from "../services/gig.service";
import { orderService } from "../services/order.service.local";
import { getActionRemoveGig, getActionUpdateGig } from "../store/gig.store";
import { getActionUpdateOrder } from "../store/order.store";
import AddGigModal from "../cmps/AddGigModal.vue";

export default {
    components: { GigList },
    data() {
        return {
            user: null,
            isModalOpen: false,
            statusOptions: ["rejected", "completed", "in progress", "pending"],
            gigStatusOptions: ["active", "paused"],
        };
    },
    watch: {
        userId: {
            handler() {
                if (this.userId) {
                    this.loadUser();
                    this.$store.dispatch({ type: "loadOrders", filterBy: { id: this.userId } });
                    this.$store.dispatch({ type: "loadGigs", filterBy: { id: this.userId } });
                }
            },
            immediate: true,
        },
    },
    computed: {
        userId() {
            return this.$route.params.id;
        },

        gigs() {
            return this.user && this.user.isSeller
                ? JSON.parse(JSON.stringify(this.$store.getters.gigs))
                : [];
        },
        orders() {
            return JSON.parse(JSON.stringify(this.$store.getters.orders));
        },
        userProfile() {
            return "/user/" + this.userId;
        },
        totalEarningsFromAllOrders() {
            return this.orders.reduce((total, order) => {
                if (order.status !== "rejected") {
                    return total + order.price;
                }
                return total;
            }, 0);
        },
        totalEarningsWithoutPendingOrders() {
            return this.orders.filter((order) => order.status === "completed").length;
        },
        numberOfPendingOrders() {
            return this.orders.filter((order) => order.status === "pending").length;
        },
    },
    created() { },
    methods: {
        async loadUser() {
            if (!this.userId) return;
            try {
                const user = await userService.getById(this.userId);
                // socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)

                // socketService.emit(SOCKET_EMIT_USER_WATCH, this.userId)
                // socketService.on(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
                this.user = user;
            } catch (err) {
                showErrorMsg("Cannot load user: " + this.userId);
                console.error("Failed to load user", err);
            }
        },
        // unmounted() {
        //   socketService.off(SOCKET_EVENT_USER_UPDATED, this.onUserUpdate)
        // },
        async addGig() {
            try {
                await this.$store.dispatch({ type: "addGig", gig: this.gigToAdd });
                showSuccessMsg("Gig added");
                this.gigToAdd = gigService.getEmptyGig();
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot add gig");
            }
        },
        async removeGig(gigId) {
            try {
                await this.$store.dispatch(getActionRemoveGig(gigId));
                showSuccessMsg("Gig removed");
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot remove gig");
            }
        },
        async updateGig(gig) {
            try {
                gig = { ...gig };
                gig.price = +prompt("New price?", gig.price);
                await this.$store.dispatch(getActionUpdateGig(gig));
                showSuccessMsg("Gig updated");
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot update gig");
            }
        },
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        async handleAddGig(gig) {
            gig.owner = { _id: this.userId };
            try {
                await this.$store.dispatch({ type: "addGig", gig });
                showSuccessMsg("Gig added");
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot add gig");
            }
        },
        async updateStatus(order) {
            const newOrder = JSON.parse(JSON.stringify(order));
            newOrder.status = order.status;

            try {
                await this.$store.dispatch(getActionUpdateOrder(newOrder));
                showSuccessMsg("order status updated");
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot update order status");
            }
        },
        getStatusButtonClass(status) {
            return {
                "btn-rejected": status === "rejected",
                "btn-completed": status === "completed",
                "btn-in-progress": status === "in progress",
                "btn-pending": status === "pending",
            };
        },
        onLogout() {
            userService.logout();
            this.$router.push("/");
            setTimeout(() => {
                location.reload();
            }, 100);
        },
        async updateGigStatus(gig) {
            const newGig = JSON.parse(JSON.stringify(gig));
            newGig.status = gig.status;

            try {
                await this.$store.dispatch(getActionUpdateGig(newGig));
                showSuccessMsg("Gig status updated");
            } catch (err) {
                console.log(err);
                showErrorMsg("Cannot update gig status");
            }
        },
        getTotalEarningsFromAllOrders() {
            return this.totalEarningsFromAllOrders.toFixed(2);
        },
        getTotalEarningsWithoutPendingOrders() {
            return this.totalEarningsWithoutPendingOrders;
        },
        getNumberOfPendingOrders() {
            return this.numberOfPendingOrders;
        },
    },

    components: {
        AddGigModal,
    },
};
</script>
