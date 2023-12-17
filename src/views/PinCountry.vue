<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMapPinCountry :current-country="currentContry?.name" @selected:country="checkIsGoodCountry" />
    <SidebarPinCountry :current-country="currentContry?.name" @end:timer="stopGame" @click:next="nextCountry" />
    <template v-if="settingsStore.getShowWelcomePinCountry">
      <WelcomeSetting />
    </template>
    <ResultModal v-if="showResult" @click:home="goToHome" @click:try-again="handleTryAgain" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
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

watch(currentContry, (newValue) => {
  if (newValue === undefined && !settingsStore.getShowWelcomePinCountry) stopGame()
})

const checkIsGoodCountry = (code: string) => {
  if (currentContry.value.code !== code) {
    document.querySelector(`.world-map #${code}`)?.classList.add('error');
    setTimeout(() => {
      document.querySelector(`.world-map #${code}`)?.classList.remove('error');
    }, 500);

    return
  }

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
  restcountries.resetPinCountries();
  settingsStore.setShowWelcomePinCountry(true);
  showResult.value = false;
  router.push({ name: 'Home' });
};

const handleTryAgain = () => {
  restcountries.resetPinCountries();
  settingsStore.setShowWelcomePinCountry(true);
  showResult.value = false;
  document.querySelectorAll('.world-map path').forEach(path => path.classList.remove('selected'));
};

onMounted(() => {
  restcountries.resetPinCountries();
  settingsStore.setShowWelcomePinCountry(true);
  showResult.value = false;
})
</script>