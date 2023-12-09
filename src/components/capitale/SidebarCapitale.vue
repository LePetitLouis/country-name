<template>
  <aside
    class="h-full p-6 z-10 overflow-y-auto xl:w-[28rem] lg:w-96 hidden shadow-lg lg:block bg-orange-50"
  >
    <CardCapitale />
    <hr class="w-full border-b border-stone-300 my-4" />
    <div v-if="totalCapitalesFound">
      <div class="flex justify-between items-center mb-4">
        <p class="text-sm uppercase text-opacity-75">
          {{ totalCapitalesFound }} {{ label }}
        </p>
      </div>
      <ol>
        <template
          v-for="capitale in restcountries.getCapitalesFound"
          :key="capitale"
        >
          <li
            class="transition-all duration-250 h-8 opacity-100 flex items-center"
          >
            <img
              :src="`/icons/${getDetailsOfCapitale(capitale).code.toLocaleLowerCase()}.svg`"
              :alt="getDetailsOfCapitale(capitale).code"
              class="w-5 h-5 -mr-0.5"
            />
            <span class="ml-2.5 max-w-md truncate text-stone-800">
              {{ getDetailsOfCapitale(capitale).capitale }} - {{ getDetailsOfCapitale(capitale).nameCountry }}
            </span>
          </li>
        </template>
      </ol>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

import CardCapitale from "./CardCapitale.vue";

import { useRestCountries } from '@/store/restcountries';

const restcountries = useRestCountries();

const totalCapitalesFound = computed(() => {
  return restcountries.getCapitalesFound.length;
});

const label = computed(() => {
  return totalCapitalesFound.value > 1 ? "capitals" : "capital";
});

const getDetailsOfCapitale = (capitale: string) => {
  const foundCapitale = restcountries.getAllCapitales.find((item) =>
    item.capitale.toLocaleLowerCase().includes(capitale.toLocaleLowerCase())
  );

  return foundCapitale || null;
};
</script>
