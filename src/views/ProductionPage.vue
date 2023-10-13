<template>
    <div v-if="Object.keys(pos).length" style="padding-bottom: 80px;">
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <router-link v-if="!statuses.includes(po.status)" :to="'/production-detail/' + po.sid" class="text-decoration-none">
                <div class="list-group list-group-flush border-bottom">
                    <div class="list-group-item d-flex align-items-center">
                        <img :src="po.product.colors[0].image" class="rounded-circle"
                            style="height:60px;width:60px; object-fit: fill;">
                        <div class="d-flex flex-fill flex-column ms-3">
                            <span class="fw-bold">#{{ po.sid }}</span>
                            <span>Order Qty : {{ po.quantity }}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <no-order v-else />
</template>

<script>
import axios from 'axios';
import NoOrder from '@/components/NoOrder.vue';
export default {
    name: "CuttingPage",
    data() {
        return {
            pos: [],
            statuses: ["ready", "requested", "dispatched", "completed"],
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
    components: { NoOrder }
}
</script>
