<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  activeSectionId: {
    type: String,
    default: '',
  },
});

defineEmits(['navigate']);
</script>

<template>
  <nav class="nav-links" aria-label="Sections">
    <a
      v-for="item in items"
      :key="`${item.label}-${item.href}`"
      :class="{ active: item.sectionId === activeSectionId }"
      :aria-current="item.sectionId === activeSectionId ? 'page' : undefined"
      :href="item.href"
      @click.prevent="$emit('navigate', item)"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
