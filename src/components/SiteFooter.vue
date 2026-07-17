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
        <a class="footer-email" href="mailto:demo@phishlake.example">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6.5h16v11H4z" />
            <path d="m4.5 7 7.5 6 7.5-6" />
          </svg>
          <span>{{ content.email }}</span>
        </a>
        <button class="footer-demo" type="button" @click="$emit('request-demo')">{{ content.demo }}</button>
      </div>

      <div class="footer-bottom">
        <span>{{ content.copyright }}</span>
        <button type="button" @click="$emit('navigate-section', 'solution')">PhishLake</button>
      </div>
    </div>
  </footer>
</template>
