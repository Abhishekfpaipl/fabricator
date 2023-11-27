<template>
    <div style="padding-bottom: 80px;">
        <!-- <div v-if="Object.keys(fabPos).length"> -->
        <p class="p-2 text-center mb-0 bg-light border-bottom bill"><span class="fs-5">~ Material PO ~</span></p>
        <div v-if="Object.keys(notProcuredPo).length">
            <div v-for="(po, poIndex) in notProcuredPo" :key="poIndex">
                <div v-if="!po.procured" class="px-3 py-2 border-bottom">
                    <router-link class="text-decoration-none text-dark" :to="'/fabric-procurement/' + po.sid">
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
        <no-order v-else></no-order>

        <p class="p-2 text-center mb-0 bg-light border-bottom bill"><span class="fs-5">~ Material Purchases ~</span></p>
        <div v-if="Object.keys(procuredPo).length">
            <div v-for="(po, poIndex) in procuredPo" :key="poIndex">
                <div v-if="po.procured" class="px-3 py-2 border-bottom">
                    <router-link class="text-decoration-none text-dark" :to="'/fabric-procurement/' + po.sid">
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
        <no-order v-else></no-order>
        <!-- </div>
        <no-order v-else></no-order> -->
    </div>
</template>

<script>
import NoOrder from '@/components/NoOrder.vue';
import pusherApi from '@/mixins/pusherApi';
export default {
    name: "FabricPage",
    mixins: [pusherApi],
    created() {
        this.connect('fetchFabricPurchaseOrder')
    },
    components: { NoOrder },
    computed: {
        fabPos() {
            return this.$store.getters.getFabricPurchaseOrder
        },
        notProcuredPo() {
            return this.fabPos.filter(po => po.procured === 0 && po.status === 'issued');
        },
        procuredPo() {
            return this.fabPos.filter(po => po.procured === 1 && po.status ==='completed');
        },
    },
    mounted() {
        this.$store.dispatch('fetchFabricPurchaseOrder')
    },
}
</script>
