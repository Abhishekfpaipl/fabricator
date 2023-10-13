<template>
    <div style="padding-bottom:80px ;">
        <nav class="navbar border-bottom navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid justify-content-start ">
                <router-link to="/production-department" class="ps-1 pe-3 text-dark">
                    <i class="bi bi-chevron-left"></i>
                </router-link>
                <div class="navbar-brand">{{ this.purchaseId }}</div>
            </div>
        </nav>

        <button class="btn w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            <div class="row g-1">
                <div class="col-4">
                    <img v-if="dataset.product" :src="dataset.product.colors[0].image" style="object-fit: cover"
                        class="w-100">
                </div>
                <div class="col-8">
                    <table class="table table-sm my-2">
                        <tbody>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </button>

        <div class="collapse" id="collapseExample">
            <img v-if="dataset.product" :src="dataset.product.colors[0].image" style="width:100%; object-fit: fill;"
                class="rounded-0 p-2">
            <table class="table table-bordered  table-hover ">
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td class="text-muted w-50">{{ dataset.name }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fc / Piece</th>
                        <td class="text-muted">{{ dataset.fc }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <table v-if="this.dataset.quantities" class="table table-responsive">
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

        <div class="container">
            <div>
                <div class="mt-3">
                    <div class="d-flex align-items-center">
                        <div class="border p-2 py-3 ps-4 rounded-top  text-white w-100" style="background-color: #F48B29 ;"
                            data-bs-toggle="collapse" data-bs-target="#collapseExampleNew" aria-expanded="false"
                            aria-controls="collapseExampleNew">
                            Transaction
                        </div>
                    </div>
                    <div class="collapse show bg-white p-2" id="collapseExampleNew">
                        <div v-for="(ss, index) in dataset.message" :key="index" :class="ss.type">
                            <div class="message mt-3 mb-2 d-flex flex-column"
                                style="width: calc(100% - 40px) !important; margin-left:auto; margin-right: 0;">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-person fs-4 border rounded-circle me-2"
                                        style="padding: 5px 10px !important;"></i>
                                    <div class="message-content border w-100"
                                        style="background-color: #F48B29;word-wrap: break-word; padding: 10px !important; border-radius: 8px; border-top-right-radius: 15px; border-bottom-left-radius: 15px; border-bottom-right-radius: 0px !important; color: white;">
                                        <p class="m0">
                                            <strong>{{ ss.title }}</strong>: {{ ss.body }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-end text-muted" style="font-size: 10px;">{{ ss.time }}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="border bg-white">
                    <div class="container pb-2 ">
                        <div class=" d-flex bg-light p-2 align-items-center">
                            <input v-model="body" type="text" class="form-control" placeholder="Type your message..."
                                required />
                            <div @click="sendMessage" class="ms-2 "><i class="bi bi-telegram fs-1   p-3"
                                    style="color: #F48B29;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-2">
                <button v-if="dataset.status === 'cutting'" class="btn btn-warning w-100"
                    @click="updateStatus">Stiching</button>
                <button v-if="dataset.status === 'production'" class="btn btn-warning w-100"
                    @click="updateStatus">Finishing</button>
                <button v-if="dataset.status === 'packing'" class="btn btn-warning w-100"
                    @click="updateStatus">Packing</button>
                <button v-if="dataset.status === 'ready'" class="btn btn-primary w-100">Issued To Brand App</button>
                <button v-if="dataset.status === 'completed'" class="btn btn-primary w-100">Order Completed</button>
            </div>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dataset: {},
            purchaseId: '',
            messages: [],
            message: '',
            chats: {},
            actionName: [],
            body: '',
            chatMessage: []

        };
    },
    created() {
        this.purchaseId = this.$route.params.purchaseId;
        axios.get('http://192.168.1.133:8001/api/internal/purchases/' + this.purchaseId)
            .then(response => {
                if (response.data.status === 'ok') {
                    this.dataset = response.data.data;
                } else if (response.data.status === 'error') {
                    alert(response.data.message)
                } else {
                    alert('Something went wrong! Please try again')
                }
            })
            .catch((error) => { console.error('error getting data', error) })
    },
    computed: {
        skuCount() {
            return this.dataset.product.colors ? this.dataset.product.colors.length * this.dataset.product.sizes.length : 0;
        },

        calculateFinalQty() {
            // Calculate the gross total quantity across all sizes and colors
            let totalQty = 0;

            if (this.dataset.product.colors && this.dataset.product.sizes && this.quantities) {
                this.dataset.product.colors.forEach(color => {
                    this.dataset.product.sizes.forEach(size => {
                        const key = `${color.sid}_${size.sid}`;
                        totalQty += this.dataset.quantities[key] || 0;
                    });
                });
            }

            return totalQty;
        },
    },
    methods: {
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
        updateStatus() {
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
            // const sendmessage = JSON.stringify({
            //     title: 'first',
            //     body: this.form.message, w-100
            // });
            axios.put('http://192.168.1.133:8001/api/internal/purchases/' + this.purchaseId, {
                status: 'next',
                quantities: JSON.stringify(quantitiesArray),
                // message: sendmessage,
            }).then(response => {
                if (response.success) {
                    this.$router.push('/finishing-department')
                }
            })
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

                axios.put('http://192.168.1.133:8001/api/internal/purchases/' + this.purchaseId, {
                    message: JSON.stringify(message)
                })
                    .then(response => {
                        console.log('Response from the API:', response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        },
    }
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