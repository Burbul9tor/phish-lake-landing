<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);
const isSubmitted = ref(false);

const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  isSubmitted.value = true;
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal();
  }
};

watch(
  () => props.isOpen,
  (isOpen) => {
    document.body.classList.toggle('modal-open', isOpen);

    if (!isOpen) {
      isSubmitted.value = false;
    }
  },
);

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.classList.remove('modal-open');
});
</script>

<template>
  <Teleport to="body">
    <Transition name="demo-modal">
      <div v-if="isOpen" class="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-form-title">
        <button class="demo-modal-backdrop" type="button" :aria-label="content.close" @click="closeModal"></button>

        <div class="demo-modal-panel">
          <button class="demo-modal-close" type="button" :aria-label="content.close" @click="closeModal">
            <span></span>
            <span></span>
          </button>

          <div v-if="!isSubmitted" class="demo-form-content">
            <div class="demo-form-heading">
              <h2 id="demo-form-title">{{ content.title }}</h2>
              <p>{{ content.subtitle }}</p>
            </div>

            <form class="demo-form" @submit.prevent="submitForm">
              <label>
                <span>{{ content.fields.name }}</span>
                <input type="text" name="name" :placeholder="content.placeholders.name" autocomplete="name" required />
              </label>

              <label>
                <span>{{ content.fields.company }}</span>
                <input
                  type="text"
                  name="company"
                  :placeholder="content.placeholders.company"
                  autocomplete="organization"
                  required
                />
              </label>

              <label>
                <span>{{ content.fields.email }}</span>
                <input
                  type="email"
                  name="email"
                  :placeholder="content.placeholders.email"
                  autocomplete="email"
                  required
                />
              </label>

              <label>
                <span>{{ content.fields.phone }}</span>
                <input type="tel" name="phone" :placeholder="content.placeholders.phone" autocomplete="tel" />
              </label>

              <label class="demo-form-wide">
                <span>{{ content.fields.message }}</span>
                <textarea name="message" :placeholder="content.placeholders.message" rows="4"></textarea>
              </label>

              <button class="demo-form-submit" type="submit">{{ content.submit }}</button>
            </form>
          </div>

          <div v-else class="demo-form-success">
            <span aria-hidden="true"></span>
            <h2>{{ content.successTitle }}</h2>
            <p>{{ content.successText }}</p>
            <button class="demo-form-submit" type="button" @click="closeModal">{{ content.close }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
