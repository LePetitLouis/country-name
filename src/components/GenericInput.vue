<template>
  <input
    :class="classObject"
    :value="value"
    :placeholder="placeholder"
    :type="type"
    @input="handleChangeValue"
    @keydown.enter="handleSubmit"
  />
</template>

<!-- animate animate-shake relative transition-shadow duration-300 z-40 w-full px-4 py-2 rounded-full text-lg font-bold shadow-lg text-blue-900 outline-none focus:ring-2 ring-blue-800 caret-current -->

<script setup lang="ts">
import { computed, toRefs } from 'vue';

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
  error: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:value', 'submit'])

const { value } = toRefs(props)

const classObject = computed(() => {
  return {
    'relative transition-shadow duration-300 z-40 w-full px-4 py-2 rounded-full text-lg font-bold shadow-lg text-blue-900 outline-none focus:ring-2 ring-blue-800 caret-current': true,
    'animate animate-shake': props.error,
  }
})

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
}

const handleSubmit = () => {
  emit('submit')
}
</script>