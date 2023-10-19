<template>
  <aside class="h-full p-6 z-10 overflow-y-auto xl:w-[28rem] lg:w-96 hidden shadow-lg lg:block bg-blue-50">
    <div class="mb-2">
      <div class="mb-2">
        <span class="text-lg @md:text-2xl font-bold"> {{ percentageOffound }}</span>
        <span class="text-lg @md:text-2xl font-bold"> % </span>
        <span class="text-sm">of countries found</span>
      </div>
    </div>
    <hr class="w-full border-b border-blue-100 my-4">
    <div v-if="totalCountriesFound">
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm uppercase text-blue-900 text-opacity-75">{{ totalCountriesFound }} {{ label }}</p>
      </div>
      <ol>
        <template v-for="(country, index) in countryStore.getListCountries" :key="index">
          <li class="transition-all duration-250 h-8 opacity-100 flex items-center">
            <img :src="`./src/assets/icons/${country.toLocaleLowerCase()}.svg`" :alt="country" class="w-5 h-5 -mr-0.5">
            <span class="ml-2.5 max-w-md truncate">{{ getCountryByCode(country) }}</span>
          </li>
        </template>
      </ol>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useCountryStore } from '@/store/country';

import { getCountAllCountry, getCountryByCode } from '@/utils/country';

const countryStore = useCountryStore();

const totalCountriesFound = computed(() => {
  return countryStore.getListCountries.length;
});

const label = computed(() => {
  return countryStore.getListCountries.length > 1 ? 'countries' : 'country';
});

const percentageOffound = computed(() => {
  return Math.round((countryStore.getListCountries.length / getCountAllCountry()) * 100);
});
</script>