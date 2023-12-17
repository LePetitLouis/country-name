<template>
  <div class="w-screen h-screen fixed top-0 right-0 flex items-center z-10">
    <div class="w-screen h-screen absolute top-0 right-0 bg-black-transparent transition-opacity opacity-40"></div>
    <div class="bg-white w-9/12 flex flex-col m-auto z-20 h-[80%] rounded-xl transition-all">
      <div class="text-center border-b p-3">
        <h1 class="px-12 text-black-base text-xl font-bold">{{ title }}</h1>
      </div>
      <div class="overflow-x-scroll p-8 h-full">
        <slot></slot>
      </div>
      <div class="text-center border-t p-2 flex items-center gap-4">
        <button
          class="flex-1 border border-stone-300 hover:bg-stone-100 text-black-base rounded-lg p-2 transition-all"
          @click="$emit('click:home')"
        >
          Home
        </button>
        <button 
          class="flex-1 bg-stone-600 hover:bg-stone-700 text-white rounded-lg p-2 transition-all"
          @click="$emit('click:try-again')"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: "",
  }
});

const { title } = toRefs(props);
</script>