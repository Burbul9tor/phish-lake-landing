<script setup>
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const activeIndex = ref(0);
const hoveredIndex = ref(null);
let rotationTimer;
const rotationDuration = 4200;

const cards = [
  { id: 'metric', className: 'metric-widget' },
  { id: 'risk', className: 'risk-widget' },
  { id: 'improvement', className: 'improvement-widget' },
  { id: 'timeline', className: 'timeline-widget' },
];

const visibleIndex = computed(() => hoveredIndex.value ?? activeIndex.value);

const parseFormattedNumber = (value) => {
  const source = String(value);
  const match = source.match(/-?[\d\s,.]+/);

  if (!match) {
    return {
      decimals: 0,
      number: 0,
      prefix: '',
      suffix: source,
      useGrouping: false,
    };
  }

  const rawNumber = match[0];
  const normalized = rawNumber.replace(/\s/g, '').replace(',', '.');
  const decimalPart = normalized.split('.')[1] ?? '';

  return {
    decimals: decimalPart.length,
    number: Number.parseFloat(normalized) || 0,
    prefix: source.slice(0, match.index),
    suffix: source.slice(match.index + rawNumber.length),
    useGrouping: /[\s,]/.test(rawNumber.replace(/[,.]\d+$/, '')),
  };
};

const formatCountValue = (value, parsed) => {
  const fixed = value.toFixed(parsed.decimals);
  const [integer, decimals] = fixed.split('.');
  const grouped = parsed.useGrouping ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : integer;

  return `${parsed.prefix}${grouped}${decimals ? `.${decimals}` : ''}${parsed.suffix}`;
};

const CountUpNumber = defineComponent({
  name: 'CountUpNumber',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const displayValue = ref('');
    let frameId = 0;

    const run = () => {
      window.cancelAnimationFrame(frameId);

      const parsed = parseFormattedNumber(props.value);
      const duration = 860;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        displayValue.value = formatCountValue(parsed.number * eased, parsed);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      displayValue.value = formatCountValue(0, parsed);
      frameId = window.requestAnimationFrame(tick);
    };

    onMounted(run);
    watch(() => props.value, run);

    onBeforeUnmount(() => {
      window.cancelAnimationFrame(frameId);
    });

    return () => h('span', displayValue.value);
  },
});

onMounted(() => {
  rotationTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % cards.length;
  }, rotationDuration);
});

onBeforeUnmount(() => {
  window.clearInterval(rotationTimer);
});
</script>

<template>
  <div class="interface-showcase" :aria-label="content.ariaLabel">
    <button
      v-for="(card, index) in cards"
      :key="card.id"
      class="floating-widget"
      :class="[card.className, { active: visibleIndex === index }]"
      type="button"
      @focus="activeIndex = index"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      <template v-if="card.id === 'metric'">
        <div class="metric-icon" aria-hidden="true">↕</div>
        <div>
          <span class="muted-label">{{ content.metric.label }}</span>
          <strong :key="`metric-value-${visibleIndex}`" class="metric-value">
            <CountUpNumber :value="content.metric.value" />
          </strong>
          <small class="positive">↗ ↑ {{ content.metric.delta }}</small>
          <p>{{ content.metric.count }}</p>
        </div>
      </template>

      <template v-if="card.id === 'risk'">
        <h3>{{ content.risk.title }}</h3>
        <div class="risk-donut">
          <div class="donut-core">
            <strong :key="`risk-total-${visibleIndex}`">
              <CountUpNumber :value="content.risk.total" />
            </strong>
            <span>{{ content.risk.unit }}</span>
          </div>
        </div>
        <ul class="risk-legend">
          <li v-for="item in content.risk.items" :key="item.label">
            <i :class="item.color"></i>
            <b>{{ item.label }}</b>
            <span>{{ item.range }}</span>
            <strong :key="`${item.label}-${visibleIndex}`">
              <CountUpNumber :value="item.value" />
            </strong>
            <em>{{ item.percent }}</em>
          </li>
        </ul>
      </template>

      <template v-if="card.id === 'improvement'">
        <header>
          <h3>{{ content.improvement.title }}</h3>
          <span class="trend-icon">↗</span>
        </header>
        <div class="improvement-row">
          <span>{{ content.improvement.reduced.label }}</span>
          <strong :key="`reduced-${visibleIndex}`">
            <CountUpNumber :value="content.improvement.reduced.value" />
          </strong>
          <em class="positive">↑ {{ content.improvement.reduced.delta }}</em>
        </div>
        <div class="improvement-row">
          <span>{{ content.improvement.same.label }}</span>
          <strong :key="`same-${visibleIndex}`">
            <CountUpNumber :value="content.improvement.same.value" />
          </strong>
          <em>—</em>
        </div>
        <div class="improvement-row">
          <span>{{ content.improvement.increased.label }}</span>
          <strong :key="`increased-${visibleIndex}`">
            <CountUpNumber :value="content.improvement.increased.value" />
          </strong>
          <em class="negative">↑ {{ content.improvement.increased.delta }}</em>
        </div>
        <a href="#how" tabindex="-1">{{ content.improvement.more }} →</a>
      </template>

      <template v-if="card.id === 'timeline'">
        <header>
          <h3>{{ content.timeline.title }}</h3>
          <div class="timeline-legend">
            <span v-for="item in content.timeline.legend" :key="item.label">
              <i :class="item.color"></i>{{ item.label }}
            </span>
          </div>
        </header>
        <div class="timeline-chart" aria-hidden="true">
          <div class="risk-area"></div>
          <svg viewBox="0 0 760 230" role="img">
            <polyline class="target-line" points="20,48 90,56 160,66 230,82 300,96 370,116 440,132 510,146 580,158 650,190 740,222" />
            <polyline class="fact-line" points="20,48 90,52 160,60 230,76 300,88 370,110 440,124 510,138 580,150" />
            <g class="fact-points">
              <circle cx="20" cy="48" r="7" />
              <circle cx="90" cy="52" r="7" />
              <circle cx="160" cy="60" r="7" />
              <circle cx="230" cy="76" r="7" />
              <circle cx="300" cy="88" r="7" />
              <circle cx="370" cy="110" r="7" />
              <circle cx="440" cy="124" r="7" />
              <circle cx="510" cy="138" r="7" />
              <circle cx="580" cy="150" r="7" />
            </g>
          </svg>
          <div class="month-row">
            <span v-for="month in content.timeline.months" :key="month">{{ month }}</span>
          </div>
        </div>
      </template>
    </button>

    <div class="widget-timer" aria-hidden="true">
      <span
        v-for="(card, index) in cards"
        :key="`${card.id}-${visibleIndex}`"
        :class="{ active: visibleIndex === index }"
      ></span>
    </div>
  </div>
</template>
