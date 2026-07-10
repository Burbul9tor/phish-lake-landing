<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const isVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.16 },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section
    id="start"
    ref="sectionRef"
    class="start-section"
    :class="{ visible: isVisible }"
    aria-labelledby="start-title"
  >
    <div class="start-shell">
      <div class="start-heading">
        <h2 id="start-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <ol class="start-steps">
        <li
          v-for="(step, index) in content.steps"
          :key="step.title"
          class="start-step"
          :style="{ '--start-index': index }"
        >
          <span class="start-step-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="start-step-copy">
            <h3>{{ step.title }}</h3>
            <p>{{ step.meta }}</p>
          </div>
          <span class="start-step-pulse" aria-hidden="true"></span>
        </li>
      </ol>
    </div>
  </section>
</template>
