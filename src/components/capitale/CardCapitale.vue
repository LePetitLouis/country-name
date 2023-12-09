<template>
  <div class="mb-2">
    <div class="mb-2">
      <span class="text-lg @md:text-2xl font-bold">
        {{ percentageOfFound }}</span
      >
      <span class="text-lg @md:text-2xl font-bold"> % </span>
      <span class="text-sm">of capitals found</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useRestCountries } from '@/store/restcountries';

const restcountries = useRestCountries();

const percentageOfFound = computed(() => {
  return Math.round(
    (restcountries.getCapitalesFound.length / restcountries.getAllCapitales.length) * 100
  );
});
</script>
