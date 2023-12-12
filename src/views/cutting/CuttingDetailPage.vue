<template>
    <nav class="navbar border-bottom navbar-expand-lg" style="background-color: #25C297;">
        <div class="container-fluid">
            <router-link to="/cutting/list" class="ps-1 pe-3 text-white">
                <i class="bi bi-chevron-left"></i>
            </router-link>
            <div class="navbar-brand flex-fill d-flex align-items-center gap-2 text-white">
                <span>Cutting</span>
                <i class="bi bi-arrow-right"></i>
                <small>{{ this.poId }}</small>
            </div>
        </div>
    </nav>
    <div class="container" style="padding-bottom: 80px;">
        <p class="my-3 text-center fs-5 bill"><span>~ Catalog ~</span></p>
        <div class="card">
            <div class="row g-1">
                <div class="col-4 col-md-3 d-flex align-items-center justify-content-start p-2">
                    <img v-if="dataSet.colors" :src="dataSet.colors[0].image" style="object-fit: cover" class="w-100">
                </div>
                <div class="col-8 col-md-9">
                    <div class="text-start mt-2">
                        <!-- <p class="mb-0">Name</p> -->
                        <p class="mb-0">{{ dataSet.product_id }}</p>
                    </div>
                    <div class="text-start">
                        <p class="ss mb-0">{{ dataSet.name }} Long Gathered Sheer Cami Dress</p>
                        <!-- <p class="mb-0">Tags</p> -->
                        <!-- <p class="ss mb-0">{{ dataSet.tags }}</p> -->
                    </div>
                    <!-- <table class="table table-sm my-2">
                        <tbody>
                            <tr  class="border-white">
                                <td class="w-25">Name</td>
                                <td class="text-start ss">{{ dataSet.name }} Long Gathered Sheer Cami Dress</td>
                            </tr>
                            <tr class="border-white">
                                <td class="w-25">Tags</td>
                                <td class="text-start break ss">{{ dataSet.tags }}</td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>

        <ManageProduction :dataset="dataSet"></ManageProduction>

    </div>
</template>

<script>
import axios from 'axios';
import ManageProduction from '@/components/production manager/ManageProduction.vue';

export default {
    data() {
        return {
            dataSet: {},
            poId: '',
            messages: [],
            chats: {},
            actionName: [],
            body: '',
        };
    },
    components: {
        ManageProduction
    },
    created() {
        this.poId = this.$route.params.poId;
        axios.get('http://192.168.1.133:8001/api/purchaseorders/' + this.poId).then(response => {
            this.dataSet = response.data.data;
            localStorage.setItem('po_quantity', response.data.data.quantity);
        })
    },
    mounted() {
        axios.get('http://192.168.1.133:8001/api/purchaseorders/message/' + this.poId)
            .then(res => {
                console.log('API Response:', JSON.stringify(res.data));

                this.chats = res.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
}
</script>
<style scoped> 
.ss {
     display: -webkit-box;
     -webkit-line-clamp: 3;
     -webkit-box-orient: vertical;
     overflow: hidden;
     text-overflow: ellipsis;
 }

 .break {
     word-break: break-all;
 }
</style>
