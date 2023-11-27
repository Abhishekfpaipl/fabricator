<template>
    <div class="row g-0 pb-5" style="min-height: 100vh;">
        <div class="pt-2 col-md-6 d-flex flex-column justify-content-center align-items-center"
            style="background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
            <div class="d-flex justify-content-center align-items-center">
                <div class="rounded-circle d-flex justify-content-center align-items-center"
                    style="height: 150px; width: 150px; background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">
                    <img :src="`${publicPath}${logo}`" style="width: 100%; object-fit: contain;">
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <p class="mt-2 m-0 fw-bold icon">Fabricator</p>
            </div>
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div class="d-flex flex-column align-items-center text-center">
                <i class="bi bi-envelope-check-fill e-icon" style="font-size:100px;"></i>
                <h4>OTP has been sent to your email</h4>
                <p>We've sent an email to user@gmail.com to verify your email address, please update OTP in a email
                    verification
                    section and activate your account.
                </p>
                <RouterLink to="/registration-page" class="text-decoration-none" style="cursor: pointer;">Click here
                </RouterLink>
                <p> If you would like to change the email address you signed up with.</p>
                <div class="w-100 p-2 form-floating container">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Enter OTP">
                    <label for="floatingInput">Enter Otp</label>
                </div>
            </div>
            <div class="d-flex justify-content-between container">
                <div class="">
                    <p v-if="displayText">{{ displayText }}</p>
                </div>
                <RouterLink to="" class="text-decoration-none" @click="showText">Resend OTP</RouterLink>
            </div>

            <div class="">
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn text-white fs-5" style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
                    background: linear-gradient(113deg, #1FAB89  31%,  #28CC9E 97%);padding: 13px 12px !important;">
                    Submit
                </button>
            </div>
            <!-- -------------Modal----------------- -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Congratulations</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <p class="m-0 mb-4">Your Email verification has been done successfully, Now you can use this app
                                uninterruptedly</p>
                            <router-link to="/login">
                                <button class="btn text-white w-100" data-bs-dismiss="modal"
                                    style="background: linear-gradient(113deg, #1FAB89  31%,  #28CC9E 97%);padding:12px 24px !important;">Ok</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            logo: "img/fablogo.png",
            publicPath: process.env.BASE_URL,
            displayText: ''
        };
    },
    methods: {
        showText() {
            this.displayText = 'OTP Resent';
        }
    }
}
</script>

<style  scoped>
.icon {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2rem;
    color: white;
    /* background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%); */
    /* -webkit-text-fill-color: transparent; */
    background-clip: text;
}

.e-icon {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2rem;
    /* color: white; */
    background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>





  