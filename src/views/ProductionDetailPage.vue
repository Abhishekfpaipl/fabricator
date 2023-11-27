<template>
    <nav class="navbar border-bottom navbar-expand-lg" style="background-color: #25C297;">
        <div class="container-fluid">
            <router-link to="/production-department" class="ps-1 pe-3 text-white">
                <i class="bi bi-chevron-left"></i>
            </router-link>
            <div class="navbar-brand flex-fill d-flex align-items-center gap-2 text-white">
                <span>Production</span>
                <i class="bi bi-arrow-right"></i>
                <small>{{ this.purchaseId }}</small>
            </div>
        </div>
    </nav>
    <div class="container" style="padding-bottom:80px ;">
        <p class="my-3 text-center fs-5 bill"><span>~ Catalog ~</span></p>
        <div class="card">
            <div class="row g-1">
                <div class="col-4 col-md-3 d-flex align-items-center justify-content-start p-2">
                    <img v-if="dataset.product" :src="dataset.product.colors[0].image" style="object-fit: cover"
                        class="w-100">
                </div>
                <div class="col-8 col-md-9">
                    <div v-if="dataset.product" class="text-start mt-2">
                        <p class="mb-0">{{ dataset.product.id }}</p>
                    </div>
                    <div v-if="dataset.product" class="text-start">
                        <p class="ss mb-0">{{ dataset.product.name }} Long Gathered Sheer Cami Dress</p>
                    </div>
                    <!-- <table class="table table-sm my-2">
                        <tbody>
                            <tr>
                                <td class="table-warning w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-warning w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-warning w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>

        <table v-if="this.dataset.quantities" class="table table-responsive mt-3">
            <thead class="table-secondary">
                <tr>
                    <th scope="col">
                        <div class="d-flex flex-column align-items-center">
                            <p class="m-0">{{ skuCount }}</p>
                            <p class="m-0" style="font-size: 12px;">SKU</p>
                        </div>
                    </th>
                    <th scope="col" class="text-center" v-for="(size, index) in dataset.product.sizes" :key="index">
                        <div class="fw-bold">
                            <p class="">{{ size.name }}</p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(color, colorIndex) in dataset.product.colors" :key="colorIndex">
                    <td class="table-secondary">
                        <img :src="color.image" class="rounded-circle" style="width: 38px; height: 38px; object-fit: cover;"
                            alt="">
                    </td>
                    <td v-for="(size, sizeIndex) in dataset.product.sizes" :key="sizeIndex">
                        <input type="number" class="form-control text-center"
                            v-model="dataset.quantities[`${color.sid}_${size.sid}`]">
                    </td>
                </tr>
                <tr class="table-secondary">
                    <th>Qty</th>
                    <td class="text-center" v-for="(size, sizeindex) in  dataset.product.sizes" :key="sizeindex">
                        {{ calculateSizesTotal(sizeindex) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-between bg-light p-2 px-3 mb-2">
            <p class="fw-bold mb-0">Total Quantity</p>
            <p class="fw-bold mb-0">{{ calculateFinalQty }} pcs</p>
        </div>

        <div class="d-flex justify-content-between gap-2 mt-3 mb-5">
            <button v-if="dataset.status === 'cutting'" class="btn  w-50 top-brand" @click="updateStatus"
                :disabled="buttonDisabled">Stiching</button>
            <button v-if="dataset.status === 'cutting'" class="btn top-brand w-50" @click="updateStatus"
                :disabled="buttonDisabled">Jobwork
                Out</button>
            <button v-if="dataset.status === 'production'" class="btn top-brand w-50" disabled @click="updateStatus">Jobwork
                In</button>
            <button v-if="dataset.status === 'production'" class="btn top-brand w-50" @click="updateStatus"
                :disabled="buttonDisabled">Finishing</button>
            <!-- <button v-if="dataset.status === 'packing'" class="btn btn-dark" @click="updateStatus">Packing</button> -->
            <button v-if="dataset.status === 'ready'" class="btn top-brand w-100" disabled>Issued To Brand App</button>
            <button v-if="dataset.status === 'completed'" class="btn top-brand w-100" disabled>Order Completed</button>
        </div>

        <production-chat :dataset="dataset"></production-chat>

        <!-- <div>
            <div class="mt-3">
                <div class="d-flex align-items-center">
                    <div class="border p-2 py-3 ps-4 rounded-top  text-white w-100" style="background-color: #F48B29 ;"
                        data-bs-toggle="collapse" data-bs-target="#collapseExampleNew" aria-expanded="false"
                        aria-controls="collapseExampleNew">
                        Chat
                    </div>
                </div>
                <div class="collapse show p-2 border bg-light" id="collapseExampleNew">
                    <div v-for="(message, index) in dataset.message" :key="index">
                        <div class="message mt-3 mb-2  w-100 ">
                            <div class="message-content border w-100 bg-white"
                                style="word-wrap: break-word; padding: 10px !important; border-radius: 8px; border-top-right-radius: 15px; border-bottom-left-radius: 15px; border-bottom-right-radius: 0px !important; ">
                                <small>
                                    <small class="text-primary">@ {{ message.username }}</small>
                                </small>
                                <p class="mb-0">
                                    <strong>{{ message.title }}</strong>: {{ message.body }}
                                </p>
                            </div>
                            <div class="text-end text-muted" style="font-size: 10px;">{{ formatMessageTime(message.time) }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="pb-2 ">
                <div class=" d-flex bg-light p-2 align-items-center">
                    <input v-model="body" type="text" class="form-control" placeholder="Type your message..." required />
                    <div @click="sendMessage" class="ms-2 "><i class="bi bi-telegram fs-1   p-3"
                            style="color: #F48B29;"></i>
                    </div>
                </div>
            </div>
        </div> -->


    </div>
</template>

<script>
import axios from 'axios';
import pusherApi from '@/mixins/pusherApi';
import ProductionChat from '@/components/ProductionChat.vue';
import sweetAlert from '@/mixins/sweetAlert';

export default {
    mixins: [pusherApi, sweetAlert],
    data() {
        return {
            // dataset: {},
            purchaseId: '',
            messages: [],
            message: '',
            chats: {},
            actionName: [],
            body: '',
            chatMessage: [],
            buttonDisabled: false,

        };
    },
    created() {
        this.purchaseId = this.$route.params.purchaseId;
        this.connect('fetchPurchase', this.purchaseId);
        this.$store.dispatch('fetchPurchase', this.purchaseId);
    },
    computed: {
        skuCount() {
            return this.dataset.product.colors ? this.dataset.product.colors.length * this.dataset.product.sizes.length : 0;
        },
        dataset() {
            return this.$store.getters.purchase;
        },
        calculateFinalQty() {
            // Calculate the gross total quantity across all sizes and colors
            let totalQty = 0;
            if (this.dataset.product) {
                if (this.dataset.product.colors && this.dataset.product.sizes && this.dataset.quantities) {
                    this.dataset.product.colors.forEach(color => {
                        this.dataset.product.sizes.forEach(size => {
                            const key = `${color.sid}_${size.sid}`;
                            totalQty += this.dataset.quantities[key] || 0;
                        });
                    });
                }
            }
            return totalQty;
        },
    },
    methods: {
        showSuccessAlert() {
            this.showSweetAlert('Yay', 'Moved to next department successfully');
        },
        showErrorAlert() {
            this.showSweetError('Oops', 'Something went wrong');
        },
        calculateSizesTotal(sizeIndex) {
            const size = this.dataset.product.sizes[sizeIndex];
            let total = 0;
            // Loop through colors to calculate the total for the given size
            for (const color of this.dataset.product.colors) {
                const key = `${color.sid}_${size.sid}`;
                total += this.dataset.quantities[key] || 0;
            }
            return total;
        },
        formatMessageTime(time) {
            const options = {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedTime = new Date(time).toLocaleDateString('en-US', options);
            return formattedTime;
        },
        updateStatus() {
            this.buttonDisabled = true;
            // Create an array to hold the quantities data
            const quantitiesArray = [];
            // Iterate over colors and sizes to build the quantities array
            this.dataset.product.colors.forEach((color) => {
                this.dataset.product.sizes.forEach((size) => {
                    const key = `${color.sid}_${size.sid}`;
                    // Create an object with the color and size combination
                    const quantityObject = {};
                    quantityObject[key] = this.dataset.quantities[key] || 0; // Use 0 if the quantity is undefined
                    quantitiesArray.push(quantityObject);
                });
            });
            axios.put('http://192.168.1.133:8001/api/purchases/' + this.purchaseId, {
                status: 'next',
                quantities: JSON.stringify(quantitiesArray),
            }).then(response => {
                if (response.data.status === 'ok') {
                    this.showSuccessAlert()
                } else if (response.data.status === 'error') {
                    this.showErrorAlert()
                    alert(response.data.message)
                } else {
                    this.showErrorAlert()
                    alert('Something went wrong! Please try again')
                }
            }).catch((error) => {
                console.error('error creating purchase', error)
                this.showErrorAlert()
            })
                .finally(() => {
                    // this.buttonDisabled = false
                });
        },
        sendMessage() {
            if (this.body.trim() !== '') {
                const message = {
                    title: 'Chat Message',
                    body: this.body,
                };
                this.messages.push(message);
                this.actionName = '';
                this.body = '';
                axios.put('http://192.168.1.133:8001/api/purchases/' + this.purchaseId, {
                    message: JSON.stringify(message)
                });
            }
        },
    },
    components: { ProductionChat }
}
</script>
<style scoped>
textarea {
    height: auto;
    /* Automatically adjust height based on content */
    min-height: 50px;
    /* Set a minimum height */
    overflow-y: hidden;
    /* Hide vertical scrollbar */
    resize: none;
    /* Disable textarea resizing */
}
</style>