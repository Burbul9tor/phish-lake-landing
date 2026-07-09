<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
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
    { threshold: 0.18 },
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
    id="start"
    ref="sectionRef"
    class="how-section"
    :class="{ visible: isVisible }"
    aria-labelledby="how-it-works-title"
  >
    <div class="how-shell">
      <div class="how-heading">
        <h2 id="how-it-works-title">{{ content.title }}</h2>
        <p>{{ content.subtitle }}</p>
      </div>

      <div class="how-showcases">
        <article
          v-for="(step, index) in content.steps"
          :key="step.title"
          class="how-showcase"
          :style="{ '--step-index': index }"
        >
          <div class="how-showcase__copy">
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>

          <div class="how-showcase__screen">
            <div
              class="recreated-ui recreated-ui-onpage"
              :class="`recreated-ui-${step.visualType}`"
            >
              <template v-if="step.visualType === 'campaign'">
                <div class="recreated-stepper">
                  <span class="done">1</span>
                  <i></i>
                  <span class="active">2</span>
                  <i></i>
                  <span>3</span>
                  <i></i>
                  <span>4</span>
                </div>
                <div class="campaign-builder-ui">
                  <aside>
                    <button type="button" class="active">{{ content.recreated.campaign.tabs[0] }}</button>
                    <button type="button">{{ content.recreated.campaign.tabs[1] }}</button>
                    <button type="button">{{ content.recreated.campaign.tabs[2] }}</button>
                  </aside>
                  <div class="campaign-builder-ui__main">
                    <label>
                      {{ content.recreated.campaign.field }}
                      <input :value="content.recreated.campaign.value" readonly />
                    </label>
                    <div class="scenario-choice">
                      <b>{{ content.recreated.campaign.scenario }}</b>
                      <span>{{ content.recreated.campaign.chain }}</span>
                    </div>
                    <div class="template-choice">
                      <strong>{{ content.recreated.campaign.template }}</strong>
                      <p>{{ content.recreated.campaign.templateMeta }}</p>
                    </div>
                  </div>
                </div>
              </template>

              <template v-else-if="step.visualType === 'risk'">
                <div class="risk-ui-grid">
                  <div class="risk-ui-kpi">
                    <span>{{ content.recreated.risk.opened }}</span>
                    <strong>12.4%</strong>
                    <em>{{ content.recreated.risk.openedSub }}</em>
                  </div>
                  <div class="risk-ui-kpi">
                    <span>{{ content.recreated.risk.clicks }}</span>
                    <strong>5.6%</strong>
                    <em>{{ content.recreated.risk.clicksSub }}</em>
                  </div>
                  <div class="risk-ui-kpi alert">
                    <span>{{ content.recreated.risk.credentials }}</span>
                    <strong>1.8%</strong>
                    <em>{{ content.recreated.risk.credentialsSub }}</em>
                  </div>
                </div>
                <div class="risk-ui-events">
                  <div class="risk-ui-chart">
                    <span style="--h: 62%"></span>
                    <span style="--h: 48%"></span>
                    <span style="--h: 36%"></span>
                    <span style="--h: 28%"></span>
                  </div>
                  <ul>
                    <li><b>Елена С.</b><span>{{ content.recreated.risk.events[0] }}</span><em>+18 risk</em></li>
                    <li><b>Иван К.</b><span>{{ content.recreated.risk.events[1] }}</span><em>+42 risk</em></li>
                    <li><b>Мария Н.</b><span>{{ content.recreated.risk.events[2] }}</span><em>+6 risk</em></li>
                  </ul>
                </div>
              </template>

              <template v-else-if="step.visualType === 'training'">
                <div class="training-assignment-ui">
                  <div class="training-panel">
                    <h4>{{ content.recreated.training.title }}</h4>
                    <p>{{ content.recreated.training.desc }}</p>
                    <div class="lesson-card-mini">
                      <b>{{ content.recreated.training.lesson }}</b>
                      <span>{{ content.recreated.training.meta }}</span>
                    </div>
                  </div>
                  <div class="training-list">
                    <div><span></span><b>Алексей П.</b><em>{{ content.recreated.training.statuses[0] }}</em></div>
                    <div><span></span><b>Иван К.</b><em>{{ content.recreated.training.statuses[1] }}</em></div>
                    <div><span></span><b>Елена С.</b><em>{{ content.recreated.training.statuses[2] }}</em></div>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="report-ui">
                  <div class="report-ui-hero">
                    <span>{{ content.recreated.report.riskScore }}</span>
                    <strong>48 -> 31</strong>
                    <em>{{ content.recreated.report.reduction }}</em>
                  </div>
                  <div class="report-ui-chart">
                    <span style="--w: 88%"></span>
                    <span style="--w: 66%"></span>
                    <span style="--w: 44%"></span>
                    <span style="--w: 31%"></span>
                  </div>
                  <div class="report-ui-files">
                    <p>{{ content.recreated.report.files[0] }}</p>
                    <p>{{ content.recreated.report.files[1] }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="how-showcase__shade" aria-hidden="true"></div>
        </article>
      </div>
    </div>
  </section>
</template>
