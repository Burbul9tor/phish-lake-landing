<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasRef = ref(null);

let animationFrame = 0;
let context = null;
let width = 0;
let height = 0;
let dpr = 1;
let rays = [];
let reducedMotion = false;

const pointer = {
  x: 0.5,
  y: 0.52,
  targetX: 0.5,
  targetY: 0.52,
};

const random = (() => {
  let seed = 42;
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
})();

const buildRays = () => {
  rays = Array.from({ length: 118 }, (_, index) => {
    const spread = random();
    const side = random() > 0.5 ? 1 : -1;

    return {
      index,
      endX: 0.5 + side * (0.04 + spread * 0.43),
      endY: 0.05 + random() * 0.66,
      baseX: 0.45 + random() * 0.1,
      baseY: 0.98 + random() * 0.04,
      alpha: 0.12 + random() * 0.32,
      width: 0.45 + random() * 1.05,
      dot: 1.7 + random() * 3.6,
      phase: random() * Math.PI * 2,
      speed: 0.34 + random() * 0.72,
      depth: 0.28 + random() * 1,
      bend: (random() - 0.5) * 0.18,
    };
  });
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
  pointer.targetX = (event.clientX - rect.left) / rect.width;
  pointer.targetY = (event.clientY - rect.top) / rect.height;
  pointer.targetX = Math.max(0, Math.min(1, pointer.targetX));
  pointer.targetY = Math.max(0, Math.min(1, pointer.targetY));
};

const draw = (time = 0) => {
  if (!context) {
    return;
  }

  const elapsed = time * 0.001;
  pointer.x += (pointer.targetX - pointer.x) * 0.055;
  pointer.y += (pointer.targetY - pointer.y) * 0.055;

  context.clearRect(0, 0, width, height);

  const baseShiftX = (pointer.x - 0.5) * 46;
  const baseShiftY = (pointer.y - 0.5) * 18;
  const baseGlow = context.createRadialGradient(width * 0.5, height * 0.98, 0, width * 0.5, height * 0.98, width * 0.42);
  baseGlow.addColorStop(0, 'rgba(255, 75, 22, 0.2)');
  baseGlow.addColorStop(0.36, 'rgba(60, 139, 255, 0.12)');
  baseGlow.addColorStop(1, 'rgba(11, 11, 12, 0)');
  context.fillStyle = baseGlow;
  context.fillRect(0, 0, width, height);

  rays.forEach((ray) => {
    const pulse = reducedMotion ? 0.5 : (Math.sin(elapsed * ray.speed + ray.phase) + 1) / 2;
    const parallaxX = (pointer.x - 0.5) * 92 * ray.depth;
    const parallaxY = (pointer.y - 0.5) * 44 * ray.depth;
    const startX = ray.baseX * width + baseShiftX * ray.depth;
    const startY = ray.baseY * height + baseShiftY;
    const endX = ray.endX * width + parallaxX;
    const endY = ray.endY * height + parallaxY;
    const midX = (startX + endX) / 2 + ray.bend * width * (pointer.x - 0.5);
    const midY = (startY + endY) / 2 - (0.04 + ray.depth * 0.03) * height;
    const alpha = ray.alpha * (0.58 + pulse * 0.42);

    context.beginPath();
    context.moveTo(startX, startY);
    context.quadraticCurveTo(midX, midY, endX, endY);
    context.strokeStyle = `rgba(88, 155, 255, ${alpha})`;
    context.lineWidth = ray.width;
    context.stroke();

    context.beginPath();
    context.arc(endX, endY, ray.dot * (0.78 + pulse * 0.22), 0, Math.PI * 2);
    context.fillStyle = `rgba(74, 145, 255, ${Math.min(0.74, alpha + 0.12)})`;
    context.fill();

    if (ray.index % 4 === 0) {
      const travel = reducedMotion ? 0.58 : (elapsed * (0.08 + ray.depth * 0.06) + ray.phase) % 1;
      const dotX = startX + (endX - startX) * travel;
      const dotY = startY + (endY - startY) * travel;
      context.beginPath();
      context.arc(dotX, dotY, 1.2 + ray.depth * 1.2, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 92, 42, ${0.16 + alpha * 0.34})`;
      context.fill();
    }
  });

  if (!reducedMotion) {
    animationFrame = window.requestAnimationFrame(draw);
  }
};

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  buildRays();
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
