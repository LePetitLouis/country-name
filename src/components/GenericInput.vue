<template>
  <input
    class="relative transition-shadow duration-300 z-40 w-full px-4 py-2 rounded-full text-lg font-bold shadow-lg text-blue-900 outline-none focus:ring-2 ring-blue-800 caret-current"
    :value="value"
    :placeholder="placeholder"
    :type="type"
    @input="handleChangeValue"
    @keydown.enter="handleSubmit"
  />
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Enter text',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:value', 'submit'])

const { value } = toRefs(props)

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
}

const handleSubmit = () => {
  emit('submit')
}
</script>