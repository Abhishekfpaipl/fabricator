<template>
    <div class="container" style="padding-bottom: 60px;">
        <div class="text-white p-2 rounded-top-2 mt-3" style="background-color: #28CC9E;" type="button">
            <div class="d-flex justify-content-between w-100">
                <div class="d-flex">
                    <div>
                        <img v-if="dataSet.colors" :src="dataSet.colors[0].image"
                            style="height: 60px; width: 60px; object-fit: cover; object-position: top;" class="rounded-2">
                    </div>
                    <div>
                        <b class="ms-2">{{ dataSet && dataSet.jwoi }}</b>
                        <p class="ms-2" v-if="dataSet && dataSet.quantity">Qty : {{ dataSet.quantity }}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-chevron-down mx-2 fs-5" data-bs-toggle="collapse" href="#collapseExample" role="button"
                        aria-expanded="false" aria-controls="collapseExample"></i>
                </div>
            </div>
        </div>
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

        <div v-for="(so, soIndex) in sos" :key="soIndex" class="">
            <div v-if="so.stock_id"
                class="d-flex justify-content-between align-items-center border py-3 p-2 text-white w-100 rounded-top"
                data-bs-toggle="collapse" :data-bs-target="'#fabric' + soIndex" aria-expanded="false"
                :aria-controls="'fabric' + soIndex" style="background-color: #28CC9E;">
                <span>{{ so.stock_id.name }} #{{ so.sid }}</span>
                <!-- <span v-if="so.fabricStatus" class="text-success">Accepted <i class="bi bi-check fs-4"></i></span> -->
            </div>
            <div class="collapse show my-2" :id="'fabric' + soIndex">
                <div class="d-flex justify-content-between mb-2 px-2">
                    <p class="mb-0 fw-bold">Color</p>
                    <p class="mb-0 fw-bold">Quantity</p>
                    <p class="mb-0 fw-bold">Unit</p>
                </div>
                <div v-for="(color, colorIndex) in so.items" :key="colorIndex" class="d-flex gap-3 m-2">
                    <div class="rounded-circle " style="width: 45px; height: 35px;"
                        :style="'background-color :' + color.color">
                    </div>
                    <input type="number" class="form-control form-control-sm border-0 text-center" v-model="color.quantity"
                        readonly>
                    <span>{{ so.stock_id.unit }}</span>
                </div>
                <div class="d-flex gap-2 justify-content-center">
                    <p>Total</p>
                    <p>{{ calculateTotal(so.items).toFixed(2) }}</p>
                </div>
            </div>
        </div>
        <button v-if="sos.length && sos[0].pending === 'pending'" class="btn btn-dark w-100" @click="acceptFabric">Record Fabric Purchase</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            dataSet: {},
        };
    },
    watch: {
        dataSet: {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    // console.log('data here', newValue);
                    this.fetchSaleOrder(newValue.sid, newValue.fabricator_sid);
                }
            }
        }
    },
    mounted() {
        let jobworkId = this.$route.params.jobworkId;
        axios.get('http://192.168.1.133:8001/api/internal/purchaseorders/' + jobworkId).then(response => {
            this.dataSet = response.data.data;
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    computed: {
        sos() {
            return this.$store.getters.getSaleOrder;
        },
    },
    methods: {
        calculateTotal(items) {
            return items.reduce((total, color) => total + parseFloat(color.quantity), 0);
        },
        fetchSaleOrder(jwoId, fabId) {
            if (jwoId && fabId) {
                this.$store.dispatch('fetchSaleOrder', {
                    jwoId: jwoId,
                    fabId: fabId
                });
            }
        },
        acceptFabric() {
            let so_sids = this.sos.map(so => so.sid);
            axios.post(`http://192.168.1.133:8002/api/internal/purchases`, {
                po_sid: this.$route.params.jobworkId,
                so_sids: JSON.stringify(so_sids)
            }).then(response => {
                this.$router.push('/cutting-department')
                if (response.data.status === 'ok') {
                    console.log(response.data.data)
                } else if (response.data.status === 'error') {
                    alert(response.data.message)
                } else {
                    alert('Something went wrong! Please try again')
                }
            })
                .catch((error) => { console.error('error creating data', error) })
        }
    },
}
</script>
