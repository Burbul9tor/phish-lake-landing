<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import AudienceSection from './components/AudienceSection.vue';
import ComplianceSection from './components/ComplianceSection.vue';
import DemoRequestModal from './components/DemoRequestModal.vue';
import DemoSection from './components/DemoSection.vue';
import FaqSection from './components/FaqSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import HeroSection from './components/HeroSection.vue';
import HowItWorksSection from './components/HowItWorksSection.vue';
import ProblemSection from './components/ProblemSection.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import StartSection from './components/StartSection.vue';
import WorkflowSection from './components/WorkflowSection.vue';
import { audienceMessages } from './audienceContent';
import { complianceMessages } from './complianceContent';
import { demoFormMessages } from './demoFormContent';
import { demoMessages } from './demoContent';
import { faqMessages } from './faqContent';
import { featuresMessages } from './featuresContent';
import { footerMessages } from './footerContent';
import { howItWorksMessages } from './howItWorksContent';
import { messages } from './i18n';
import { startMessages } from './startContent';
import { workflowMessages } from './workflowContent';

const locale = ref('ru');
const isLoading = ref(true);
const activeSectionId = ref('solution');
const isDemoFormOpen = ref(false);
const t = computed(() => messages[locale.value]);
const workflowContent = computed(() => workflowMessages[locale.value]);
const howItWorksContent = computed(() => howItWorksMessages[locale.value]);
const featuresContent = computed(() => featuresMessages[locale.value]);
const complianceContent = computed(() => complianceMessages[locale.value]);
const audienceContent = computed(() => audienceMessages[locale.value]);
const faqContent = computed(() => faqMessages[locale.value]);
const startContent = computed(() => startMessages[locale.value]);
const demoContent = computed(() => demoMessages[locale.value]);
const demoFormContent = computed(() => demoFormMessages[locale.value]);
const footerContent = computed(() => footerMessages[locale.value]);
const supportedLocales = Object.keys(messages);
const sectionIds = [
  'solution',
  'workflow',
  'how',
  'features',
  'compliance',
  'audience',
  'faq',
  'start',
  'demo',
];
const scrollableSectionIds = [
  'solution',
  'workflow',
  'how',
  'features',
  'compliance',
  'audience',
  'faq',
  'start',
  'demo',
];

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

const updateActiveSection = () => {
  const markerY = window.innerHeight * 0.34;
  const candidates = scrollableSectionIds
    .map((sectionId) => {
      const element = document.getElementById(sectionId);

      if (!element) {
        return null;
      }

      const rect = element.getBoundingClientRect();

      return {
        sectionId,
        distance: Math.abs(rect.top - markerY),
        isCurrent: rect.top <= markerY && rect.bottom > markerY,
      };
    })
    .filter(Boolean);

  const current = candidates.find((candidate) => candidate.isCurrent);
  const closest = candidates.sort((first, second) => first.distance - second.distance)[0];

  activeSectionId.value = (current ?? closest)?.sectionId ?? 'solution';
};

let scrollRaf = 0;

const handleScroll = () => {
  if (scrollRaf) {
    return;
  }

  scrollRaf = window.requestAnimationFrame(() => {
    updateActiveSection();
    scrollRaf = 0;
  });
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

  activeSectionId.value = sectionId;

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
  activeSectionId.value = sectionId;
  syncUrl(locale.value, sectionId);
  scrollToSection(sectionId);
};

const openDemoForm = () => {
  isDemoFormOpen.value = true;
};

const closeDemoForm = () => {
  isDemoFormOpen.value = false;
};

const handlePopState = () => {
  locale.value = getLocaleFromPath() ?? 'ru';
  activeSectionId.value = getCurrentSection();
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
  activeSectionId.value = sectionId;
  window.addEventListener('popstate', handlePopState);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  scrollToSection(sectionId);
  updateActiveSection();

  window.setTimeout(() => {
    isLoading.value = false;
  }, 900);
});

onBeforeUnmount(() => {
  window.removeEventListener('popstate', handlePopState);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);

  if (scrollRaf) {
    window.cancelAnimationFrame(scrollRaf);
  }
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
      :active-section-id="activeSectionId"
      @change-locale="setLocale"
      @navigate-section="navigateToSection"
      @request-demo="openDemoForm"
    />
    <main>
      <HeroSection :content="t.hero" />
      <ProblemSection :content="t.problem" />
      <WorkflowSection :content="workflowContent" />
      <HowItWorksSection :content="howItWorksContent" />
      <FeaturesSection :content="featuresContent" />
      <ComplianceSection :content="complianceContent" />
      <AudienceSection :content="audienceContent" />
      <StartSection :content="startContent" />
      <DemoSection :content="demoContent" @request-demo="openDemoForm" />
      <FaqSection :content="faqContent" />
    </main>
    <SiteFooter
      :content="footerContent"
      @navigate-section="navigateToSection"
      @request-demo="openDemoForm"
    />
    <DemoRequestModal :content="demoFormContent" :is-open="isDemoFormOpen" @close="closeDemoForm" />
  </div>
</template>
