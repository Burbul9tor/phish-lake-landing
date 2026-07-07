<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import HeroSection from './components/HeroSection.vue';
import ProblemSection from './components/ProblemSection.vue';
import SiteHeader from './components/SiteHeader.vue';
import WorkflowSection from './components/WorkflowSection.vue';
import { messages } from './i18n';
import { workflowMessages } from './workflowContent';

const locale = ref('ru');
const isLoading = ref(true);
const t = computed(() => messages[locale.value]);
const workflowContent = computed(() => workflowMessages[locale.value]);

const setLocale = (nextLocale) => {
  locale.value = nextLocale;
};

watchEffect(() => {
  document.documentElement.lang = locale.value;
});

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false;
  }, 900);
});
</script>

<template>
  <div class="page-shell">
    <Transition name="preloader-fade">
      <div v-if="isLoading" class="site-preloader" role="status" aria-label="Loading PhishLake">
        <img src="/logo-area.svg" alt="PhishLake" />
        <span></span>
      </div>
    </Transition>

    <SiteHeader
      :cta-label="t.nav.cta"
      :locale="locale"
      :nav-items="t.nav.items"
      @change-locale="setLocale"
    />
    <main>
      <HeroSection :content="t.hero" />
      <ProblemSection :content="t.problem" />
      <WorkflowSection :content="workflowContent" />
    </main>
  </div>
</template>
