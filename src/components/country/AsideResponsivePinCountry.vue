<template>
  <div :class="classObject">
    <div class="mb-2" v-if="!showDetails">
      <div class="flex items-center justify-between gap-5">
        <span class="text-2xl @md:text-2xl font-bold">
          {{ currentCountry }}
        </span>
        <button class="p-2 border border-stone-400 rounded-full" @click="$emit('click:next')">
          <img :src="`/icons/caret-right.svg`" alt="next icon" class="w-5 h-5 -mr-0.5" />
        </button>
      </div>
      
      <Timer 
        v-if="restcountries.getPinTimer !== 'no timer' && restcountries.getPinTimer" 
        :duration="parseInt(restcountries.getPinTimer)" 
        @end:timer="$emit('end:timer')" 
      />
    </div>
    <ContinentsCard v-else />
    <div class="absolute bottom-0 right-0">
      <button
        class="text-gray-500 rounded-full flex items-center justify-center bg-white shadow w-8 h-8 my-1 mx-2"
        @click="showDetails = !showDetails"
      >
        <svg
          v-if="!showDetails"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="w-4 h-4"
        >
          <path
            fill="currentColor"
            d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6l-1.41-1.41z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="w-4 h-4"
        >
          <path
            fill="currentColor"
            d="m12 10.775l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.15-.15.325-.213T12 8.4q.2 0 .375.063t.325.212l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-3.9-3.9Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";

import ContinentsCard from "@/components/country/ContinentsCard.vue";
import Timer from "@/components/common/Timer.vue";

import { useRestCountries } from "@/store/restcountries";

const restcountries = useRestCountries();

const props = defineProps({
  currentCountry: {
    type: String,
    default: "",
  }
});

const { currentCountry } = toRefs(props);

const showDetails = ref(false);

const classObject = computed(() => {
  return {
    "mb-4 lg:hidden bg-white rounded-lg shadow-md p-4 @container relative":
      true,
    "grid grid-cols-2 gap-2": !showDetails,
  };
});
</script>
