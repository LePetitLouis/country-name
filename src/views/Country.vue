<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMap />
    <Sidebar />
    <template v-if="settingsStore.getShowWelcome">
      <Welcome />
    </template>
  </section>
</template>

<script setup lang="ts">
import WorldMap from '@/components/WorldMap.vue';
import Sidebar from '@/components/Sidebar.vue';
import Welcome from '@/components/Welcome.vue';

import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore();
</script>