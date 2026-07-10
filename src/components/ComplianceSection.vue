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
    id="compliance"
    ref="sectionRef"
    class="compliance-section"
    :class="{ visible: isVisible }"
    aria-labelledby="compliance-title"
  >
    <div class="compliance-shell">
      <div class="compliance-heading">
        <h2 id="compliance-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="compliance-grid">
        <article class="compliance-tile compliance-tile-document compliance-tile-document-main">
          <span class="compliance-eyebrow">{{ content.standardLabel }}</span>
          <strong>{{ content.regulations[0].code }}</strong>
          <p>{{ content.regulations[0].source }}</p>
          <a
            class="compliance-source-link"
            :href="content.regulations[0].sourceUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ content.sourceLabel }}
          </a>
          <ul>
            <li v-for="point in content.regulations[0].points" :key="point">{{ point }}</li>
          </ul>
        </article>

        <article class="compliance-tile compliance-tile-stat compliance-tile-stat-1">
          <strong>{{ content.stats[0].value }}</strong>
          <span>{{ content.stats[0].label }}</span>
        </article>

        <blockquote class="compliance-tile compliance-tile-quote">
          <p>&ldquo;{{ content.quote }}&rdquo;</p>
          <footer>
            <span>PhishLake</span>
            <small>{{ content.evidenceLabel }}</small>
          </footer>
        </blockquote>

        <article class="compliance-tile compliance-tile-document compliance-tile-document-alt">
          <span class="compliance-eyebrow">{{ content.standardLabel }}</span>
          <strong>{{ content.regulations[1].code }}</strong>
          <p>{{ content.regulations[1].source }}</p>
          <a
            class="compliance-source-link"
            :href="content.regulations[1].sourceUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ content.sourceLabel }}
          </a>
          <ul>
            <li v-for="point in content.regulations[1].points" :key="point">{{ point }}</li>
          </ul>
        </article>

        <article class="compliance-tile compliance-tile-stat compliance-tile-stat-2">
          <strong>{{ content.stats[1].value }}</strong>
          <span>{{ content.stats[1].label }}</span>
        </article>

        <article class="compliance-tile compliance-tile-stat compliance-tile-stat-3">
          <strong>{{ content.stats[2].value }}</strong>
          <span>{{ content.stats[2].label }}</span>
        </article>
      </div>
    </div>
  </section>
</template>
