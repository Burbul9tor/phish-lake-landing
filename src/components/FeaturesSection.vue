<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const isVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.14 },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <section
    id="features"
    ref="sectionRef"
    class="features-section"
    :class="{ visible: isVisible }"
    aria-labelledby="features-title"
  >
    <div class="features-shell">
      <div class="features-heading">
        <h2 id="features-title">{{ content.title }}</h2>
        <div>
          <p>{{ content.text }}</p>
        </div>
      </div>

      <div class="features-grid">
        <article
          v-for="(item, index) in content.items"
          :key="item.title"
          class="feature-card"
          :style="{ '--feature-index': index }"
        >
          <div class="feature-icon" :class="`feature-icon-${item.visual}`" aria-hidden="true">
            <svg viewBox="0 0 220 150" role="img">
              <template v-if="item.visual === 'scenarios'">
                <rect x="44" y="32" width="132" height="86" rx="16" />
                <path d="M64 58h70" />
                <path d="M64 78h92" />
                <path d="M64 98h46" />
              </template>
              <template v-else-if="item.visual === 'attackTypes'">
                <path d="M52 112 110 34l58 78H52Z" />
                <path d="M110 62v26" />
                <path d="M110 102h.1" />
                <path d="M48 122h124" />
              </template>
              <template v-else-if="item.visual === 'riskModel'">
                <circle cx="110" cy="76" r="42" />
                <path d="M110 34v84" />
                <path d="M68 76h84" />
                <path d="M84 102c18-16 38-16 52 0" />
              </template>
              <template v-else-if="item.visual === 'annualPlan'">
                <rect x="42" y="34" width="136" height="88" rx="16" />
                <path d="M42 58h136" />
                <path d="M70 78h18M102 78h18M134 78h18" />
                <path d="M70 100h18M102 100h18M134 100h18" />
              </template>
              <template v-else-if="item.visual === 'learning'">
                <rect x="48" y="38" width="124" height="74" rx="16" />
                <path d="M96 57l34 18-34 18V57Z" />
              </template>
              <template v-else-if="item.visual === 'questions'">
                <rect x="48" y="34" width="124" height="88" rx="18" />
                <path d="M78 62h64" />
                <path d="M78 84h46" />
                <path d="M78 106h76" />
                <circle cx="62" cy="62" r="3" />
                <circle cx="62" cy="84" r="3" />
                <circle cx="62" cy="106" r="3" />
              </template>
              <template v-else-if="item.visual === 'builders'">
                <path d="M64 102 112 54l28 28-48 48H64v-28Z" />
                <path d="M128 38l26 26" />
                <path d="M48 42h48" />
                <path d="M48 62h34" />
              </template>
              <template v-else-if="item.visual === 'analytics'">
                <path d="M54 118h116" />
                <path d="M70 108V76" />
                <path d="M102 108V54" />
                <path d="M134 108V88" />
                <path d="M166 108V38" />
              </template>
              <template v-else>
                <rect x="50" y="36" width="48" height="40" rx="12" />
                <rect x="122" y="36" width="48" height="40" rx="12" />
                <rect x="86" y="94" width="48" height="40" rx="12" />
                <path d="M98 56h24" />
                <path d="M74 76v18h36" />
                <path d="M146 76v18h-36" />
              </template>
            </svg>
          </div>

          <div class="feature-copy">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>

          <div class="feature-mini-ui" :class="`feature-mini-ui-${item.visual}`" aria-hidden="true">
            <template v-if="item.visual === 'scenarios'">
              <div class="mini-toolbar">
                <span></span><span></span><span></span>
              </div>
              <div class="mini-list">
                <b>Microsoft 365</b>
                <p>Email -> landing -> lesson</p>
              </div>
              <div class="mini-list active">
                <b>HR bonus</b>
                <p>Email -> landing -> test</p>
              </div>
            </template>

            <template v-else-if="item.visual === 'attackTypes'">
              <div class="mini-segmented">
                <span class="active">Email</span>
                <span>QR</span>
                <span>SMS</span>
              </div>
              <div class="mini-tags">
                <span>Credential</span><span>Attachment</span><span>Social</span>
              </div>
            </template>

            <template v-else-if="item.visual === 'riskModel'">
              <div class="mini-score">
                <strong>72</strong>
                <span>Risk score</span>
              </div>
              <div class="mini-bars"><i style="--w: 84%"></i><i style="--w: 62%"></i><i style="--w: 38%"></i></div>
            </template>

            <template v-else-if="item.visual === 'annualPlan'">
              <div class="mini-calendar">
                <span>Jan</span><b></b><b class="accent"></b>
                <span>Feb</span><b></b><b></b>
                <span>Mar</span><b class="accent"></b><b></b>
              </div>
            </template>

            <template v-else-if="item.visual === 'learning'">
              <div class="mini-course">
                <b>Признаки фишинга</b>
                <i><span style="--w: 68%"></span></i>
                <p>7 min · test</p>
              </div>
            </template>

            <template v-else-if="item.visual === 'questions'">
              <div class="mini-test">
                <small>ТЕСТ</small>
                <b>Признаки фишинга?</b>
                <span class="active">A&nbsp;&nbsp;Ссылка с подозрительным доменом</span>
                <span>B&nbsp;&nbsp;Письмо от коллеги</span>
              </div>
            </template>

            <template v-else-if="item.visual === 'builders'">
              <div class="mini-builder">
                <span>Subject</span>
                <b>Обновите пароль Microsoft 365</b>
                <i></i>
                <p>Landing page · Lesson · Test</p>
              </div>
            </template>

            <template v-else-if="item.visual === 'analytics'">
              <div class="mini-chart">
                <span style="--h: 48%"></span>
                <span style="--h: 70%"></span>
                <span style="--h: 34%"></span>
                <span style="--h: 86%"></span>
              </div>
              <div class="mini-kpis"><b>5.6%</b><b>1.8%</b><b>48</b></div>
            </template>

            <template v-else>
              <div class="mini-integrations">
                <span>SIEM</span>
                <i></i>
                <span>HRIS</span>
                <i></i>
                <span>SSO</span>
              </div>
            </template>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
