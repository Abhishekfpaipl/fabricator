
<template>
  <div>
    <TopNav v-if="!hide" />
    <router-view />
    <BottomNav v-if="!bottomHide" style="bottom: 0px; position: fixed; width: 100%; z-index: 10;" />
    <button v-if="showInstallButton" @click="installApp">Install App</button>
  </div>
</template>
<script>
import BottomNav from './components/BottomNav.vue';
import TopNav from './components/TopNav.vue';

export default {
  name: 'App',
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
      showInstallPopup: false,
    };
  },
  components: {
    TopNav,
    BottomNav
  },
  computed: {
    hide() {
      const hiddenPages = ['RootPage', 'LoginPage', 'ForgotPasswordPage', 'RegistrationPage', 'EmailVerificationPage', 'ProductionDetail', 'SaleOrderPreview', 'CuttingDetail', 'SaleOrderDetail', 'MaterialProcurement']
      return hiddenPages.includes(this.$route.name)
    },
    bottomHide() {
      const hiddenPages = ['RootPage', 'LoginPage', 'ForgotPasswordPage', 'RegistrationPage', 'EmailVerificationPage'];
      return hiddenPages.includes(this.$route.name)
    }
  },
  mounted() {
    // Delay the installation prompt by 1 second
    setTimeout(() => {
      this.showInstallPopup = true;
    }, 1000);

    // Add event listener for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  unmounted() {
    // Remove event listener when the component is unmounted
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  },
  methods: {
    handleInstallPrompt(event) {
      // Prevent the default behavior to show the browser's install prompt
      event.preventDefault();

      // Store the event for later use
      this.deferredPrompt = event;

      // Show the install button
      this.showInstallButton = true;
    },
    installApp() {
      if (this.deferredPrompt) {
        // Show the browser's install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }

          // Reset the deferredPrompt and hide the install button
          this.deferredPrompt = null;
          this.showInstallButton = false;
        });
      }
    },
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

 
