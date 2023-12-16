<template>
  <BaseModal 
    title="Good Job 🎉"
    @click:home="$emit('click:home')"
    @click:try-again="$emit('click:try-again')"

  >
    You pined {{ restcountries.getPinCountriesFound.length }} countries
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/common/BaseModal.vue';

import { useRestCountries } from '@/store/restcountries';

const restcountries = useRestCountries();

</script>