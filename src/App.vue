<script setup lang="ts">
import { Analytics } from '@vercel/analytics/react';

import WorldMap from '@/components/WorldMap.vue';
import Sidebar from '@/components/Sidebar.vue';
import Welcome from '@/components/Welcome.vue';

import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore();
</script>

<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMap />
    <Sidebar />
    <template v-if="settingsStore.getShowWelcome">
      <Welcome />
    </template>
    <Analytics />
  </section>
</template>