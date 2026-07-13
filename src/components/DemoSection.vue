<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import CursorSignalField from './CursorSignalField.vue';

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
    id="demo"
    ref="sectionRef"
    class="demo-section"
    :class="{ visible: isVisible }"
    aria-labelledby="demo-title"
  >
    <div class="demo-background" aria-hidden="true">
      <CursorSignalField />
    </div>

    <div class="demo-shell">
      <div class="demo-heading">
        <span class="demo-logo-mark" aria-label="PhishLake">
          <img src="/logo-area.svg" alt="" />
        </span>
        <h2 id="demo-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <a class="demo-cta" href="mailto:demo@phishlake.example">
        {{ content.cta }}
      </a>
    </div>
  </section>
</template>
