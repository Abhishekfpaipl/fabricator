<template>
    <div v-if="Object.keys(pos).length" style="padding-bottom: 80px;">
        <div v-for="(po, poIndex) in pos" :key="poIndex">
            <router-link v-if="!statuses.includes(po.status)" :to="'/production/detail/' + po.sid"
                class="text-decoration-none">
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
import NoOrder from '@/components/NoOrder.vue';
import pusherApi from '@/mixins/pusherApi';
export default {
    name: "CuttingPage",
    mixins: [pusherApi],
    components: { NoOrder },
    data() {
        return {
            statuses: ["ready", "requested", "dispatched", "completed"],
        };
    },
    computed: {
        pos() {
            return this.$store.getters.purchases
        }
    },
    created() {
        this.connect('fetchPurchases')
    },
    mounted() {
        this.$store.dispatch('fetchPurchases')
    },

}
</script>
