<template>
    <!-- Main container -->
    <div class="my-4">
        <!-- Job Form -->
        <div class="collapse show border" id="Newjobs">
            <div class="px-2 py-3">
                <form @submit.prevent="sendForm()">
                    <!-- Status-dependent text -->
                    <!-- <p v-if="dataset.status === 'Accept'" class="mb-0">Receive From Stations</p>
                    <select v-if="dataset.status === 'Accept'" class="form-select my-3" aria-label="Default select example"
                        v-model="form.assignee">
                        <option selected>Select Assignee</option>
                        <option v-for="(user, index) in recvCutting" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select>

                    <p v-if="dataset.status === 'Stiching'" class="mb-0">Receive From Stitching</p>
                    <select v-if="dataset.status === 'Stiching'" class="form-select my-3"
                        aria-label="Default select example" v-model="form.assignee">
                        <option selected>Select Assignee</option>
                        <option v-for="(user, index) in recvStiching" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select>

                    <p v-if="dataset.status === 'Finishing'" class="mb-0">Receive From Finishing</p>
                    <select v-if="dataset.status === 'Finishing'" class="form-select my-3"
                        aria-label="Default select example" v-model="form.assignee">
                        <option selected>Select Assignee</option>
                        <option v-for="(user, index) in recvFinishing" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select> -->

                    <!-- Table for data entry -->
                    <table class="table table-responsive">
                        <!-- Table header -->
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="d-flex flex-column align-items-center">
                                        <p class="m-0">{{ skuCount }}</p>
                                        <p class="m-0" style="font-size: 12px;">SKU</p>
                                    </div>
                                </th>
                                <th scope="col" class="text-center" v-for="(size, index) in dataset.sizes" :key="index">
                                    <div class="fw-bold">
                                        <p class="">{{ size.name }}</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <!-- Table body for quantity input -->
                        <tbody>
                            <tr v-for="(color, colorIndex) in dataset.colors" :key="colorIndex">
                                <td>
                                    <img :src="color.image" class="rounded-circle"
                                        style="width: 38px; height: 38px; object-fit: cover;" alt="">
                                </td>
                                <td v-for="(size, sizeIndex) in dataset.sizes" :key="sizeIndex">
                                    <input type="number" class="form-control text-center"
                                        v-model="quantities[`${color.sid}_${size.sid}`]">
                                    <!-- {{ dataset.quantities[`${color.sid}_${size.sid}`] }} -->
                                </td>
                            </tr>
                            <!-- Row for calculating sizes total -->
                            <tr scope="row">
                                <th>Qty</th>
                                <td class="text-center" v-for="(size, sizeindex) in  dataset.sizes" :key="sizeindex">
                                    {{ calculateSizesTotal(sizeindex) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Container for total ordered quantity -->
                    <div class="container mb-3">
                        <div class="d-flex justify-content-between mx-3 py-2 px-4 border"
                            style="background-color: #e8e8e8;">
                            <p class="mb-0">Actual Prepared Qty</p>
                            <p class="fw-bold text-center mb-0">{{ calculateGrossTotalQty }} pcs</p>
                        </div>
                    </div>

                    <!-- <p v-if="dataset.status === 'Accept'" class="mb-0">Issue To Stitching</p>
                    <select v-if="dataset.status === 'Accept'" class="form-select my-3" aria-label="Default select example"
                        v-model="form.assign">
                        <option selected>Select Assignee</option>
                        <option v-for="(user, index) in recvStiching" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select>

                    <p v-if="dataset.status === 'Stiching'" class="mb-0">Issue To Finishing</p>
                    <select v-if="dataset.status === 'Stiching'" class="form-select my-3"
                        aria-label="Default select example" v-model="form.assign">
                        <option selected>Select Assignee</option>
                        <option v-for="(user, index) in recvFinishing" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select> -->

                    <!-- <p v-if="dataset.status === 'Finishing'" class="mb-0">Issue To Shop</p> -->
                    <p class="mb-0">Issue To Shop</p>
                    <!-- <select v-if="dataset.status === 'Finishing'" class="form-select my-3" -->
                    <select class="form-select my-3" aria-label="Default select example" v-model="form.assign">
                        <option :value="null" disabled selected>Select Assignee</option>
                        <option v-for="(user, index) in filteredUser" :key="index" :value="user.id">{{ user.dept }} ({{
                            user.name }})</option>
                    </select>


                    <!-- Date and Time inputs -->
                    <div class="d-flex w-100">
                        <div class="mb-2 mx-2 w-50">
                            <label for="date" class="form-label ms-1">Invoice Date</label>
                            <input type="date" class="form-control" id="date" v-model="form.exp_date">
                        </div>
                        <div class="mb-2 mx-2 w-50">
                            <label for="invoice" class="form-label">Invoice No</label>
                            <input type="text" class="form-control" id="date" v-model="form.invoice_no">
                        </div>
                    </div>

                    <div class="form-floating">
                        <textarea class="form-control" v-model="form.message" placeholder="Leave a comment here"
                            id="message"></textarea>
                        <label for="message">Type Message Here</label>
                    </div>

                    <!-- Submit button -->
                    <div class="d-flex justify-content-center my-3">
                        <button class="btn btn-primary">Issue Job</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="my-3">
            <h2 class="text-center">Job History</h2>
            <div class="" v-for="(job, index) in purchaseOrder" :key="index">
                {{ job }}
                <div class="border my-2">
                    <!-- <table class="table">
                        <tbody>
                            <tr>
                                <th>Received From</th>
                                <td>{{ job.assignee }}</td>
                            </tr>
                            <tr>
                                <th>Issued To</th>
                                <td>{{ job.assign }}</td>
                            </tr>
                             <tr>
                                <th>Expected Date</th>
                                <td>{{ job.exp_date }}</td>
                            </tr>
                            <tr>
                                <th>Expected Time</th>
                                <td>{{ job.exp_time }}</td>
                            </tr> 
                        </tbody>
                    </table> -->
                    <!-- <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#collapseTwo' + index" aria-expanded="false"
                                    :aria-controls="'collapseTwo' + index">
                                    Job Details
                                </button>
                            </h2>
                            <div :id="'collapseTwo' + index" class="accordion-collapse collapse"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <table class="table mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">{{ skuCount }} <br>Sku</th>
                                                <th scope="col" v-for="(size, sizeIndex) in managerSizes" :key="sizeIndex">
                                                    <p>{{ size.name }}</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(color, colorIndex) in managerColors" :key="colorIndex">
                                                <td>
                                                    <div class="rounded px-1 align-items-center justify-content-center d-flex"
                                                        style="width: 36px; height: 36px;"
                                                        :style="'background-color :' + color.bg">
                                                    </div>
                                                </td>
                                                <td v-for="(size, sizeIndex) in managerSizes" :key="sizeIndex">
                                                    {{ job.tableData[`${color.id}_${size.id}`] || 0 }}
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: ['dataset'],
    data() {
        return {
            form: {
                assign: null,
                exp_date: '',
                exp_time: '',
                invoice_no: '',
                message: ''
            },
            quantities: [],
        }
    },
    mounted() { 
        // if (this.dataset && this.dataset.quantities) {
        //     this.quantities = this.dataset.quantities;
        // }
        if (this.filteredUser.length > 0) {
        // Set form.assign to the id of the first user
        this.form.assign = this.filteredUser[0].id;
    }
    },
    watch: {
        dataset: {
            handler(newDataset) {
                if (newDataset && newDataset.quantities) {
                    this.quantities = newDataset.quantities;
                }
            },
            immediate: true // Trigger the handler immediately when the component is mounted
        }
    },

    computed: {
        purchaseOrder() {
            return this.$store.getters.getPurchaseOrder
        },
        jobHistory() {
            return this.$store.getters.getJobHistory
        },
        managerColors() {
            // Extract unique colors based on the color.id in tableData
            const colorIds = Object.keys(this.quantities)
                .map(id => id.split('_')[0])
                .filter((value, index, self) => self.indexOf(value) === index);

            return this.dataset.colors.filter(color => colorIds.includes(color.id));
        },
        managerSizes() {
            // Extract unique sizes based on the size.id in tableData
            const sizeIds = Object.keys(this.quantities)
                .map(id => id.split('_')[1])
                .filter((value, index, self) => self.indexOf(value) === index);

            return this.dataset.sizes.filter(size => sizeIds.includes(size.id));
        },
        users() {
            return this.$store.getters.getUsers;
        },
        recvCutting() {
            return this.users.filter(user => user.post === 'Incharge' && user.dept === 'Cutting');
        },
        recvStiching() {
            return this.users.filter(user => user.post === 'Incharge' && user.dept === 'Stiching');
        },
        recvFinishing() {
            return this.users.filter(user => (user.dept === 'Finishing') && user.post === 'Incharge');
        },
        filteredUser() {
            return this.users.filter(user => (user.dept === 'Shop') && user.post === 'Owner');
        },
        skuCount() {
            return this.dataset.colors ? this.dataset.colors.length * this.dataset.sizes.length : 0;
        },
        colorsArray() {
            return Object.values(this.dataset.colors);
        },
        calculateSizesTotal() {
            return (sizeIndex) => {
                const size = this.dataset.sizes[sizeIndex];
                let total = 0;

                // Loop through colors to calculate the total for the given size
                for (const color of this.dataset.colors) {
                    const key = `${color.sid}_${size.sid}`;
                    total += this.quantities[key] || 0;
                }

                return total;
            };
        },
        // Calculate the gross total quantity across all sizes and colors
        calculateGrossTotalQty() {
            let totalQty = 0;

            if (this.dataset.colors && this.dataset.sizes) {
                this.dataset.colors.forEach(color => {
                    this.dataset.sizes.forEach(size => {
                        const key = `${color.sid}_${size.sid}`;
                        totalQty += this.quantities[key] || 0;
                    });
                });
            }

            return totalQty;
        }
    },
    methods: {
        findUserById(userId) {
            return this.users.find(user => user.id === userId);
        },
        sendForm() {
            // Create an array to hold the quantities data
            const quantitiesArray = [];
            // Iterate over colors and sizes to build the quantities array
            this.dataset.colors.forEach((color) => {
                this.dataset.sizes.forEach((size) => {
                    const key = `${color.sid}_${size.sid}`;

                    // Create an object with the color and size combination
                    const quantityObject = {};
                    quantityObject[key] = this.quantities[key] || 0; // Use 0 if the quantity is undefined

                    quantitiesArray.push(quantityObject);
                });
            });
            const data = {
                assign: this.form.assign,
                quantities: JSON.stringify(quantitiesArray),
                job_work_order_sid: this.dataset.sid,
                message: this.form.message,
                invoice_no: this.form.invoice_no,
            };
            axios
                .post('http://192.168.1.133:8001/api/internal/purchases', data)
                // .then(response => {
                //     const newData = response.data;
                //     this.$store.commit('addPurchase', newData);
                //     console.log(newData);
                // })
                .catch(error => {
                    console.error('Error:', error);
                });
            this.quantities = [],
                this.form.assign = '',
                this.form.invoice_no = '',
                this.form.message = ''
        },
        submitForm() {
            const assigneeUser = this.findUserById(this.form.assignee);
            const assignUser = this.findUserById(this.form.assign);

            if (assigneeUser && assignUser) {
                this.$store.dispatch('createNewJob', {
                    assignee: `${assigneeUser.dept} (${assigneeUser.name})`,
                    assign: `${assignUser.dept} (${assignUser.name})`,
                    exp_date: this.form.exp_date,
                    exp_time: this.form.exp_time,
                    tableData: this.quantities,
                })
                // .then(() => {
                //     this.resetAllotmentForm();
                // })
            }
            // if (assigneeUser && assignUser) {
            //     const newJob = {
            //         assignee: `${assigneeUser.dept} (${assigneeUser.name})`,
            //         assign: `${assignUser.dept} (${assignUser.name})`,
            //         exp_date: this.form.exp_date,
            //         exp_time: this.form.exp_time,
            //         tableData: this.quantities,
            //     };
            //     this.jobHistory.push(newJob);
            // }
        },
        resetAllotmentForm() {
            this.form.assignee = null;
            this.form.assign = null;
            this.form.exp_date = new Date().toISOString().slice(0, 10);
            this.form.exp_time = new Date().toTimeString().slice(0, 5);
            this.dataset.colors.forEach(color => {
                this.dataset.sizes.forEach(size => {
                    this.quantities[`${color.id}_${size.id}`] = 0;
                });
            });
        },
    },

}
</script>
  