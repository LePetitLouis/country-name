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
        <template v-for="(continent, index) in continents" :key="index">
          <li class="flex flex-col justify-between mb-2">
            <span class="text-sm text-stone-800">{{ continent }}</span>
            <div class="h-1 w-full bg-neutral-200">
              <div
                class="h-1 bg-orange"
                :style="{
                  width:
                    (totalCountriesFoundOfContinent(continent) /
                      totalCountriesOfContinent(continent)) *
                      100 +
                    '%',
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

import { useCountryStore } from "@/store/country";

import { getCountAllCountry } from "@/utils/country";
import {
  listContinents,
  countriesOfContinent,
  totalCountriesOfContinent,
} from "@/utils/continent";

const countryStore = useCountryStore();

const percentageOffound = computed(() => {
  return Math.round(
    (countryStore.getListCountries.length / getCountAllCountry()) * 100
  );
});

const continents = computed(() => {
  return listContinents();
});

const totalCountriesFoundOfContinent = (continent: string) => {
  const countries = countriesOfContinent(continent);
  const countriesFound = countryStore.getListCountries.filter((country) =>
    countries.includes(country)
  );
  return countriesFound.length;
};
</script>
