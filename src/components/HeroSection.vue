<script setup>
import CursorSignalField from './CursorSignalField.vue';
import InterfaceShowcase from './InterfaceShowcase.vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section id="solution" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-background" aria-hidden="true">
      <div class="hero-glow glow-one"></div>
      <div class="hero-glow glow-two"></div>
      <div class="hero-glow glow-three"></div>
      <CursorSignalField />
      <div class="grid-layer"></div>
      <div class="scan-line scan-line-one"></div>
      <div class="scan-line scan-line-two"></div>
      <div class="risk-dot risk-dot-one"></div>
      <div class="risk-dot risk-dot-two"></div>
    </div>

    <div class="hero-content">
      <div class="hero-copy">
        <h1 id="hero-title">
          <span class="brand-text">{{ content.titleBrand }}</span>
          <span class="title-rest">{{ content.titleRest }}</span>
        </h1>
        <p class="hero-subtitle">{{ content.subtitle }}</p>
      </div>

      <InterfaceShowcase :content="content.interface" />
    </div>
  </section>
</template>
