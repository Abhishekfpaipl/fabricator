
<template>
  <div>
    <TopNav v-if="!hide" />
    <router-view />
    <BottomNav v-if="!bottomHide" style="bottom: 0px; position: fixed; width: 100%; z-index: 10;" />
  </div>
</template>
<script>
import BottomNav from './components/BottomNav.vue';
import TopNav from './components/TopNav.vue';
export default {
  name: 'App',
  components: {
    TopNav,
    BottomNav
  },
  computed: {
    hide() {
      const hiddenPages = ['RootPage', 'LoginPage', 'ForgotPasswordPage', 'RegistrationPage', 'EmailVerificationPage', 'Production Detail', 'Finishing Preview', 'Purchase To Cutting', 'Finishing Detail', 'Material Procurement']
      return hiddenPages.includes(this.$route.name)
    },
    bottomHide() {
      const hiddenPages = ['RootPage', 'LoginPage', 'ForgotPasswordPage', 'RegistrationPage', 'EmailVerificationPage',];
      return hiddenPages.includes(this.$route.name)
    }
  }
}
</script>
<style>
.top-brand {
  background-color: #25C297;
  color: white;
  --bs-btn-hover-border-color: none !important;
}

.custom-swal-container {
  background-color: #25C297 !important;
}

.custom-swal-icon-color {
  color: black;
}

.bill {
  overflow: hidden;
  text-align: center;
}

.bill>span {
  position: relative;
  display: inline-block;
  color: #25C297;
}

.bill>span:before,
.bill>span:after {
  content: '';
  position: absolute;
  top: 50%;
  border-bottom: 2px solid #25C297;
  width: 591px;
  margin: 0 20px;
}

.bill>span:before {
  right: 100%;
}

.bill>span:after {
  left: 100%;
}
</style>

 
