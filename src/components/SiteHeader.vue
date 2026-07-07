<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';
import NavLinks from './NavLinks.vue';

defineProps({
  locale: {
    type: String,
    required: true,
  },
  navItems: {
    type: Array,
    required: true,
  },
  ctaLabel: {
    type: String,
    required: true,
  },
});

defineEmits(['change-locale']);
</script>

<template>
  <header class="site-header" aria-label="Primary navigation">
    <div class="glass-surface">
      <a class="brand" href="#solution" aria-label="Phish Lake home">
        <img class="brand-logo" src="/logo-area.svg" alt="PhishLake" />
      </a>

      <NavLinks :items="navItems" />

      <div class="header-actions">
        <LanguageSwitcher :active-locale="locale" @change-locale="$emit('change-locale', $event)" />
        <a class="demo-button" href="mailto:demo@phishlake.example">{{ ctaLabel }}</a>
      </div>
    </div>
  </header>
</template>
