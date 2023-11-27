<template>
    <div class="my-3">
        <p class="text-center fs-5 bill"><span>~ Final Cutting Qty ~</span></p>

        <div class="d-flex justify-content-between p-2 rounded my-2 top-brand">
            <h5 class="mb-0">Fabric Procured</h5>
            <p class="d-flex gap-2 fw-bold mb-0"> {{ purchased ? purchased.length : 0 }}
                <i class="bi bi-info-circle" data-bs-toggle="modal" data-bs-target="#fabricCount"></i>
            </p>
        </div>
        <table v-if="this.quantities" class="table table-responsive">
            <thead class="table-light">
                <tr>
                    <th scope="col" class="table-secondary">
                        <div class="d-flex flex-column align-items-center">
                            <p class="m-0">{{ skuCount }}</p>
                            <p class="m-0" style="font-size: 12px;">SKU</p>
                        </div>
                    </th>
                    <th scope="col" class="text-center table-secondary" v-for="(size, index) in dataset.sizes" :key="index">
                        <div class="fw-bold">
                            <p class="">{{ size.name }}</p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(color, colorIndex) in dataset.colors" :key="colorIndex">
                    <td class="table-secondary position-sticky">
                        <img :src="color.image" class="rounded-circle" style="width: 38px; height: 38px; object-fit: cover;"
                            alt="">
                    </td>
                    <td v-for="(size, sizeIndex) in dataset.sizes" :key="sizeIndex">
                        <input type="number" class="form-control text-center"
                            v-model="quantities[`${color.sid}_${size.sid}`]">
                    </td>
                    <!-- <td class="table-secondary text-center">
                        {{ purchased ? purchased.length : 0 }}
                        <i class="bi bi-info-circle" data-bs-toggle="modal" data-bs-target="#fabricCount"></i>
                    </td> -->
                </tr>


                <!-- Modal -->
                <div class="modal fade" id="fabricCount" tabindex="-1" aria-labelledby="fabricCountLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" style="background-color: #28CC9E;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="fabricCountLabel">Fabric Count</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div v-for="(so, soIndex) in purchased" :key="soIndex" class="">
                                    <div v-if="so.stock_id"
                                        class="d-flex justify-content-between align-items-center border py-3 p-2 text-dark bg-light my-2 w-100 rounded-top"
                                        data-bs-toggle="collapse" :data-bs-target="'#fabric' + soIndex"
                                        aria-expanded="false" :aria-controls="'fabric' + soIndex"
                                        style="background-color: #28CC9E;" @click="toggle">
                                        <span>{{ so.stock_id.name }} #{{ so.sid }}</span>
                                        <span>
                                            <i :class="iconClass"></i>
                                        </span>
                                    </div>
                                    <div class="collapse show my-2" :id="'fabric' + soIndex">
                                        <div class="d-flex justify-content-between mb-2 px-2">
                                            <p class="mb-0 fw-bold">Color</p>
                                            <p class="mb-0 fw-bold">Quantity</p>
                                            <p class="mb-0 fw-bold">Unit</p>
                                        </div>
                                        <div v-for="(color, colorIndex) in so.items" :key="colorIndex"
                                            class="d-flex gap-3 m-2">
                                            <!-- <div class="rounded-circle " style="width: 45px; height: 35px;"
                                                :style="'background-color :' + color.color">
                                            </div> -->
                                            <img :src="color.image" class="rounded-circle" style="width: 45px; height: 45px; object-fit: fill;">
                                            <input type="number" class="form-control form-control-sm border-0 text-center"
                                                v-model="color.quantity" readonly>
                                            <span>{{ so.stock_id.unit }}</span>
                                        </div>
                                        <div class="d-flex gap-2 justify-content-between p-2 border-top">
                                            <p>Total</p>
                                            <p>{{ calculateTotal(so.items) }}</p>
                                            <!-- <p>{{ calculateTotal(so.items).toFixed(2) }}</p> -->
                                            <span>{{ so.stock_id.unit }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <tr class="table-light">
                    <th class="table-secondary">Qty</th>
                    <td class="text-center" v-for="(size, sizeindex) in  dataset.sizes" :key="sizeindex">
                        {{ calculateSizesTotal(sizeindex) }}
                    </td>
                    <!-- <td class="table-secondary" v-for="(po, poIndex) in purchased" :key="poIndex">
                        {{ po.quantity }} mtr
                    </td> -->
                </tr>
            </tbody>
        </table>

        <div class="mb-3">
            <div class="form-floating my-3">
                <input type="text" class="form-control" id="floatingInvoice" placeholder="" :value="originalPoQuantity"
                    readonly>
                <label for="floatingInvoice">Purchase Order Qty</label>
            </div>
            <div class="form-floating my-3">
                <input type="text" class="form-control" id="floatingInvoice" placeholder="" :value="calculateFinalQty"
                    readonly>
                <label for="floatingInvoice">Actual Prepared Qty</label>
            </div>
            <form @submit.prevent="sendForm()">
                <div class="form-floating my-3">
                    <input type="date" class="form-control" id="floatingDate" v-model="form.exp_date" required>
                    <label for="floatingDate">Invoice Date</label>
                </div>
                <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInvoice" v-model="form.invoice_no" required>
                    <label for="floatingInvoice">Invoice No</label>
                </div>
                <div class="form-floating my-3">
                    <textarea class="form-control" placeholder="Enter Message Here" id="floatingMessage"
                        v-model="form.message" required></textarea>
                    <label for="floatingMessage">Message</label>
                </div>
                <div class="alert alert-warning">
                    Your job is to figure out how much we can make by matching the fabric color quantity that we have with
                    what
                    the
                    brand
                    ordered in terms of color and size.
                </div>
                <button v-if="!dataset.purchased && !hideButton" class="btn w-100 top-brand" :disabled="buttonDisabled">Create
                    Sale</button>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import sweetAlert from '@/mixins/sweetAlert';
export default {
    props: ['dataset'],
    mixins: [sweetAlert],
    data() {
        return {
            jobworkId: '',
            form: {
                assign: null,
                exp_date: '',
                invoice_no: '',
                message: '',
            },
            quantities: null, // original po (jwo) quantities by brand app
            purchased: null, // Purchase quantities from fabric app
            chats: {},
            actionName: [],
            body: '',
            inputList: [
                {
                    title: 'Balance Quantity',
                    icon: 'bi bi-pause-btn'
                },
                {
                    title: 'Ready Quantity',
                    icon: 'bi bi-check2'
                },
                {
                    title: 'Sending Request',
                    icon: 'bi bi-envelope'
                },
                {
                    title: 'Dispatched Quantity',
                    icon: 'bi bi-truck'
                },
                {
                    title: 'Received Quantity',
                    icon: 'bi bi-check2-all'
                },
                {
                    title: 'Chat Message',
                    icon: 'bi bi-chat-dots'
                },
            ],
            messages: [],
            originalPoQuantity: null,
            buttonDisabled: false,
            hideButton : false,
        }
    },
    mounted() {
        this.jobworkId = this.$route.params.jobworkId;
        let url = 'http://192.168.1.133:8003/api/saleorder/' + this.jobworkId + '/F1';
        axios.get(url).then(response => {
            console.log(response.data.data);
            this.purchased = response.data.data;
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });

        axios.get('http://192.168.1.133:8001/api/purchaseorders/message/' + this.jobworkId)
            .then(res => {
                // Convert the response data to a JSON string and log it
                console.log('API Response:', JSON.stringify(res.data));

                this.chats = res.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    watch: {
        dataset: {
            handler(newDataset) {
                if (newDataset && newDataset.quantities) {
                    this.quantities = newDataset.quantities;

                    // Set the originalPoQuantity when dataset changes
                    this.originalPoQuantity = this.calculateOriginalPoQuantity(newDataset);
                }
            },
        },
    },
    computed: {
        // originalPoQuantity() {
        //     return localStorage.getItem('po_quantity');
        // },
        skuCount() {
            return this.dataset.colors ? this.dataset.colors.length * this.dataset.sizes.length : 0;
        },
        calculateSizesTotal() {
            if (this.quantities) {
                return (sizeIndex) => {
                    const size = this.dataset.sizes[sizeIndex];
                    let total = 0;

                    // Loop through colors to calculate the total for the given size
                    for (const color of this.dataset.colors) {
                        const key = `${color.sid}_${size.sid}`;
                        total += this.quantities[key] || 0;
                    }

                    return total;
                };
            } else {
                return 0;
            }
        },
        calculateFinalQty() {
            // Calculate the gross total quantity across all sizes and colors
            let totalQty = 0;

            if (this.dataset.colors && this.dataset.sizes && this.quantities) {
                this.dataset.colors.forEach(color => {
                    this.dataset.sizes.forEach(size => {
                        const key = `${color.sid}_${size.sid}`;
                        totalQty += this.quantities[key] || 0;
                    });
                });
            }

            return totalQty;
        },
        calculatePoQty() {
            let totalQty = 0;

            if (this.dataset.colors && this.dataset.sizes && this.quantities) {
                this.dataset.colors.forEach(color => {
                    this.dataset.sizes.forEach(size => {
                        const key = `${color.sid}_${size.sid}`;
                        totalQty += this.quantities[key] || 0;
                    });
                });
            }

            return totalQty;
        },
    },
    methods: {
        showSuccessAlert() {
            this.showSweetAlert('Yay', 'Your Sale has been created successfully');
        },
        showErrorAlert() {
            this.showSweetError('Oops', 'Something went wrong');
        },
        calculateTotal(items) {
            return items.reduce((total, color) => total + parseFloat(color.quantity), 0);
        },
        calculateOriginalPoQuantity(dataset) {
            // Calculate and return the initial originalPoQuantity based on the dataset
            let originalQty = 0;
            if (dataset.colors && dataset.sizes && dataset.quantities) {
                dataset.colors.forEach(color => {
                    dataset.sizes.forEach(size => {
                        const key = `${color.sid}_${size.sid}`;
                        originalQty += dataset.quantities[key] || 0;
                    });
                });
            }
            return originalQty;
        },
        sendForm() {
            this.buttonDisabled = true;
            if (!this.quantities) {
                alert('wait');
            }
            // Create an array to hold the quantities data
            const quantitiesArray = [];
            // Iterate over colors and sizes to build the quantities array
            this.dataset.colors.forEach((color) => {
                this.dataset.sizes.forEach((size) => {
                    const key = `${color.sid}_${size.sid}`;

                    // Create an object with the color and size combination
                    const quantityObject = {};
                    quantityObject[key] = this.quantities[key] || 0; // Use 0 if the quantity is undefined

                    // quantitiesArray.push(quantityObject);
                    quantitiesArray.unshift(quantityObject);
                });
            });

            const data = {
                quantities: JSON.stringify(quantitiesArray),
                purchase_order_sid: this.dataset.sid,
                invoice_date: this.form.exp_date,
                message: JSON.stringify({
                    title: 'first',
                    body: this.form.message,
                }),
                invoice_no: this.form.invoice_no,

            };
            axios.post('http://192.168.1.133:8001/api/purchases', data)
                .then((response) => {
                    if (response.data.status === 'ok') {
                        this.quantities = [];
                        this.form.invoice_no = '';
                        this.form.exp_date = '';
                        // this.$router.push('/production-department');
                        this.showSuccessAlert()
                    } else if (response.data.status === 'error') {
                        this.showErrorAlert()
                        alert(response.data.message)
                    } else {
                        this.showErrorAlert()
                        alert('Something went wrong! Please try again')
                    }
                })
                .catch((error) => {
                    console.error('error creating purchase', error)
                    this.showErrorAlert()
                })
                .finally(() => {
                    // this.buttonDisabled = false
                    this.hideButton = true
                })

        },
        saleOrderColoredFabricQuantity(colorSid) {
            let colorQuantity = 0;
            if (this.purchased) {
                this.purchased.forEach(po => {
                    po.items.forEach(poi => {
                        if (poi.sid == colorSid) {
                            colorQuantity = Number(colorQuantity + poi.quantity)
                        }
                    })
                });
            }
            return colorQuantity;
        },
    },
}
</script>
