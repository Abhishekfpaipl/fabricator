<template>
    <div class="row g-0" style="min-height: 100vh;">
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
        <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div class="container">
                <p class="fs-5 text-center">Forgot Password </p>
                <div class="w-100 p-2 form-floating container">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Email" v-model="email" required>
                    <label for="floatingInput" class="text-muted">Enter your Email</label>
                </div>
                <div class="d-flex justify-content-center w-100 px-2 mt-2">
                    <button class="btn text-white fs-5 w-100" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        style="padding: 10px 12px !important;background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">Submit</button>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">New Password Sent Successfully</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <p class="m-0 mb-4">A new password has been sent to your registered email address, Please
                                    find
                                    and
                                    login
                                    again.</p>
                                <router-link to="/login">
                                    <button class="btn text-white w-100" data-bs-dismiss="modal"
                                        style="background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);">Ok</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-2 px-2">
                    <span>If you submit your email here, Will send you a One Time Password at your registered email
                        address</span>
                </div>

                <div class="d-flex justify-content-center mt-4 p-2">
                    <router-link to="/login" class="rounded"
                        style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                        <button class="btn text-white w-100 fs-5"
                            style="background: linear-gradient(113deg, #1FAB89 31%, #28CC9E 97%);padding: 14px 12px !important;">
                            Click here for Login
                        </button>
                    </router-link>
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
            email: '',
        };
    },

    methods: {
        login() {
            console.log('Email:', this.email);
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
</style>
