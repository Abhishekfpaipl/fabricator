<template>
    <div class="list-group list-group-flush border-bottom">
        <div class="list-group-item d-flex align-items-center">
            <img :src="po.colors[0].image" class="rounded-circle" style="height:60px;width:60px;object-fit: fill;">
            <div class="d-flex flex-fill flex-column ms-3">
                <span class="fw-bold">#{{ po.sid }}</span>
                <span>Order Qty : {{ po.quantity }}</span>
            </div>
            <button v-if="po.status === 'draft' && !buttonDisabled && !hideButton" :disabled="buttonDisabled"
                @click="acceptPurchaseOrder(po.sid)" class="w-25 btn top-brand">Accept</button>
            <i v-else class="text-success bi bi-check-circle-fill fs-4"></i>
        </div>
    </div>
    <!-- <button @click="showSweetAlert">Test</button> -->
</template>

<script>
import axios from 'axios';
import pusherApi from '@/mixins/pusherApi';
import sweetAlert from '@/mixins/sweetAlert';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import Swal from 'sweetalert2';
export default {
    mixins: [pusherApi, sweetAlert],
    name: 'PoCard',
    props: ['po'],
    data() {
        return {
            buttonDisabled: false,
            hideButton: false
        };
    },
    methods: {
        showSuccessAlert() {
            this.showSweetAlert('Yay', 'Order has been accepted');
        },
        showErrorAlert() {
            this.showSweetError('Oops', 'Something went wrong');
        },
        acceptOrder() {
            this.$store.dispatch('acceptPurchaseOrder', this.po.sid)
        },
        acceptPurchaseOrder(orderId) {
            this.buttonDisabled = true;
            const requestedData = {
                customer_id: this.po.fabricator_id,
                customer_sid: this.po.fabricator_sid,
                stock_id: this.po.product_id,
                purchase_order_sid: orderId, // Use the provided orderId
                quantities: JSON.stringify(this.po.quantities),
            };
            axios
                .post('http://192.168.1.133:8003/api/saleorders', requestedData)
                .then((response) => {
                    if (response.data.status === 'ok') {
                        axios
                            .put('http://192.168.1.133:8001/api/purchaseorders/' + orderId, {
                                status: 'next',
                            })
                            .then((response) => {
                                console.log('status changed', response.data);
                                this.showSuccessAlert();
                                this.hideButton = true; // hide the button after success
                            });
                    } else if (response.data.status === 'error') {
                        this.showErrorAlert();
                        alert(response.data.message);
                    } else {
                        this.showErrorAlert();
                        alert('Something went wrong! Please try again');
                    }
                })
                .catch((error) => {
                    console.error('acceptPurchaseOrder:', error);
                    this.showErrorAlert();
                })
                .finally(() => {
                    this.buttonDisabled = false;
                });
        },
    },
}
</script> 
