<template>
  <aside class="h-full p-6 z-10 overflow-y-auto xl:w-[32rem] lg:w-96 hidden shadow-lg lg:block bg-blue-50">
    <div></div>
    <hr class="w-full border-b border-blue-100 my-4">
    <div>
      <template v-for="(country, index) in countryStore.getListCountries" :key="index">
        <p>{{ country }}</p>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useCountryStore } from '@/store/country';

const countryStore = useCountryStore();

const listCountries = computed(() => {
  console.log(countryStore.getListCountries);
  return countryStore.getListCountries;
});
</script>