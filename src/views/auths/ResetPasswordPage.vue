<template>
  <div class="px-4" style="padding-top: 20px;">
    <div class="d-flex flex-column align-items-center text-center">
      <i class="bi bi-person-lock" style="font-size:100px;color: #ECA1A6;"></i>
      <h1>Update Password</h1>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-md-6">
        <form @submit.prevent="resetPassword">

          <div class="w-100 p-2 form-floating container">
            <input type="text" class="form-control" id="floatingInput" placeholder="Email" v-model="currentPassword"
              required>
            <label for="floatingInput" class="text-muted">Current Password</label>
          </div>
          <div class="w-100 p-2 form-floating container">
            <input type="text" class="form-control" id="floatingInput" placeholder="Email" v-model="newPassword" required>
            <label for="floatingInput" class="text-muted">New Password</label>
          </div>
          <div class="w-100 p-2 form-floating container">
            <input type="text" class="form-control" id="floatingInput" placeholder="Email" v-model="confirmPassword"
              required>
            <label for="floatingInput" class="text-muted">Confirm Password</label>
          </div>
          <div class="d-flex justify-content-center mt-4 p-2">
            <button class="btn   w-100 fs-5"
              style="background: rgb(38,130,193);
background: linear-gradient(113deg, rgba(38,130,193,1) 31%, rgba(36,81,159,1) 97%);padding: 14px 12px !important;box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em; ">
              Update Password
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },

  methods: {
    resetPassword() {
      alert('Password reset successful!');
      this.email = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }
};
</script>
  
  