<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasRef = ref(null);

let animationFrame = 0;
let context = null;
let width = 0;
let height = 0;
let dpr = 1;
let events = [];
let reducedMotion = false;

const pointer = {
  x: 0.5,
  y: 0.42,
  targetX: 0.5,
  targetY: 0.42,
};

const random = (() => {
  let seed = 91;
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
})();

const sender = { x: 0.5, y: 0.76 };
const landing = { x: 0.78, y: 0.24 };

const employeeNodes = [
  { x: 0.12, y: 0.24, risk: 0.12 },
  { x: 0.22, y: 0.16, risk: 0.28 },
  { x: 0.31, y: 0.38, risk: 0.18 },
  { x: 0.42, y: 0.14, risk: 0.54 },
  { x: 0.52, y: 0.34, risk: 0.2 },
  { x: 0.62, y: 0.18, risk: 0.66 },
  { x: 0.7, y: 0.42, risk: 0.32 },
  { x: 0.84, y: 0.3, risk: 0.78 },
  { x: 0.91, y: 0.48, risk: 0.24 },
  { x: 0.18, y: 0.58, risk: 0.44 },
  { x: 0.46, y: 0.56, risk: 0.16 },
  { x: 0.74, y: 0.62, risk: 0.58 },
  { x: 0.36, y: 0.72, risk: 0.36 },
  { x: 0.6, y: 0.68, risk: 0.48 },
];

const buildEvents = () => {
  events = employeeNodes.map((node, index) => ({
    node,
    index,
    phase: random(),
    speed: 0.035 + random() * 0.035,
    clickDelay: random(),
    wobble: (random() - 0.5) * 0.035,
  }));
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = Math.max(1, Math.floor(rect.width));
  height = Math.max(1, Math.floor(rect.height));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  context = canvas.getContext('2d');

  if (context) {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
};

const updatePointer = (event) => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  pointer.targetX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  pointer.targetY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
};

const point = ({ x, y }) => ({
  x: x * width,
  y: y * height,
});

const mix = (a, b, t) => a + (b - a) * t;

const drawEnvelope = (x, y, size, alpha, color = 'rgba(74, 145, 255') => {
  const w = size * 1.38;
  const h = size;

  context.save();
  context.translate(x, y);
  context.lineWidth = 1;
  context.strokeStyle = `${color}, ${alpha})`;
  context.fillStyle = `rgba(11, 14, 18, ${alpha * 0.42})`;
  context.beginPath();
  context.roundRect(-w / 2, -h / 2, w, h, 3);
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(-w / 2, -h / 2 + 2);
  context.lineTo(0, h * 0.1);
  context.lineTo(w / 2, -h / 2 + 2);
  context.moveTo(-w / 2, h / 2 - 2);
  context.lineTo(-w * 0.06, h * 0.04);
  context.moveTo(w / 2, h / 2 - 2);
  context.lineTo(w * 0.06, h * 0.04);
  context.stroke();
  context.restore();
};

const drawRiskCursor = () => {
  const x = pointer.x * width;
  const y = pointer.y * height;
  const glow = context.createRadialGradient(x, y, 0, x, y, width * 0.16);
  glow.addColorStop(0, 'rgba(82, 148, 255, 0.12)');
  glow.addColorStop(0.42, 'rgba(82, 148, 255, 0.038)');
  glow.addColorStop(1, 'rgba(82, 148, 255, 0)');

  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  context.beginPath();
  context.arc(x, y, 9, 0, Math.PI * 2);
  context.strokeStyle = 'rgba(116, 171, 255, 0.5)';
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  context.arc(x, y, 2.5, 0, Math.PI * 2);
  context.fillStyle = 'rgba(116, 171, 255, 0.68)';
  context.fill();
};

const drawNode = (node, elapsed, index) => {
  const nodePoint = point(node);
  const pointerDistance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
  const proximity = Math.max(0, 1 - pointerDistance / 0.34);
  const isRisk = node.risk > 0.5;
  const pulse = reducedMotion ? 0.5 : (Math.sin(elapsed * 1.7 + index) + 1) / 2;
  const radius = 3.6 + proximity * 3 + pulse * 0.9;

  context.beginPath();
  context.arc(nodePoint.x, nodePoint.y, radius + 7, 0, Math.PI * 2);
  context.fillStyle = isRisk
    ? `rgba(255, 75, 22, ${0.035 + proximity * 0.09})`
    : `rgba(74, 145, 255, ${0.04 + proximity * 0.09})`;
  context.fill();

  context.beginPath();
  context.arc(nodePoint.x, nodePoint.y, radius, 0, Math.PI * 2);
  context.fillStyle = isRisk
    ? `rgba(255, 95, 52, ${0.48 + proximity * 0.34})`
    : `rgba(102, 164, 255, ${0.42 + proximity * 0.36})`;
  context.fill();

  drawEnvelope(
    nodePoint.x,
    nodePoint.y - 16 - proximity * 4,
    10,
    0.11 + proximity * 0.2 + node.risk * 0.08,
    isRisk ? 'rgba(255, 105, 62' : 'rgba(104, 164, 255',
  );
};

