<template>
  <aside
    class="h-full p-6 z-10 overflow-y-auto xl:w-[28rem] lg:w-96 hidden shadow-lg lg:block bg-orange-50"
  >
    <ContinentsCard />
    <hr class="w-full border-b border-stone-300 my-4" />
    <div v-if="totalCountriesFound">
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm uppercase text-opacity-75">
          {{ totalCountriesFound }} {{ label }}
        </p>
      </div>
      <ol>
        <template
          v-for="country in restcountries.getCountriesFound"
          :key="country"
        >
          <li
            class="transition-all duration-250 h-8 opacity-100 flex items-center"
          >
            <img
              :src="`/icons/${country.toLocaleLowerCase()}.svg`"
              :alt="country"
              class="w-5 h-5 -mr-0.5"
            />
            <span class="ml-2.5 max-w-md truncate text-stone-800">{{
              getCountryByCode(country)
            }}</span>
          </li>
        </template>
      </ol>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRestCountries } from "@/store/restcountries";

import ContinentsCard from "@/components/country/ContinentsCard.vue";

const restcountries = useRestCountries();

const totalCountriesFound = computed(() => {
  return restcountries.getCountriesFound.length;
});

const getCountryByCode = (code: string) => {
  return restcountries.getAllCountries.find((country) => country.code === code)?.name
}

const label = computed(() => {
  return totalCountriesFound.value > 1 ? "countries" : "country";
});
</script>
