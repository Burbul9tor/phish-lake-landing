<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

defineEmits(['navigate']);
</script>

<template>
  <nav class="nav-links" aria-label="Sections">
    <a v-for="item in items" :key="`${item.label}-${item.href}`" :href="item.href" @click.prevent="$emit('navigate', item)">
      {{ item.label }}
    </a>
  </nav>
</template>
