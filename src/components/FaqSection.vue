<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const openIndex = ref(0);
const isVisible = ref(false);
let observer;

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.14 },
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
    id="faq"
    ref="sectionRef"
    class="faq-section"
    :class="{ visible: isVisible }"
    aria-labelledby="faq-title"
  >
    <div class="faq-shell">
      <div class="faq-heading">
        <h2 id="faq-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="faq-list">
        <article
          v-for="(item, index) in content.items"
          :key="item.question"
          class="faq-item"
          :class="{ active: openIndex === index }"
          :style="{ '--faq-index': index }"
        >
          <button
            class="faq-question"
            type="button"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            @click="toggleItem(index)"
          >
            <span>{{ item.question }}</span>
            <i aria-hidden="true"></i>
          </button>

          <div
            :id="`faq-answer-${index}`"
            class="faq-answer"
            :aria-hidden="openIndex !== index"
          >
            <p>{{ item.answer }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
