/**
 * ============================================================
 * FLOW — Main Entry Point
 * ------------------------------------------------------------
 * 1. Injects shared header + footer into every page.
 * 2. Highlights the active nav link.
 * 3. Boots the Three.js background scene.
 * ============================================================
 */

import { initThreeScene } from './three-scene.js';

/* ---------- Shared markup (header + footer) ---------- */
const HEADER_HTML = `
  <header class="site-header">
    <a href="index.html" class="logo">
      <i class="fas fa-water"></i> FLOW
    </a>
    <nav class="nav-links">
      <a href="index.html" data-nav="home">Home</a>
      <a href="services.html" data-nav="services">Services</a>
      <a href="about.html" data-nav="about">About</a>
      <a href="contact.html" data-nav="contact">Contact</a>
    </nav>
    <a href="contact.html" class="btn btn-outline">
      <i class="fas fa-paper-plane"></i> Let's talk
    </a>
  </header>
`;

const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-links">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>

      <div class="footer-social">
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="#" aria-label="Dribbble"><i class="fab fa-dribbble"></i></a>
      </div>

      <p style="margin-bottom:0.5rem;">
        <a href="mailto:hello@flow.digital" style="color:#cdd9ff; text-decoration:none;">
          hello@flow.digital
        </a>
      </p>
      <p>© 2025 FLOW digital solutions. All rights reserved.</p>
    </div>
  </footer>
`;

/* ---------- Inject header + footer ---------- */
function injectSharedLayout() {
  document.querySelectorAll('[data-include="header"]').forEach((el) => {
    el.outerHTML = HEADER_HTML;
  });

  document.querySelectorAll('[data-include="footer"]').forEach((el) => {
    el.outerHTML = FOOTER_HTML;
  });
}

/* ---------- Highlight active nav link ---------- */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'home',
    '': 'home',
    'services.html': 'services',
    'about.html': 'about',
    'contact.html': 'contact',
  };
  const active = map[path];
  if (!active) return;

  document
    .querySelectorAll(`.nav-links a[data-nav="${active}"]`)
    .forEach((a) => a.classList.add('active'));
}

/* ---------- Boot ---------- */
injectSharedLayout();
setActiveNav();
initThreeScene();
