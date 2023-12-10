<template>
  <main class="relative flex justify-center h-full grow bg-beige">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <AsideCapitale />
      <GenericInput :value="capitale" :placeholder="placeholderInput" type="text" :error="error" :alreadyFound="alreadyFound"
        @input="handleChangeValue" @keydown.enter="handleSubmit" is-view-capital />
    </div>
    <MapCapitale />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import GenericInput from "@/components/common/GenericInput.vue";
import MapCapitale from "@/components/capitale/MapCapitale.vue";
import AsideCapitale from "@/components/capitale/AsideCapitale.vue";

import { useRestCountries } from '@/store/restcountries';
import { useSettingsStore } from "@/store/settings";

const restcountries = useRestCountries();
const settingsStore = useSettingsStore();

const capitale = ref("");
const error = ref(false);
const alreadyFound = ref(false);

const countrySelected = computed(() => {
  return restcountries.getCountrySelected
})

const listAllCapitales = computed(() => {
  return restcountries.getAllCapitales
})

const isValidCapitale = computed(() => {
  return listAllCapitales.value.some((item) => item.capitale.toLocaleLowerCase() === capitale.value.toLocaleLowerCase());
});

const placeholderInput = computed(() => {
  if (!countrySelected.value) return 'Capital'

  return `Capital of ${getDetailsOfCapitale(countrySelected.value)?.nameCountry}`
});

const isValidCapitalOfCountrySelected = computed(() => {
  return getDetailsOfCapitale(countrySelected.value)?.capitale.toLocaleLowerCase() === capitale.value.toLocaleLowerCase()
});

const getDetailsOfCapitale = (code: string) => {
  const foundCapitale = restcountries.getAllCapitales.find((item) =>
    item.code.toLocaleLowerCase().includes(code.toLocaleLowerCase())
  );

  return foundCapitale || null;
};

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  capitale.value = target.value;
};

const handleSubmit = () => {
  // If the welcome message is shown, we hide it
  if (settingsStore.getShowWelcomeCapital) settingsStore.setShowWelcomeCapitale(false);

  if (countrySelected.value) {
    if (!isValidCapitalOfCountrySelected.value) {
      error.value = true;
      setTimeout(() => {
        error.value = false;
      }, 1000);
      return;
    } 
    restcountries.setNewCapitaleFound(capitale.value.toLocaleLowerCase());
    restcountries.setCountrySelected('');
    capitale.value = "";
    return;
  }

  // If the caputale is already in the list, we don't add it again and we show an error message
  if (
    isValidCapitale.value &&
    restcountries.getCapitalesFound.includes(capitale.value.toLocaleLowerCase())
  ) {
    alreadyFound.value = true;
    setTimeout(() => {
      alreadyFound.value = false;
    }, 1000);
    capitale.value = "";
    return;
  }

  // If the capitale is valid, we add it to the list
  if (isValidCapitale.value) {
    restcountries.setNewCapitaleFound(capitale.value.toLocaleLowerCase());
    capitale.value = "";
    return;
  }

  // If the country is not valid
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 1000);
};
</script>
