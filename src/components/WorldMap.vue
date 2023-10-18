<template>
  <main class="relative flex justify-center h-full grow">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <GenericInput
        :value="country"
        placeholder="Country"
        type="text"
        :error="error"
        @input="handleChangeValue"
        @keydown.enter="handleSubmit"
      />
    </div>
    <Map />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import GenericInput from "./GenericInput.vue";
import Map from "@/components/Map.vue"

import { isCountry, getCountry } from "@/utils/country";

import { useCountryStore } from "@/store/country";

const countryStore = useCountryStore();

const country = ref("");
const error = ref(false);

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  country.value = target.value;
};

const handleSubmit = () => {
  if (isCountry(country.value)) {
    countryStore.addCountry(getCountry(country.value));
    country.value = "";
    return;
  }

  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 1000);
};
</script>
