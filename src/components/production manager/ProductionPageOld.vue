<template>
    <TopNav>Production Department</TopNav>
    <div v-for="(po, poIndex) in pos" :key="poIndex">
        <div v-if="po.status === 'production'" class="list-group list-group-flush border-bottom">
            <router-link class="text-decoration-none" :to="'/DetailPage/' + po.sid">
                <!-- <router-link  class="text-decoration-none" to="/fabric-procurement/"> -->
                <div class="list-group-item d-flex align-items-center">
                    <img :src="po.colors[0].image" class="rounded-circle" style="height:60px;width:60px; object-fit: fill;">
                    <div class="d-flex flex-fill flex-column ms-3">
                        <span class="fw-bold">#{{ po.sid }}</span>
                        <span>Order Qty : {{ po.quantity }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <ProductionBottomnav></ProductionBottomnav>
</template>

<script>
import TopNav from '@/components/navbar/TopNav.vue'
import ProductionBottomnav from '../navbar/ProductionBottomnav.vue';
import axios from 'axios';

export default {
    name: "InwardPage",
    components: { TopNav, ProductionBottomnav },
    data() {
        return {
            pos: []
        }
    },
    mounted() {
        // this.$store.dispatch('fetchJobWorks')
        axios.get('http://192.168.1.133:8001/api/internal/jobworkorders?status=production').then(response => {
            this.pos = response.data.data
        });
    },
    // computed: {
    //     pos() {
    //         return this.$store.getters.getjobWorks;
    //     },
    // },
    methods: {
        acceptOrder() {
            this.$store.dispatch('acceptPurchaseOrder', {
                poId: this.po.sid,
                poIndex: this.poIndex
            })
        },
    },
}
</script>
