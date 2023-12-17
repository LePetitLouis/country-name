<template>
  <ol class="flex flex-wrap gap-3">
    <template v-for="item in restcountries.getContinents" :key="item">
      <li
        :class="`cursor-pointer transition-all duration-250 h-8 flex items-center p-4 border border-slate-600 hover:bg-slate-500 ${continent === item && 'bg-slate-500'}`"
        @click="$emit('update-continent', item)">
        <span class="text-l">
          {{ item }}
        </span>
      </li>
    </template>
    <li
      :class="`cursor-pointer transition-all duration-250 h-8 flex items-center p-4 border border-slate-600 hover:bg-slate-500 ${continent === 'all' && 'bg-slate-500'}`"
      @click="$emit('update-continent', 'all')">
      <span class="text-l">
        All continents
      </span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import { useRestCountries } from '@/store/restcountries';

const restcountries = useRestCountries();

const props = defineProps({
  continent: {
    type: String,
    default: "",
  }
});

const { continent } = toRefs(props);
</script>