<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
});

defineEmits(['navigate-section', 'request-demo']);
</script>

<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-brand">
        <a
          class="footer-logo"
          href="/"
          aria-label="PhishLake home"
          @click.prevent="$emit('navigate-section', 'solution')"
        >
          <img src="/logo-area.svg" alt="PhishLake" />
        </a>
        <p>{{ content.description }}</p>
      </div>

      <nav class="footer-nav" :aria-label="content.productTitle">
        <h2>{{ content.productTitle }}</h2>
        <button
          v-for="link in content.links.product"
          :key="link.sectionId"
          type="button"
          @click="$emit('navigate-section', link.sectionId)"
        >
          {{ link.label }}
        </button>
      </nav>

      <nav class="footer-nav" :aria-label="content.companyTitle">
        <h2>{{ content.companyTitle }}</h2>
        <button
          v-for="link in content.links.company"
          :key="link.sectionId"
          type="button"
          @click="$emit('navigate-section', link.sectionId)"
        >
          {{ link.label }}
        </button>
      </nav>

      <div class="footer-contact">
        <h2>{{ content.contactsTitle }}</h2>
        <a href="mailto:demo@phishlake.example">{{ content.email }}</a>
        <button class="footer-demo" type="button" @click="$emit('request-demo')">{{ content.demo }}</button>
      </div>

      <div class="footer-bottom">
        <span>{{ content.copyright }}</span>
        <button type="button" @click="$emit('navigate-section', 'solution')">PhishLake</button>
      </div>
    </div>
  </footer>
</template>
