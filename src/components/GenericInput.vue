<template>
  <div class="relative grow">
    <input
      :class="classObject"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      @input="handleChangeValue"
      @keydown.enter="handleSubmit"
    />
    <div
      v-if="alreadyFound"
      class="absolute right-0 top-0 z-50 h-full flex items-center my-auto pointer-events-none opacity-100 py-1 pr-1"
    >
      <div class="bg-orange rounded-lg h-full flex items-center justify-center px-4">
        <span class="text-white">Already found !</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Enter text",
  },
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: Boolean,
    default: false,
  },
  alreadyFound: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:value", "submit"]);

const { value } = toRefs(props);

const classObject = computed(() => {
  return {
    "relative transition-shadow duration-300 z-40 w-full px-4 py-2 rounded-lg text-lg font-bold shadow-lg text-stone-800 outline-none focus:ring-2 ring-stone-800 caret-current":
      true,
    "animate animate-shake": props.error,
  };
});

const handleChangeValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:value", target.value);
};

const handleSubmit = () => {
  emit("submit");
};
</script>
