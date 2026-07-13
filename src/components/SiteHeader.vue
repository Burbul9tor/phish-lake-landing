<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import NavLinks from './NavLinks.vue';

defineProps({
  locale: {
    type: String,
    required: true,
  },
  homeHref: {
    type: String,
    required: true,
  },
  navItems: {
    type: Array,
    required: true,
  },
  activeSectionId: {
    type: String,
    default: '',
  },
  ctaLabel: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['change-locale', 'navigate-section', 'request-demo']);

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const requestDemo = () => {
  closeMenu();
  emit('request-demo');
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
      <a
        class="brand"
        :href="homeHref"
        aria-label="Phish Lake home"
        @click.prevent="$emit('navigate-section', 'solution')"
      >
        <img class="brand-logo" src="/logo-area.svg" alt="PhishLake" />
      </a>

      <NavLinks
        :items="navItems"
        :active-section-id="activeSectionId"
        @navigate="(item) => {
          closeMenu();
          $emit('navigate-section', item.sectionId);
        }"
      />

      <div class="header-actions">
        <LanguageSwitcher :active-locale="locale" @change-locale="$emit('change-locale', $event)" />
        <button class="demo-button" type="button" @click="requestDemo">{{ ctaLabel }}</button>
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
        <NavLinks
          :items="navItems"
          :active-section-id="activeSectionId"
          @navigate="(item) => {
            closeMenu();
            $emit('navigate-section', item.sectionId);
          }"
        />
        <button class="mobile-demo-button" type="button" @click="requestDemo">
          {{ ctaLabel }}
        </button>
      </div>
    </div>
  </header>
</template>
