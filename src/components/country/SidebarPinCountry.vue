<template>
  <aside class="h-full p-6 z-10 overflow-y-auto xl:w-[28rem] lg:w-96 hidden shadow-lg lg:block bg-orange-50">
    <div class="mb-2">
      <div class="flex items-center justify-between gap-5">
        <span class="text-2xl @md:text-2xl font-bold">
          {{ currentCountry }}
        </span>
        <button class="p-2 border border-stone-400 rounded-full" @click="$emit('click:next')">
          <img :src="`/icons/caret-right.svg`" alt="next icon" class="w-5 h-5 -mr-0.5" />
        </button>
      </div>
      
      <Timer v-if="restcountries.getPinTimer !== 0" :duration="restcountries.getPinTimer" @end:timer="$emit('end:timer')" />
    </div>
    <hr class="w-full border-b border-stone-300 my-4" />
    <div v-if="totalCountriesFound">
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm uppercase text-opacity-75">
          {{ totalCountriesFound }} {{ label }}
        </p>
      </div>
      <ol>
        <template v-for="country in restcountries.getPinCountriesFound" :key="country">
          <li class="transition-all duration-250 h-8 opacity-100 flex items-center">
            <img :src="`/icons/${country.toLocaleLowerCase()}.svg`" :alt="country" class="w-5 h-5 -mr-0.5" />
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
import { computed, toRefs } from "vue";

import Timer from "@/components/common/Timer.vue";

import { useRestCountries } from "@/store/restcountries";

const restcountries = useRestCountries();

const props = defineProps({
  currentCountry: {
    type: String,
    default: "",
  }
});

const { currentCountry } = toRefs(props);

const totalCountriesFound = computed(() => {
  return restcountries.getPinCountriesFound.length;
});

const getCountryByCode = (code: string) => {
  return restcountries.getAllCountries.find((country) => country.code === code)?.name
};

const label = computed(() => {
  return totalCountriesFound.value > 1 ? "countries" : "country";
});
</script>
