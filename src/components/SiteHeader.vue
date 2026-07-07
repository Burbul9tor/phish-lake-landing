<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
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

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(isMenuOpen, (isOpen) => {
  document.body.classList.toggle('menu-open', isOpen);
});

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open');
});
</script>

<template>
  <header class="site-header" aria-label="Primary navigation">
    <div class="glass-surface">
      <a class="brand" href="#solution" aria-label="Phish Lake home">
        <img class="brand-logo" src="/logo-area.svg" alt="PhishLake" />
      </a>

      <NavLinks :items="navItems" @navigate="closeMenu" />

      <div class="header-actions">
        <LanguageSwitcher :active-locale="locale" @change-locale="$emit('change-locale', $event)" />
        <a class="demo-button" href="mailto:demo@phishlake.example">{{ ctaLabel }}</a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div id="mobile-menu" class="mobile-menu" :class="{ open: isMenuOpen }">
        <NavLinks :items="navItems" @navigate="closeMenu" />
        <a class="mobile-demo-button" href="mailto:demo@phishlake.example" @click="closeMenu">
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </header>
</template>
