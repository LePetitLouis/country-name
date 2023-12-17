<template>
  <div class="relative z-30 font-sans">
    <div class="fixed inset-0 bg-gray-700 bg-opacity-80 transition-opacity opacity-100">
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg font-sans text-white px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 opacity-100 translate-y-0 sm:scale-100">
            <template v-if="step === 'settings'">
              <h1 class="text-3xl mb-4 text-center">Game Settings</h1>
              <div class="flex flex-col gap-3">
                <p class="text-xl text-stone-200">Choose a continent</p>
                <ContinentsList :continent="settings.continent" @update-continent="settings.continent = $event" />
              </div>

              <div class="flex flex-col gap-3 mt-6">
                <p class="text-xl text-stone-200">Choose a timer</p>
                <TimerList :timer="settings.timer" @update-timer="settings.timer = $event" />
              </div>

              <div class="mt-6 flex justify-center">
                <button
                  class="py-2 px-9 border border-slate-600 hover:bg-slate-500 disabled:border-gray-600 disabled:bg-gray-600 disabled:text-gray-400"
                  :disabled="disabledButton" @click="startCountdown">
                  Start
                </button>
              </div>
            </template>
            <div v-else class="text-center">
              <p class="text-5xl font-extrabold">
                {{ countdown }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRestCountries } from '@/store/restcountries';
import { useSettingsStore } from '@/store/settings';

import ContinentsList from './ContinentsList.vue';
import TimerList from './TimerList.vue';

const restcountries = useRestCountries();
const settingsStore = useSettingsStore();

const step = ref<'settings' | 'countdown'>('settings');
const countdown = ref<string|number>(3);
const timerId = ref<any>(null);

const settings = ref({
  continent: '', // asia, africa, oceania, europe, south america, north america, all
  timer: '' // in minute
});

const disabledButton = computed(() => {
  return !(settings.value.continent && settings.value.timer)
});

const startCountdown = () => {
  step.value = 'countdown';
  timerId.value = setInterval(() => {
    if (countdown.value === 1) {
      countdown.value = 'Let\'s go !';
    }
    else if (typeof countdown.value === 'number' && countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timerId.value);
      restcountries.setPinContient(settings.value.continent);
      restcountries.setPinTimer(settings.value.timer);
      settingsStore.setShowWelcomePinCountry(false);
    }
  }, 1000);
};

</script>