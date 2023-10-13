<template>
    <div class="my-3">
        <p class="text-center fw-bold fs-5">Enter Final Cutting Quantity</p>

        <table v-if="this.quantities" class="table table-responsive">
            <thead class="table-secondary">
                <tr>
                    <th scope="col">
                        <div class="d-flex flex-column align-items-center">
                            <p class="m-0">{{ skuCount }}</p>
                            <p class="m-0" style="font-size: 12px;">SKU</p>
                        </div>
                    </th>
                    <th scope="col" class="text-center" v-for="(size, index) in dataset.sizes" :key="index">
                        <div class="fw-bold">
                            <p class="">{{ size.name }}</p>
                        </div>
                    </th>
                    <th class="table-dark">Fabric Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(color, colorIndex) in dataset.colors" :key="colorIndex">
                    <td class="table-secondary">
                        <img :src="color.image" class="rounded-circle" style="width: 38px; height: 38px; object-fit: cover;"
                            alt="">
                    </td>
                    <td v-for="(size, sizeIndex) in dataset.sizes" :key="sizeIndex">
                        <input type="number" class="form-control text-center"
                            v-model="quantities[`${color.sid}_${size.sid}`]">
                    </td>
                    <td class="table-dark">
                        {{ saleOrderColoredFabricQuantity(color.sid) }} mtr
                    </td>
                </tr>
                <tr class="table-secondary">
                    <th>Qty</th>
                    <td class="text-center" v-for="(size, sizeindex) in  dataset.sizes" :key="sizeindex">
                        {{ calculateSizesTotal(sizeindex) }}
                    </td>
                    <td class="table-dark" v-for="(po, poIndex) in purchased" :key="poIndex">
                        {{ po.quantity }} mtr
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="container mb-3">

            <div class="d-flex justify-content-between mx-3 py-2 px-4 border" style="background-color: #e8e8e8;">
                <p class="mb-0">Purchase Order Qty</p>
                <p class="fw-bold text-center mb-0">{{ originalPoQuantity }} pcs</p>
            </div>

            <div class="d-flex justify-content-between mx-3 py-2 px-4 border" style="background-color: #e8e8e8;">
                <p class="mb-0">Actual Prepared Qty</p>
                <p class="fw-bold text-center mb-0">{{ calculateFinalQty }} pcs</p>
            </div>

            <div class="form-floating my-3">
                <input type="date" class="form-control" id="floatingDate" v-model="form.exp_date">
                <label for="floatingDate">Invoice Date</label>
            </div>
            <div class="form-floating my-3">
                <input type="text" class="form-control" id="floatingInvoice" v-model="form.invoice_no">
                <label for="floatingInvoice">Invoice No</label>
            </div>

            <div class="form-floating my-3">
                <textarea class="form-control" placeholder="Enter Message Here" id="floatingMessage"
                    v-model="form.message"></textarea>
                <label for="floatingMessage">Message</label>
            </div>

           
            <div class="alert alert-warning">
                Your job is to figure out how much we can make by matching the fabric color quantity that we have with what
                the
                brand
                ordered in terms of color and size.
            </div>


            <button v-if="!dataset.purchased" class="btn btn-danger w-100" @click="sendForm()">Create
                Purchase</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: ['dataset'],
    data() {
        return {
            jobworkId: '',
            // Form to Create Purchase
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
            messages: []
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

        axios.get('http://192.168.1.133:8001/api/internal/purchaseorders/message/' + this.jobworkId)
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
                }
            },
        },
    },
    computed: {
        originalPoQuantity() {
            return localStorage.getItem('po_quantity');
        },
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
        sendForm() {

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

                    quantitiesArray.push(quantityObject);
                });
            });
           
            const data = {
                quantities: JSON.stringify(quantitiesArray),
                purchase_order_sid: this.dataset.sid,
                invoice_date: this.form.exp_date,
                message:  JSON.stringify({
                    title: 'first',
                    body: this.form.message,
                }),
                invoice_no: this.form.invoice_no,

            };
            // this.messages.push(message);

            axios.post('http://192.168.1.133:8001/api/internal/purchases', data).then(() => {
                this.quantities = [];
                this.form.invoice_no = '';
                this.form.exp_date = '';
                this.$router.push('/production-department');
            });



            // axios.put('http://192.168.1.133:8001/api/internal/jobworkorders/' + this.jobworkId, {
            //     message: JSON.stringify(message)
            // })
            //     .then(response => {
            //         console.log('Response from the API:', response.data);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });

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
  