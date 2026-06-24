import Lenis from 'lenis';

let lenis = null;
let rafId = null;

function startLenis() {
  if (lenis) return;

  lenis = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 2,
    smoothTouch: true,
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

startLenis();

document.addEventListener('astro:before-swap', stopLenis);
document.addEventListener('astro:after-swap', startLenis);
