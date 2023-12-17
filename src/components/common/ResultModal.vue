<template>
  <BaseModal title="Good Job 🎉" @click:home="$emit('click:home')" @click:try-again="$emit('click:try-again')">
    <div class="flex items-center gap-6">
      <div class="flex-1 relative flex justify-center w-[200px] h-[200px] m-auto rounded-full">
        <div ref="circle" class="w-[200px] h-[200px] rounded-full relative transition-colors"></div>
        <div ref="scoreText"
          class="w-[170px] h-[170px] rounded-full bg-white absolute top-[8%] flex flex-col items-center justify-center">
          <p class="font-bold text-3xl">{{ score }}</p>
          <span>out of {{ total }}</span>
        </div>
      </div>
      <div class="flex-1">
        <p>Continent: <strong>{{ restcountries.getPinContinent }}</strong></p>
        <p>Timer: <strong>{{ timer }}</strong></p>
        <p>Countries pinned: <strong>{{ score }}</strong></p>
        <p>Total of {{ restcountries.getPinContinent }} countries: <strong>{{ total }}</strong></p>
      </div>
    </div>

  </BaseModal>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

import BaseModal from '@/components/common/BaseModal.vue';

import { useRestCountries } from '@/store/restcountries';

const restcountries = useRestCountries();

const circle = ref<HTMLElement | null>(null);
const scoreText = ref<HTMLElement | null>(null);
const score = ref(restcountries.getPinCountriesFound.length);
const total = ref(restcountries.getTotalPinCountries);

const timer = computed(() => {
  return restcountries.getPinTimer === 0 ? 'no timer' : `${restcountries.getPinTimer}min`
})

const updateCircleScore = () => {
  const percentage = (score.value / total.value) * 100;
  nextTick(() => {
    if (circle.value) circle.value.style.background = `conic-gradient(#16161A ${percentage}%, #e0e0e0 ${percentage}% 100%)`;
  });
};

onMounted(() => {
  updateCircleScore();
})

</script>