<template>
    <div v-if="Object.keys(pos).length">

        <p class="p-2 text-center mb-0 fw-bold bg-light">Ready Order</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <div v-if="po.status === 'ready'" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/finishing-preview-page/' + po.sid">
                    <div class="list-group-item d-flex align-items-center">
                        <img v-if="po.product" :src="po.product.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <p class="p-2 text-center mb-0 fw-bold bg-light">Requested Order</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <div v-if="po.status === 'requested'" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/finishing-preview-page/' + po.sid">
                    <div class="list-group-item d-flex align-items-center">
                        <img v-if="po.product" :src="po.product.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </router-link>
                <button class="btn btn-success m-3" @click="updateStatus(po.sid)">Disptach</button>
            </div>
        </div>

        <p class="p-2 text-center mb-0 fw-bold bg-light">Completed Order</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <div v-if="po.status === 'completed'" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/finishing-detail-page/' + po.sid">
                    <div class="list-group-item d-flex align-items-center">
                        <img v-if="po.product" :src="po.product.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <p class="p-2 text-center mb-0 fw-bold bg-light">Rejected Order</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <div v-if="po.status === 'rejected'" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/finishing-preview-page/' + po.sid">
                    <div class="list-group-item d-flex align-items-center">
                        <img v-if="po.product" :src="po.product.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <no-order v-else />
</template>

<script>
import axios from 'axios';
import NoOrder from '@/components/NoOrder.vue';

export default {
    name: "FinishingPage",
    data() {
        return {
            pos: [],
            statuses: ["requested", "dispatched", "completed"],
        };
    },
    mounted() {
        axios.get('http://192.168.1.133:8001/api/internal/purchases')
            .then(response => {
                this.pos = response.data.data;
                // if (response.data.status === 'ok') {
                //     this.pos = response.data.data;
                // }
                // else if (response.data.status === 'error') {
                //     alert(response.data.message);
                // }
                // else {
                //     alert('Something went wrong! Please try again');
                // }
            })
            .catch((error) => { console.error('error getting data', error); });
    },
    methods: {
        acceptOrder() {
            this.$store.dispatch('acceptPurchaseOrder', {
                poId: this.po.sid,
                poIndex: this.poIndex
            });
        },
        updateStatus(poId) {
            axios.put('http://192.168.1.133:8001/api/internal/purchases/' + poId, {
                status: 'next'
            });
        }
    },
    components: { NoOrder }
}
</script>
