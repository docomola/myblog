import Lenis from 'lenis';

let lenis = null;
let rafId = null;

function startLenis() {
  // Don't start if already running
  if (lenis) return;

  lenis = new Lenis({
    duration: 3.105,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.51,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

function stopLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

// Start on initial load
startLenis();

// Astro View Transitions: destroy before swap, re-create after swap
document.addEventListener('astro:before-swap', stopLenis);
document.addEventListener('astro:after-swap', startLenis);
