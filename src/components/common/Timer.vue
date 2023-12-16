<template>
  <p>{{ formattedTime }}</p>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, toRefs } from 'vue';

const props = defineProps({
  duration: {
    type: Number,
    required: true
  }
});

const emit = defineEmits<{
  (e: "end:timer"): void;
}>();

const { duration } = toRefs(props);

const intervalId = ref<any>(null);
const seconds = ref(0);
const minutes = ref(duration.value);

const formattedTime = computed(() => {
  return `${formatTime(minutes.value)}:${formatTime(seconds.value)}`;
});

const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
}

const startTimer = () => {
  intervalId.value = setInterval(() => {
    seconds.value--;
    if (seconds.value < 0) {
      seconds.value = 59;
      minutes.value--;
      if (minutes.value < 0) {
        // Timer expired, stop the timer
        clearInterval(intervalId.value);
        intervalId.value = null;
        emit('end:timer');
      }
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeMount(() => {
  clearInterval(intervalId.value);
})
</script>