import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent browser scroll restoration from conflicting with GSAP
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/**
 * Splits text nodes within an element into characters, preserving child elements and their classes.
 */
function splitChars(el, allChars, parentElement) {
  const walk = (node, parent) => {
    if (node.nodeType === 3) {
      const text = node.textContent;
      const frag = document.createDocumentFragment();
      for (const char of text) {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        span.textContent = char === ' ' ? '\u00A0' : char;
        // Inherit parent element's computed styles for text appearance
        if (parent && parent !== el) {
          const cs = getComputedStyle(parent);
          const hasGradient = cs.backgroundImage && cs.backgroundImage !== 'none';
          const hasClip = cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text';
          if (hasGradient && hasClip) {
            span.style.background = cs.backgroundImage;
            span.style.backgroundSize = cs.backgroundSize;
            span.style.backgroundClip = 'text';
            span.style.webkitBackgroundClip = 'text';
            span.style.webkitTextFillColor = 'transparent';
          }
          if (cs.fontWeight && cs.fontWeight !== '400') span.style.fontWeight = cs.fontWeight;
        }
        frag.appendChild(span);
      }
      node.replaceWith(frag);
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(child => walk(child, node));
    }
  };
  walk(el, null);

  // CSS fix: let parent gradient show through split chars
  const styleId = 'split-text-gradient-fix';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .hero-card-line2 .split-char,
      .intro-headline-gold .split-char {
        background: transparent !important;
        -webkit-text-fill-color: transparent;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Splits text into characters and animates them on scroll.
 * Preserves child element structure (br, inner spans, etc).
 */
export function splitTextAnimate(selector, options = {}) {
  const {
    delay = 50,
    duration = 1.25,
    ease = 'power3.out',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 }
  } = options;

  const els = document.querySelectorAll(selector);
  els.forEach(el => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';

    const allChars = [];
    splitChars(el, allChars);

    if (allChars.length === 0) return;

    gsap.fromTo(allChars, { ...from }, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=80',
        once: true
      }
    });
  });
}

let cleanup = null;

export function initSplitTexts() {
  splitTextAnimate('.intro-headline');
  splitTextAnimate('.section-deco');
  splitTextAnimate('.banner-headline');

  // Ensure page starts at top on direct load
  window.scrollTo(0, 0);
  ScrollTrigger.refresh(true);

  // Cleanup on nav
  cleanup = () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
  document.addEventListener('astro:before-swap', () => {
    if (cleanup) cleanup();
  });
}

export function destroySplitTexts() {
  if (cleanup) cleanup();
  cleanup = null;
}
