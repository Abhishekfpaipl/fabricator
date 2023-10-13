<template> 
    <div class="list-group list-group-flush border-bottom">
        <div class="list-group-item d-flex align-items-center">
            <img :src="po.colors[0].image" class="rounded-circle" style="height:60px;width:60px;object-fit: fill;">
            <div class="d-flex flex-fill flex-column ms-3">
                <span class="fw-bold">#{{ po.sid }}</span>
                <span>Order Qty : {{ po.quantity }}</span>
            </div>
            <button v-if="po.status === 'po_issued'"  @click="acceptOrder" class="w-25 btn btn-success">Accept</button>
            <i v-else class="text-success bi bi-check-circle-fill fs-4"></i>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'PoCard',
    props: ['po'],
    methods: {
        acceptOrder() {
            this.$store.dispatch('acceptPurchaseOrder', this.po.sid)
        },
    },
}
</script>
