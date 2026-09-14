/**
 * ============================================================
 * FLOW — Main Entry Point
 * ------------------------------------------------------------
 * Imports the 3D scene initializer and wires up global
 * page interactions (smooth scrolling, pointer-events fallback).
 * ============================================================
 */

import { initThreeScene } from './three-scene.js';

/* ---------- Boot the 3D background ---------- */
initThreeScene();

/* ---------- Smooth scrolling for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Fallback: ensure interactive elements are clickable ---------- */
document
  .querySelectorAll(
    '.content a, .content button, .content .btn, .content .service-card, .content .glow-card'
  )
  .forEach((el) => {
    el.style.pointerEvents = 'auto';
  });
