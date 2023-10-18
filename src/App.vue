<script setup lang="ts">
import WorldMap from './components/WorldMap.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <section class="flex flex-row items-center justify-between h-screen">
    <WorldMap />
    <Sidebar />
  </section>
</template>