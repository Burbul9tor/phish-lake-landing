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
    <a v-for="item in items" :key="item.href" :href="item.href" @click="$emit('navigate')">
      {{ item.label }}
    </a>
  </nav>
</template>
