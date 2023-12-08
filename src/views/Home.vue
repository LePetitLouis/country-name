<template>
  <section class="flex flex-col gap-9 items-center justify-center h-screen">
    <h1 class="text-3xl font-black">Choose a game</h1>
    <div class="flex flex-row flex-wrap gap-5 items-center justify-center">
      <router-link to="/country" class="max-w-xs p-4 rounded-md border border-stone-300 hover:bg-stone-100">
        <h2 class="text-xl font-bold">Country Game</h2>
        <p class="text-stone-800">Retrieve all the countries in the world from your memory</p>
      </router-link>
      <router-link to="/capital" class="max-w-xs p-4 rounded-md border border-stone-300 hover:bg-stone-100">
        <h2 class="text-xl font-bold">Capital Game</h2>
        <p>Retrieve all the capitals in the world from your memory</p>
      </router-link>
    </div>

  </section>
</template>

<script setup lang="ts">
</script>