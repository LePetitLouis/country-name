<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useRestCountries } from './store/restcountries';

const restcountries = useRestCountries();

onMounted(() => {
  restcountries.fetchRestCountries();
});
</script>