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
    id="audience"
    ref="sectionRef"
    class="audience-section"
    :class="{ visible: isVisible }"
    aria-labelledby="audience-title"
  >
    <div class="audience-shell">
      <div class="audience-heading">
        <h2 id="audience-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="audience-grid">
        <article
          v-for="(item, index) in content.items"
          :key="item.role"
          class="audience-card"
          :class="`audience-card-${index + 1}`"
          :style="{ '--audience-index': index }"
        >
          <div class="audience-role">
            <h3>{{ item.role }}</h3>
            <p>{{ item.focus }}</p>
          </div>
          <ul>
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
