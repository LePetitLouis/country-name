<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMap />
    <Sidebar />
    <template v-if="settingsStore.getShowWelcomeCountry">
      <Welcome title="Type the name of a country, then press Enter." />
    </template>
  </section>
</template>

<script setup lang="ts">
import WorldMap from '@/components/country/WorldMap.vue';
import Sidebar from '@/components/country/Sidebar.vue';
import Welcome from '@/components/common/Welcome.vue';

import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore();
</script>