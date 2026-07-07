<script setup>
import { computed, ref, watchEffect } from 'vue';
import HeroSection from './components/HeroSection.vue';
import ProblemSection from './components/ProblemSection.vue';
import SiteHeader from './components/SiteHeader.vue';
import { messages } from './i18n';

const locale = ref('ru');
const t = computed(() => messages[locale.value]);

const setLocale = (nextLocale) => {
  locale.value = nextLocale;
};

watchEffect(() => {
  document.documentElement.lang = locale.value;
});
</script>

<template>
  <div class="page-shell">
    <SiteHeader
      :cta-label="t.nav.cta"
      :locale="locale"
      :nav-items="t.nav.items"
      @change-locale="setLocale"
    />
    <main>
      <HeroSection :content="t.hero" />
      <ProblemSection :content="t.problem" />
    </main>
  </div>
</template>
