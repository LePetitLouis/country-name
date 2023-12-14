<template>
  <main class="relative flex justify-center h-full grow bg-beige">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <AsideResponsive />
      <GenericInput :value="country" placeholder="Country" type="text" :error="error" :alreadyFound="alreadyFound"
        @input="handleChangeValue" @keydown.enter="handleSubmit" />
    </div>
    <Map />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import GenericInput from "@/components/common/GenericInput.vue";
import Map from "@/components/country/Map.vue";
import AsideResponsive from "@/components/country/AsideResponsive.vue";

import { useSettingsStore } from "@/store/settings";
import { useRestCountries } from "@/store/restcountries";

const settingsStore = useSettingsStore();
const restcountries = useRestCountries();

const country = ref("");
const error = ref(false);
const alreadyFound = ref(false);

const isValidCountry = computed(() => {
  return restcountries.getAllCountries.some(countryObj => countryObj.name.replaceAll(/[.,\s-]/g, '').trim().toLocaleLowerCase() === country.value.replaceAll(/[.,\s-]/g, '').trim().toLocaleLowerCase());
})

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  country.value = target.value;
};

const getCodeOfCountry = (country: string) => {
  return restcountries.getAllCountries.find(countryObj => countryObj.name.toLocaleLowerCase() === country.toLocaleLowerCase())?.code;
};

const handleSubmit = () => {
  // If the welcome message is shown, we hide it
  if (settingsStore.getShowWelcomeCountry) settingsStore.setShowWelcomeCountry(false);

  // If the country is already in the list, we don't add it again and we show an error message
  if (
    isValidCountry.value &&
    restcountries.getCountriesFound.includes(getCodeOfCountry(country.value) || '')
  ) {
    alreadyFound.value = true;
    setTimeout(() => {
      alreadyFound.value = false;
    }, 1000);
    country.value = "";
    return;
  }

  // If the country is valid, we add it to the list
  if (isValidCountry.value) {
    restcountries.setNewCountryFound(getCodeOfCountry(country.value) || '');
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
