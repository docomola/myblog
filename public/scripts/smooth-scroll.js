// Smooth scroll with damping effect
(function() {
  'use strict';

  const scroll = {
    current: 0,
    target: 0,
    ease: 0.08,
    rafId: null,
  };

  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  function update() {
    scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
    scroll.current = Math.abs(scroll.target - scroll.current) < 0.05
      ? scroll.target
      : scroll.current;

    window.scrollTo(0, scroll.current);
    scroll.rafId = requestAnimationFrame(update);
  }

  function onScroll() {
    scroll.target = window.scrollY;
  }

  // Only enable on desktop (not mobile where native momentum scroll is better)
  if (window.matchMedia('(min-width: 769px)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    window.addEventListener('scroll', onScroll, { passive: true });
    scroll.target = window.scrollY;
    scroll.current = window.scrollY;
    scroll.rafId = requestAnimationFrame(update);
  }
})();
