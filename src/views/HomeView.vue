<template>
  <div class="">

    <div class="">
      <FilterPageV2></FilterPageV2>
      <p class="p-2 text-center mb-0 fw-bold bg-light">Newly Issued Po</p>
      <div v-if="Object.keys(new_pos).length">
        <PoCard :po="po" :poIndex="poIndex" v-for="(po, poIndex) in new_pos" :key="poIndex"></PoCard>
      </div>
      <NoOrder v-else></NoOrder>
    </div>

    <div class="">
      <p class="p-2 text-center mb-0 fw-bold bg-light">Completed Po</p>
      <div v-if="Object.keys(completed_pos).length">
        <PoCard :po="po" :poIndex="poIndex" v-for="(po, poIndex) in completed_pos" :key="poIndex"></PoCard>
      </div>
      <NoOrder v-else></NoOrder>
    </div>

  </div>
</template>

<script>
import FilterPageV2 from '@/components/Filter/FilterPageV2.vue';
import PoCard from '@/components/production manager/PoCard.vue'
import NoOrder from '@/components/NoOrder.vue';

export default {
  name: "InwardPage",
  components: { PoCard, FilterPageV2, NoOrder },
  mounted() {
    this.$store.dispatch('fetchJobWorks')
  },
  computed: {
    new_pos() {
      return this.$store.getters.getNewJobWorks;
    },
    completed_pos() {
      return this.$store.getters.getCompletedJobWorks;
    },

  },
}
</script>
