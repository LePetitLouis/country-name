<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMapPinCountry @selected:country="checkIsGoodCountry" />
    <SidebarPinCountry :current-country="currentContry?.name" @end:timer="stopGame" @click:next="nextCountry" />
    <template v-if="settingsStore.getShowWelcomePinCountry">
      <WelcomeSetting />
    </template>
  </section>
  <ResultModal 
    v-if="showResult" 
    @click:home="goToHome"
    @click:try-again="handleTryAgain"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import WorldMapPinCountry from '@/components/country/WorldMapPinCountry.vue';
import SidebarPinCountry from '@/components/country/SidebarPinCountry.vue';
import WelcomeSetting from '@/components/common/WelcomeSetting.vue';
import ResultModal from '@/components/common/ResultModal.vue';

import { useSettingsStore } from '@/store/settings';
import { useRestCountries } from "@/store/restcountries";

const settingsStore = useSettingsStore();
const restcountries = useRestCountries();
const router = useRouter();

const showResult = ref(false);

const currentContry = computed(() => {
  return restcountries.getListPinCountries[0];
});

const checkIsGoodCountry = (code: string) => {
  console.log(code, currentContry.value.code)
  if (currentContry.value.code !== code) return

  restcountries.setPinCountryFound(code);
  restcountries.setListPinCountries(code);
};

const nextCountry = () => {
  restcountries.setNextPinCountry();
};

const stopGame = () => {
  showResult.value = true;
};

const goToHome = () => {
  router.push({ name: 'Home' });
  showResult.value = false;
};

const handleTryAgain = () => {
  restcountries.resetPinCountries();
  settingsStore.setShowWelcomePinCountry(true);
  showResult.value = false;
}
</script>