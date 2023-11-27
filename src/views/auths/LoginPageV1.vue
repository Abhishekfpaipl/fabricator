<template>
    <div class="px-4 pb-5" style="padding-top: 20px;">
        <div class="">
            <div class="d-flex justify-content-center">
                <div class=" rounded-circle d-flex justify-content-center"
                    style="height: 150px; width: 150px; background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
                    <img :src="`${publicPath}${logo}`" style="width: 100%; object-fit: contain;">
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <p class="mt-2 m-0 fw-bold icon">Fabricator</p>
            </div>

            <div class="text-center mt-4">
                <p class="fs-5">Login Your Account </p>
            </div>

            <div class="w-100 p-2 form-floating container">
                <input type="email" class="form-control" id="floatingInput" placeholder="Email" v-model="Email">
                <label for="floatingInput" class="text-muted">Enter your Email</label>
            </div>

            <div class="w-100 p-2 form-floating container">
                <input type="password" class="form-control" id="floatingInput" placeholder="Password" v-model="Password">
                <label for="floatingInput" class="text-muted">Password</label>
            </div>

            <div class="p-2">
                <button class="btn text-white py-2 w-100 fs-5"
                    style="padding: 10px 12px !important;background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">Submit</button>
            </div>

            <RouterLink to="/forgot-password-page" style="text-decoration: none;">
                <div class="text-end mt-1">
                    Forgot your password?
                </div>
            </RouterLink>
            <div class="text-center container my-3">
                <p>By proceeding, you agree to <RouterLink to="/">Terms & Conditions</RouterLink> & <RouterLink to="/">
                        Privacy policy</RouterLink>
                </p>
            </div>
            <div class="d-flex justify-content-center mt-4 p-2">
                <router-link to="/registration-page" class="w-100 rounded"
                    style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                    <button class="btn w-100 fs-5 text-white" style="background: linear-gradient(113deg, #1FAB89  31%,  #28CC9E 97%);padding: 14px 12px ;">
                        Click here for Register
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import { RouterLink } from 'vue-router';
export default {
    components: { RouterLink },
    data() {
        return {
            img: "img/images/subtle-prism.png",
            logo: "img/fablogo.png",
            publicPath: process.env.BASE_URL,
            phoneNumber: "",
            Email: "",
            Password: "",
            disableButton: true,
            design: 1,
        };
    },
    methods: {
        checkPhoneNumber() {
            const number = /^[0-9]{10}$/;
            if (number.test(this.phoneNumber)) {
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
        },
        goBack() {
            window.history.back();
        },
        getData() {
            console.warn("values :  ", this.Email);
            alert("OTP has been sent to Your Email");
        },
        btnChange() {
            switch (this.design) {
                case 1:
                    this.design = 2;
                    break;
                case 2:
                    this.design = 1;
                    break;
            }
        }
    },

}
</script>

<style scoped>
.icon {
    /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    background: -webkit-linear-gradient(113deg, #28CC9E 31%, #1FAB89 97%);
    padding: 14px 12px;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>