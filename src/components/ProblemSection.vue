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
  <section id="how" class="problem-section" aria-labelledby="problem-title">
    <div class="problem-shell">
      <div class="problem-heading">
        <h2 id="problem-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="problem-grid">
        <article v-for="(card, index) in content.cards" :key="card.title" class="problem-card">
          <div class="problem-illustration" :class="`illustration-${index + 1}`" aria-hidden="true">
            <svg v-if="index === 0" viewBox="0 0 220 150" role="img">
              <path d="M36 54 110 16l74 38-74 38-74-38Z" />
              <path d="M36 54v18l74 38 74-38V54" />
              <path d="M48 82v15l62 32 62-32V82" />
              <path d="M61 106v14l49 25 49-25v-14" />
              <path d="M82 54c4-13 17-22 31-21 17 1 31 12 34 27" />
              <path d="M78 62h69" />
              <path d="M86 72h52" />
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 220 150" role="img">
              <path d="M82 25 122 5l40 20v48l-40 21-40-21V25Z" />
              <path d="M82 25l40 22 40-22" />
              <path d="M42 70 84 48l42 22v58l-42 22-42-22V70Z" />
              <path d="M42 70l42 23 42-23" />
              <path d="M126 83 168 61l42 22v45l-42 22-42-22V83Z" />
              <path d="M126 83l42 23 42-23" />
              <path d="M84 119h42" />
              <path d="M122 47v47" />
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
