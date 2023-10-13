<template>
    <div style="padding-bottom: 80px;">

        <nav class="navbar border-bottom navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid justify-content-start ">
                <router-link to="/cutting-department" class="ps-1 pe-3 text-dark">
                    <i class="bi bi-chevron-left"></i>
                </router-link>
                <div class="navbar-brand">{{ this.jobworkId }}</div>
            </div>
        </nav>

        <button class="btn w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            <div class="row g-1">
                <div class="col-4">
                    <img v-if="dataSet.colors" :src="dataSet.colors[0].image" style="object-fit: cover" class="w-100">
                </div>
                <div class="col-8">
                    <table class="table table-sm my-2">
                        <tbody>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                            <tr>
                                <td class="table-secondary w-25">Name</td>
                                <td class="text-start">Value</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </button>

        <div class="collapse" id="collapseExample">
            <img v-if="dataSet.colors" :src="dataSet.colors[0].image" style="width:100%; object-fit: fill;"
                class="rounded-0 p-2">
            <table class="table table-bordered  table-hover ">
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td class="text-muted w-50">{{ dataSet.name }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fc / Piece</th>
                        <td class="text-muted">{{ dataSet.fc }}</td>
                    </tr>
                </tbody>
            </table>
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
            jobworkId: '',
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
        this.jobworkId = this.$route.params.jobworkId;
        axios.get('http://192.168.1.133:8001/api/internal/purchaseorders/' + this.jobworkId).then(response => {
            this.dataSet = response.data.data;
            localStorage.setItem('po_quantity', response.data.data.quantity);
        })
    },
    mounted() {
        axios.get('http://192.168.1.133:8001/api/internal/purchaseorders/message/' + this.jobworkId)
            .then(res => {
                // Convert the response data to a JSON string and log it
                console.log('API Response:', JSON.stringify(res.data));

                this.chats = res.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
}
</script>