const drawCampaignLine = (from, to, alpha, color, bend = 0) => {
  const start = point(from);
  const end = point(to);
  const midX = (start.x + end.x) / 2 + bend * width;
  const midY = (start.y + end.y) / 2 - height * 0.08;

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.quadraticCurveTo(midX, midY, end.x, end.y);
  context.strokeStyle = color.replace('ALPHA', alpha.toFixed(3));
  context.lineWidth = 1;
  context.stroke();
};

const drawMovingPacket = (event, elapsed) => {
  const node = event.node;
  const start = point(sender);
  const end = point(node);
  const t = reducedMotion ? 0.58 : (event.phase + elapsed * event.speed) % 1;
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  const x = mix(start.x, end.x, eased) + Math.sin(eased * Math.PI) * event.wobble * width;
  const y = mix(start.y, end.y, eased) - Math.sin(eased * Math.PI) * height * 0.08;
  const alpha = 0.18 + (1 - Math.abs(0.5 - t) * 2) * 0.36;

  drawEnvelope(x, y, 9, alpha, node.risk > 0.5 ? 'rgba(255, 105, 62' : 'rgba(104, 164, 255');

  if (node.risk > 0.5) {
    const clickProgress = reducedMotion ? 0.42 : (event.clickDelay + elapsed * (event.speed * 0.72)) % 1;
    const nodePoint = point(node);
    const landPoint = point(landing);
    const clickX = mix(nodePoint.x, landPoint.x, clickProgress);
    const clickY = mix(nodePoint.y, landPoint.y, clickProgress) - Math.sin(clickProgress * Math.PI) * height * 0.04;

    context.beginPath();
    context.arc(clickX, clickY, 1.8 + node.risk * 1.6, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 75, 22, ${0.18 + node.risk * 0.22})`;
    context.fill();
  }
};

const draw = (time = 0) => {
  if (!context) {
    return;
  }

  const elapsed = time * 0.001;
  pointer.x += (pointer.targetX - pointer.x) * 0.06;
  pointer.y += (pointer.targetY - pointer.y) * 0.06;

  context.clearRect(0, 0, width, height);

  const baseGlow = context.createRadialGradient(width * 0.5, height * 0.52, 0, width * 0.5, height * 0.52, width * 0.58);
  baseGlow.addColorStop(0, 'rgba(82, 148, 255, 0.095)');
  baseGlow.addColorStop(0.36, 'rgba(64, 126, 206, 0.07)');
  baseGlow.addColorStop(1, 'rgba(11, 11, 12, 0)');
  context.fillStyle = baseGlow;
  context.fillRect(0, 0, width, height);

  drawRiskCursor();

  const senderPoint = point(sender);
  const landingPoint = point(landing);

  events.forEach((event) => {
    const color = event.node.risk > 0.5
      ? 'rgba(255, 91, 45, ALPHA)'
      : 'rgba(111, 173, 255, ALPHA)';
    drawCampaignLine(sender, event.node, 0.075 + event.node.risk * 0.1, color, event.wobble);
  });

  events
    .filter((event) => event.node.risk > 0.5)
    .forEach((event) => {
      drawCampaignLine(event.node, landing, 0.11 + event.node.risk * 0.12, 'rgba(255, 75, 22, ALPHA)', event.wobble * -0.6);
    });

  context.beginPath();
  context.arc(senderPoint.x, senderPoint.y, 18, 0, Math.PI * 2);
  context.fillStyle = 'rgba(82, 148, 255, 0.07)';
  context.fill();
  context.beginPath();
  context.arc(senderPoint.x, senderPoint.y, 4.5, 0, Math.PI * 2);
  context.fillStyle = 'rgba(116, 171, 255, 0.56)';
  context.fill();
  drawEnvelope(senderPoint.x, senderPoint.y - 22, 18, 0.34, 'rgba(116, 171, 255');

  context.beginPath();
  context.roundRect(landingPoint.x - 30, landingPoint.y - 19, 60, 38, 7);
  context.strokeStyle = 'rgba(255, 75, 22, 0.26)';
  context.fillStyle = 'rgba(255, 75, 22, 0.055)';
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(landingPoint.x - 17, landingPoint.y - 3);
  context.lineTo(landingPoint.x + 17, landingPoint.y - 3);
  context.moveTo(landingPoint.x - 17, landingPoint.y + 8);
  context.lineTo(landingPoint.x + 9, landingPoint.y + 8);
  context.strokeStyle = 'rgba(255, 128, 84, 0.18)';
  context.stroke();

  events.forEach((event) => {
    drawMovingPacket(event, elapsed);
    drawNode(event.node, elapsed, event.index);
  });

  if (!reducedMotion) {
    animationFrame = window.requestAnimationFrame(draw);
  }
};

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  buildEvents();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('pointermove', updatePointer);
  draw();
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('pointermove', updatePointer);
});
</script>

<template>
  <canvas ref="canvasRef" class="cursor-signal-field" aria-hidden="true"></canvas>
</template>
