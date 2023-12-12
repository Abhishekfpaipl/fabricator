<template>
    <div v-if="Object.keys(pos).length">
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <div v-if="!po.purchased && po.procured" class="px-3 py-2 border-bottom">
                <router-link class="text-decoration-none text-dark" :to="'/cutting/detail/' + po.sid">
                    <div class="d-flex align-items-center">
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
    <no-order v-else />
</template>

<script>
// import axios from 'axios';
import NoOrder from '@/components/NoOrder.vue';
import pusherApi from '@/mixins/pusherApi';
export default {
    name: "CuttingPage",
    mixins: [pusherApi],
    created() {
        this.connect('fetchpurchaseOrders')
    },
    mounted() {
        this.$store.dispatch('fetchpurchaseOrders')
    },
    computed: {
        pos() {
            return this.$store.getters.getpurchaseOrders
        }
    },
    components: { NoOrder }
}
</script>
