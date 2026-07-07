<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
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
          <span class="problem-index">{{ index + 1 }}</span>
          <div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </article>
      </div>

      <div class="attack-scenario">
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
