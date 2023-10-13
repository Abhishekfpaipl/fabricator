<template>
    <div v-if="Object.keys(pos).length">
        <p class="p-2 text-center fw-bold mb-0">Pending Orders</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <!-- <div v-if="po.status === 'pending'" class="list-group list-group-flush border-bottom"> -->
            <div v-if="!po.procured" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/fabric-procurement/' + po.sid">
                    <!-- <router-link  class="text-decoration-none" to="/fabric-procurement/"> -->
                    <div class="list-group-item d-flex align-items-center">
                        <img :src="po.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <p class="p-2 text-center fw-bold mb-0">Fabric Received</p>
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <!-- <div v-if="po.status === 'pending'" class="list-group list-group-flush border-bottom"> -->
            <div v-if="po.procured" class="list-group list-group-flush border-bottom">
                <router-link class="text-decoration-none" :to="'/fabric-procurement/' + po.sid">
                    <!-- <router-link  class="text-decoration-none" to="/fabric-procurement/"> -->
                    <div class="list-group-item d-flex align-items-center">
                        <img :src="po.colors[0].image" class="rounded-circle"
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
    <no-order v-else></no-order>
</template>

<script>
import axios from 'axios';
import NoOrder from '@/components/NoOrder.vue';

export default {
    name: "FabricPage",
    data() {
        return {
            pos: []
        };
    },
    mounted() {
        // this.$store.dispatch('fetchJobWorks')
        axios.get('http://192.168.1.133:8001/api/internal/purchaseorders?status=po_completed')
            .then(response => {
                if (response.data.status === 'ok') {
                    this.pos = response.data.data;
                }
                else if (response.data.status === 'error') {
                    alert(response.data.message);
                }
                else {
                    alert('Something went wrong! Please try again');
                }
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
    },
    components: { NoOrder }
}
</script>
