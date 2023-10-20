<template>
  <main class="relative flex justify-center h-full grow bg-[#FBF6F2]">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <AsideResponsive />
      <GenericInput
        :value="country"
        placeholder="Country"
        type="text"
        :error="error"
        :alreadyFound="alreadyFound"
        @input="handleChangeValue"
        @keydown.enter="handleSubmit"
      />
    </div>
    <Map />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import GenericInput from "@/components/GenericInput.vue";
import Map from "@/components/Map.vue";
import AsideResponsive from "@/components/AsideResponsive.vue";

import { isCountry, getCodeOfCountry } from "@/utils/country";

import { useCountryStore } from "@/store/country";
import { useSettingsStore } from "@/store/settings";

const countryStore = useCountryStore();
const settingsStore = useSettingsStore();

const country = ref("");
const error = ref(false);
const alreadyFound = ref(false);

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  country.value = target.value;
};

const handleSubmit = () => {
  // If the welcome message is shown, we hide it
  if (settingsStore.getShowWelcome) settingsStore.setShowWelcome(false);

  // If the country is already in the list, we don't add it again and we show an error message
  if (
    isCountry(country.value) &&
    countryStore.getListCountries.includes(getCodeOfCountry(country.value))
  ) {
    alreadyFound.value = true;
    setTimeout(() => {
      alreadyFound.value = false;
    }, 1000);
    country.value = "";
    return;
  }

  // If the country is valid, we add it to the list
  if (isCountry(country.value)) {
    countryStore.addCountry(getCodeOfCountry(country.value));
    country.value = "";
    return;
  }

  // If the country is not valid
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 1000);
};
</script>
