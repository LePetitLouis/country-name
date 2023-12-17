<template>
  <main class="relative flex justify-center h-full grow bg-beige">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <AsideResponsivePinCountry :current-country="currentCountry" />
    </div>
    <MapPinCountry @selected:country="$emit('selected:country', $event)" />
  </main>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

import MapPinCountry from "@/components/country/MapPinCountry.vue";
import AsideResponsivePinCountry from "./AsideResponsivePinCountry.vue";

const props = defineProps({
  currentCountry: {
    type: String,
    default: "",
  }
});

const { currentCountry } = toRefs(props);
</script>
