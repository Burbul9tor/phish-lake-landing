<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import HeroSection from './components/HeroSection.vue';
import HowItWorksSection from './components/HowItWorksSection.vue';
import ProblemSection from './components/ProblemSection.vue';
import SiteHeader from './components/SiteHeader.vue';
import WorkflowSection from './components/WorkflowSection.vue';
import { howItWorksMessages } from './howItWorksContent';
import { messages } from './i18n';
import { workflowMessages } from './workflowContent';

const locale = ref('ru');
const isLoading = ref(true);
const t = computed(() => messages[locale.value]);
const workflowContent = computed(() => workflowMessages[locale.value]);
const howItWorksContent = computed(() => howItWorksMessages[locale.value]);
const supportedLocales = Object.keys(messages);
const sectionIds = ['solution', 'how', 'features', 'audience', 'start'];
const scrollableSectionIds = ['solution', 'how', 'features', 'start'];

const getLocalizedPath = (nextLocale, sectionId = 'solution') => {
  const sectionPath = sectionId === 'solution' ? '' : `${sectionId}`;

  return `/${nextLocale}/${sectionPath}`;
};

const navItems = computed(() => {
  return t.value.nav.items.map((item) => ({
    ...item,
    sectionId: item.href,
    href: getLocalizedPath(locale.value, item.href),
  }));
});

const homeHref = computed(() => getLocalizedPath(locale.value));

const getLocaleFromPath = () => {
  const [pathLocale] = window.location.pathname.split('/').filter(Boolean);

  return supportedLocales.includes(pathLocale) ? pathLocale : null;
};

const getSectionFromPath = () => {
  const [, pathSection] = window.location.pathname.split('/').filter(Boolean);

  return sectionIds.includes(pathSection) ? pathSection : null;
};

const getSectionFromHash = () => {
  const hashSection = window.location.hash.replace('#', '');

  return sectionIds.includes(hashSection) ? hashSection : null;
};

const getCurrentSection = () => {
  return getSectionFromPath() ?? getSectionFromHash() ?? 'solution';
};

const getLocalizedUrl = (nextLocale, sectionId = getCurrentSection()) => {
  return `${getLocalizedPath(nextLocale, sectionId)}${window.location.search}`;
};

const syncUrl = (nextLocale, sectionId = getCurrentSection(), historyMethod = 'pushState') => {
  const nextUrl = getLocalizedUrl(nextLocale, sectionId);
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (currentUrl !== nextUrl) {
    window.history[historyMethod](null, '', nextUrl);
  }
};

const scrollToSection = async (sectionId) => {
  if (!scrollableSectionIds.includes(sectionId)) {
    return;
  }

  await nextTick();

  window.requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
};

const setLocale = (nextLocale) => {
  if (!supportedLocales.includes(nextLocale)) {
    return;
  }

  const sectionId = getCurrentSection();

  locale.value = nextLocale;
  syncUrl(nextLocale, sectionId);
  scrollToSection(sectionId);
};

const navigateToSection = (sectionId) => {
  syncUrl(locale.value, sectionId);
  scrollToSection(sectionId);
};

const handlePopState = () => {
  locale.value = getLocaleFromPath() ?? 'ru';
  scrollToSection(getCurrentSection());
};

watchEffect(() => {
  document.documentElement.lang = locale.value;
});

onMounted(() => {
  const pathLocale = getLocaleFromPath();
  const sectionId = getCurrentSection();

  if (pathLocale) {
    locale.value = pathLocale;
  }

  syncUrl(locale.value, sectionId, 'replaceState');
  window.addEventListener('popstate', handlePopState);
  scrollToSection(sectionId);

  window.setTimeout(() => {
    isLoading.value = false;
  }, 900);
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <div class="page-shell">
    <Transition name="preloader-fade">
      <div v-if="isLoading" class="site-preloader" role="status" aria-label="Loading PhishLake">
        <div class="preloader-brand" aria-hidden="true">
          <strong>PhishLake</strong>
          <small>платформа для фишинг-симуляций</small>
        </div>
        <span></span>
      </div>
    </Transition>

    <SiteHeader
      :cta-label="t.nav.cta"
      :home-href="homeHref"
      :locale="locale"
      :nav-items="navItems"
      @change-locale="setLocale"
      @navigate-section="navigateToSection"
    />
    <main>
      <HeroSection :content="t.hero" />
      <ProblemSection :content="t.problem" />
      <WorkflowSection :content="workflowContent" />
      <HowItWorksSection :content="howItWorksContent" />
    </main>
  </div>
</template>
