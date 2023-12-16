<template>
  <main class="relative flex justify-center h-full grow bg-beige">
    <div class="absolute w-96 max-w-full px-1 h-12 top-4 lg:top-32">
      <AsideResponsive />
    </div>
    <MapPinCountry @selected:country="$emit('selected:country', $event)" />
  </main>
</template>

<script setup lang="ts">
import MapPinCountry from "@/components/country/MapPinCountry.vue";
import AsideResponsive from "@/components/country/AsideResponsive.vue";
</script>
