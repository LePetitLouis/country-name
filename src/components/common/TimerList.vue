<template>
  <ol class="flex flex-wrap gap-3">
    <template v-for="item in timers" :key="item">
      <li
        :class="`cursor-pointer transition-all duration-250 h-8 flex items-center p-4 border border-slate-600 hover:bg-slate-500 ${timer === item && 'bg-slate-500'}`"
        @click="$emit('update-timer', item)">
        <span class="text-l">
          {{ item }} minute(s)
        </span>
      </li>
    </template>
    <li
      :class="`cursor-pointer transition-all duration-250 h-8 flex items-center p-4 border border-slate-600 hover:bg-slate-500 ${timer === 'no-timer' && 'bg-slate-500'}`"
      @click="$emit('update-timer', 'no timer')">
      <span class="text-l">
        No timer
      </span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  timer: {
    type: String,
    required: true
  }
});

const { timer } = toRefs(props);

const timers = ['1', '2', '3', '4', '5'];
</script>