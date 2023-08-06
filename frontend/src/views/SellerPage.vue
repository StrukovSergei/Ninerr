<template>
    <section v-if="user" class="main-seller flex">
        <span class="top-btns flex">
            <button @click="onLogout()"><span>Logout</span></button>

            <RouterLink :to="userProfile">Gigs I bought</RouterLink>
        </span>
        <add-gig-modal :is-modal-open="isModalOpen" @close="closeModal" @add="handleAddGig"></add-gig-modal>
        <section class="anlaytics-for-mobile">
            <el-row class="earning-table">
                <el-col :span="7">
                    <section>
                        <h4>completed orders</h4>
                        <span class="align-center">{{ getTotalEarningsWithoutPendingOrders() }}</span>
                    </section>
                </el-col>

                <el-col :span="8">
                    <section>
                        <h4>Total earnings</h4>
                        <span class="align-center">${{ totalEarningsFromAllOrders }}</span>
                    </section>
                </el-col>

                <el-col :span="8">
                    <section>
                        <h4>Orders Pending</h4>
                        <span class="align-center">{{ getNumberOfPendingOrders() }}</span>
                    </section>
                </el-col>
            </el-row>
            <div class="analytics-rows">
                <div class="flex">
                    <h2>Earing in August</h2>
                    <h1>${{ totalEarningsFromAllOrders }}</h1>
                </div>
                <div class="flex">
                    <h2>Avg. selling price</h2>
                    <h1>$29.23</h1>
                </div>
                <div class="flex">
                    <h2>Active orders</h2>
                    <h1>
                        {{ numberOfInProgressOrders }}<span> (${{ earningsInProgressOrders }})</span>
                    </h1>
                </div>
            </div>
        </section>
        <section class="manage-gigs-container">
            <p class="Manage-gigs">Manage gigs</p>
            <button class="addgig-btn" @click="openModal">Add Gig</button>
            <div v-if="gigs && gigs.length" class="Manage-gigsT">
                <el-table class="gigsT" :border="true" :data="gigs" style="width: 100%">
                    <el-table-column prop="title" label="Gig" width="450" class-name="custom-title-column" />
                    <el-table-column prop="price" label="Price" width="120" class-name="custom-price-column" />
                    <el-table-column prop="status" label="Status" width="160" class-name="custom-column">
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
            <div v-else class="No-gigs-available">
                <p>No gigs available.</p>
            </div>
        </section>
    </section>
    <section class="manage-orders-container">
        <p class="Manage-orders">Manage orders</p>
        <div class="demo-collapse">
            <el-collapse accordion>
                <el-collapse-item class="order-title" v-for="order in orders" :key="order.id"
                    :title="`${order.buyerName} - ${order.status}`" :name="order.id">
                    <div>
                        <p>
                            Gig: <span class="order-inner-span">{{ order.gigTitle }}</span>
                        </p>
                        <p>
                            Status: <span class="order-inner-span">{{ order.status }}</span>
                        </p>
                        <p>
                            Price: <span class="order-inner-span">${{ order.price }}</span>
                        </p>
                        <p>
                            Buyer: <span class="order-inner-span">{{ order.buyerName }}</span>
                        </p>
                        <el-dropdown placement="top-end">
                            <span class="el-dropdown-link">
                                Change status
                                <span v-html="$svg('arrowDown')"></span>
                                <el-icon class="el-icon--right"> </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="status in statusOptions"
                                        @click="updateStatus(order, status)">{{ status }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <!-- <div >
                        <p>Status: {{ order.status }}</p>
                        <p>Gig: {{ order.gigTitle }}</p>
                        <p>Price: {{ order.price }}</p>
                        <el-button @click="changeStatus(order)">Change Status</el-button>
                    </div> -->
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- <div v-if="orders && orders.length">
            <el-table :border="true" :data="orders" style="width: 100%">
                <el-table-column prop="buyerName" label="Buyer" width="145" />
                <el-table-column prop="price" label="Price" width="150" />
                <el-table-column prop="gigTitle" label="Gig" width="250" />
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
        <div v-else class="No-orders-available">
            <p>No orders available.</p>
        </div> -->
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
            activeNames: [],
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
            return this.orders
                .reduce((total, order) => {
                    if (order.status !== "rejected" && order.status !== "pending") {
                        const orderPrice = parseFloat(order.price);
                        return total + orderPrice;
                    }
                    return total;
                }, 0)
                .toFixed(2);
        },
        totalEarningsWithoutPendingOrders() {
            return this.orders.filter((order) => order.status === "completed").length;
        },
        numberOfPendingOrders() {
            return this.orders.filter((order) => order.status === "pending").length;
        },
        numberOfInProgressOrders() {
            return this.orders.filter((order) => order.status === "in progress").length;
        },
        earningsInProgressOrders() {
            return this.orders
                .reduce((total, order) => {
                    if (order.status == "in progress") {
                        const orderPrice = parseFloat(order.price);
                        return total + orderPrice;
                    }
                    return total;
                }, 0)
                .toFixed(2);
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
        async updateStatus(order, status) {
            const newOrder = JSON.parse(JSON.stringify(order));
            newOrder.status = status;

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
        getTitle(order) {
            return this.activeNames.includes(order.id)
                ? "Buyer and Status"
                : "Order Information";
        },
        isCollapsed(order) {
            return !this.activeNames.includes(order.id);
        },
        getCustomTitle() {
            return `${this.order.buyerName} - ${this.order.status}`;
        },
        test(order, status) {
            console.log(status);
            console.log("Order:", order);
        },
    },

    components: {
        AddGigModal,
    },
};
</script>
