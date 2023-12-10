<template>
  <div class="mb-2">
    <div class="mb-2">
      <span class="text-lg @md:text-2xl font-bold">
        {{ percentageOffound }}</span
      >
      <span class="text-lg @md:text-2xl font-bold"> % </span>
      <span class="text-sm">of countries found</span>
    </div>
    <div>
      <ol class="grid grid-cols-2 gap-4">
        <template v-for="continent in continents" :key="continent">
          <li class="flex flex-col justify-between mb-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-stone-800">{{ continent }}</span>
              <span class="text-[.6rem] text-stone-800"
                >{{ percentageCountriesFoundByContinent(continent) }}%</span
              >
            </div>
            <div class="h-1 w-full bg-neutral-200">
              <div
                class="h-1 bg-orange"
                :style="{
                  width: percentageCountriesFoundByContinent(continent) + '%',
                }"
              ></div>
            </div>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRestCountries } from "@/store/restcountries";

const restcountries = useRestCountries();

const percentageOffound = computed(() => {
  return Math.round(
    (restcountries.getCountriesFound.length / restcountries.getAllCountries.length) * 100
  );
});

const continents = computed(() => {
  return restcountries.getContinents
});

const totalCountriesFoundOfContinent = (continent: string) => {
  const countries = restcountries.getCountriesByContinent[continent];
  const countriesFound = restcountries.getCountriesFound.filter((country) =>
    countries.includes(country)
  );
  return countriesFound.length;
};

const percentageCountriesFoundByContinent = (continent: string) => {
  return (
    Math.round((totalCountriesFoundOfContinent(continent) /
    restcountries.getCountriesByContinent[continent].length) *
    100)
  );
};
</script>
