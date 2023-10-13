
<template>
  <div>
    <TopNav />
    <router-view />
    <BottomNav style="bottom: 0px; position: fixed; width: 100%;" />
  </div>
</template>
<script>
import BottomNav from './components/BottomNav.vue';
import TopNav from './components/TopNav.vue';
export default {
  name:'App',
  components: {
    TopNav,
    BottomNav
  }
}
</script>

 
