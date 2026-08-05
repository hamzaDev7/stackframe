/* ==========================================================================
   Stackframe — Main JavaScript
   Handles: theme toggle (persisted), mobile navigation, footer year
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var THEME_KEY = 'stackframe-theme';
  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.getAttribute('data-open') === 'true';
      mainNav.setAttribute('data-open', String(!isOpen));
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) {
        mainNav.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const overlay = document.querySelector(".nav-overlay");

toggle.addEventListener("click", () => {
    const open = nav.dataset.open === "true";

    nav.dataset.open = !open;
    toggle.setAttribute("aria-expanded", !open);

    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    nav.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    overlay.classList.remove("active");
});
