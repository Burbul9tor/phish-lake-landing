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
    { threshold: 0.26 },
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
    id="features"
    ref="sectionRef"
    class="workflow-section"
    :class="{ visible: isVisible }"
    aria-labelledby="workflow-title"
  >
    <div class="workflow-shell">
      <div class="workflow-heading">
        <h2 id="workflow-title">{{ content.title }}</h2>
      </div>

      <div class="workflow-steps">
        <article v-for="(step, index) in content.steps" :key="step.title" class="workflow-step">
          <div class="workflow-illustration" :class="`workflow-illustration-${index + 1}`" aria-hidden="true">
            <svg v-if="index === 0" viewBox="0 0 220 150" role="img">
              <path d="M36 62 110 24l74 38-74 38-74-38Z" />
              <path d="M36 62v46l74 38 74-38V62" />
              <path d="M110 100v46" />
              <path d="M64 74l46 24 46-24" />
              <circle cx="110" cy="62" r="24" />
              <circle cx="110" cy="62" r="12" />
              <path d="M110 31v16" />
              <path d="M110 77v16" />
              <path d="M79 62h16" />
              <path d="M125 62h16" />
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 220 150" role="img">
              <path d="M34 118h154" />
              <path d="M50 118V82" />
              <path d="M84 118V56" />
              <path d="M118 118V72" />
              <path d="M152 118V34" />
              <path d="M42 58l34 18 33-34 39 18 36-38" />
              <path d="M176 21h20v20" />
              <circle cx="76" cy="76" r="4" />
              <circle cx="109" cy="42" r="4" />
              <circle cx="148" cy="60" r="4" />
            </svg>
            <svg v-else-if="index === 2" viewBox="0 0 220 150" role="img">
              <path d="M62 46 110 20l48 26v58l-48 26-48-26V46Z" />
              <path d="M62 46l48 26 48-26" />
              <path d="M110 72v58" />
              <path d="M42 94l20 10" />
              <path d="M158 104l20-10" />
              <path d="M68 32l-20-10" />
              <path d="M152 32l20-10" />
            </svg>
            <svg v-else viewBox="0 0 220 150" role="img">
              <path d="M42 104 92 54l34 34 52-58" />
              <path d="M160 30h18v18" />
              <path d="M42 122h138" />
              <path d="M58 122V88" />
              <path d="M96 122V70" />
              <path d="M134 122V92" />
              <path d="M172 122V46" />
              <path d="M58 38h48" />
              <path d="M58 50h28" />
            </svg>
          </div>
          <span class="workflow-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="workflow-step-copy">
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
