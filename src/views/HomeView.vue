<template>
  <div class="" style="padding-bottom: 80px;">

    <div class="">
      <!-- <FilterPageV2></FilterPageV2> -->
      <p class="p-2 text-center mb-0 bg-light bill border-bottom"><span class="fs-5">~ Pending Orders ~</span></p>
      <div v-if="Object.keys(new_pos).length">
        <!-- {{ new_pos.length }} -->
        <PoCard :po="po" :poIndex="poIndex" v-for="(po, poIndex) in new_pos" :key="poIndex">
        </PoCard>
        <div class="d-flex justify-content-center align-items-center" v-if="shouldShowLoadMoreButton">
          <button class="btn btn-dark rounded-0 my-2">load {{ remainingNewPosCount }} More </button>
        </div>
      </div>
      <NoOrder v-else></NoOrder>
    </div>
    <div class="">
      <p class="p-2 text-center mb-0 bg-light bill border-bottom"><span class="fs-5">~ Recently Orders ~</span></p>
      <div v-if="Object.keys(completed_pos).length">
        <!-- {{ completed_pos.length }} -->
        <PoCard :po="po" :poIndex="poIndex" v-for="(po, poIndex) in completed_pos" :key="poIndex">

        </PoCard>
      </div>
      <NoOrder v-else></NoOrder>
    </div>

  </div>
</template>

<script>
// import FilterPageV2 from '@/components/Filter/FilterPageV2.vue';
import PoCard from '@/components/production manager/PoCard.vue'
import NoOrder from '@/components/NoOrder.vue';
import pusherApi from '@/mixins/pusherApi.js';
export default {
  name: "OrderPage",
  data() {
    return {
      messages: [],
    };
  },
  mixins: [pusherApi],
  components: {
    PoCard,
    //  FilterPageV2,
    NoOrder
  },
  created() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.connect('fetchpurchaseOrders'); // Pass the action name as a parameter
    }
  },
  mounted() {
    this.$store.dispatch('fetchpurchaseOrders')
  },
  computed: {
    pos() {
      return this.$store.getters.getpurchaseOrders
    },
    new_pos() {
      return this.pos.filter(po => po.status === 'draft')
    },
    completed_pos() {
      return this.pos.filter(po => po.status === 'completed')
    },
    shouldShowLoadMoreButton() {
      // Check if the length of new_pos is greater than 5 and there are more new_pos items to show
      return this.new_pos.length > 5 && this.remainingNewPosCount > 0;
    },
    remainingNewPosCount() {
      // Calculate the number of remaining new_pos items to show in the "Load More" button
      const displayedNewPosCount = Math.min(this.new_pos.length, 5);
      return this.new_pos.length - displayedNewPosCount;
    },

  },
}
</script>