<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMapCapitale />
    <SidebarCapitale />
    <template v-if="settingsStore.getShowWelcomeCapital">
      <Welcome title="Type the name of a capital or click on a country and enter her capital, then press Enter." />
    </template>
  </section>
</template>

<script setup lang="ts">
import WorldMapCapitale from '@/components/capitale/WorldMapCapitale.vue';
import SidebarCapitale from '@/components/capitale/SidebarCapitale.vue';
import Welcome from '@/components/Welcome.vue';

import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore()
</script>