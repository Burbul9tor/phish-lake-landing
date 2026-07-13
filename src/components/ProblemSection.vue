<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const scenarioRef = ref(null);
const isScenarioVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isScenarioVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.22 },
  );

  if (scenarioRef.value) {
    observer.observe(scenarioRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section id="problem" class="problem-section" aria-labelledby="problem-title">
    <div class="problem-shell">
      <div class="problem-heading">
        <h2 id="problem-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="problem-grid">
        <article v-for="(card, index) in content.cards" :key="card.title" class="problem-card">
          <div class="problem-illustration" :class="`illustration-${index + 1}`" aria-hidden="true">
            <svg v-if="index === 0" viewBox="0 0 220 150" role="img">
              <rect x="30" y="26" width="160" height="98" rx="14" />
              <path d="M30 43h160" />
              <path d="M48 66h70" />
              <path d="M48 82h54" />
              <path d="M48 98h82" />
              <rect x="134" y="62" width="38" height="38" rx="10" />
              <path d="M48 112h42" />
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 220 150" role="img">
              <rect x="34" y="36" width="152" height="86" rx="16" />
              <path d="M34 54 110 91l76-37" />
              <path d="M34 104 84 78" />
              <path d="M186 104 136 78" />
              <path d="M58 114h104" />
            </svg>
            <svg v-else viewBox="0 0 220 150" role="img">
              <path d="M48 118 166 58l28 14-118 60-28-14Z" />
              <path d="M56 108 174 48l28 14-118 60-28-14Z" />
              <path d="M64 98 182 38l28 14-118 60-28-14Z" />
              <path d="M72 88 190 28l28 14-118 60-28-14Z" />
              <path d="M80 78 198 18l28 14-118 60-28-14Z" />
              <path d="M48 118v12l28 14 118-60V72" />
              <path d="M76 132v12" />
              <path d="M194 72v12" />
            </svg>
          </div>
          <span class="problem-index">{{ index + 1 }}</span>
          <div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </article>
      </div>

      <div ref="scenarioRef" class="attack-scenario" :class="{ visible: isScenarioVisible }">
        <div class="scenario-heading">
          <p class="section-kicker">{{ content.scenario.kicker }}</p>
          <h3>{{ content.scenario.title }}</h3>
        </div>

        <ol class="scenario-timeline">
          <li v-for="step in content.scenario.steps" :key="step.time">
            <time>{{ step.time }}</time>
            <div>
              <h4>{{ step.title }}</h4>
              <p>{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
