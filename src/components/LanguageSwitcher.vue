<script setup>
import { computed, ref } from 'vue';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KZ' },
  { code: 'en', label: 'EN' },
];

const props = defineProps({
  activeLocale: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['change-locale']);
const isOpen = ref(false);

const activeLabel = computed(() => {
  return languages.find((language) => language.code === props.activeLocale)?.label ?? 'RU';
});

const selectLanguage = (code) => {
  emit('change-locale', code);
  isOpen.value = false;
};
</script>

<template>
  <div class="language-switcher" aria-label="Language selector">
    <button
      class="language-trigger"
      type="button"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      {{ activeLabel }}
      <span class="chevron" aria-hidden="true"></span>
    </button>
    <div v-if="isOpen" class="language-menu">
      <button
        v-for="language in languages"
        :key="language.code"
        :class="{ active: activeLocale === language.code }"
        type="button"
        @click="selectLanguage(language.code)"
      >
        {{ language.label }}
      </button>
    </div>
  </div>
</template>
