document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

  // ---- Mobile nav ----
  function setMenu(open) {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      setMenu(!mainNav.classList.contains('open'));
    });

    // Close the menu after following a link (mobile)
    mainNav.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) setMenu(false);
    });
  }

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // ---- Light / dark theme ----
  function readStored() {
    try { return localStorage.getItem('site-theme'); } catch (e) { return null; }
  }

  function resolvedTheme() {
    const explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return prefersLight && prefersLight.matches ? 'light' : 'dark';
  }

  function syncToggle() {
    const current = resolvedTheme();
    root.setAttribute('data-theme-resolved', current);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = resolvedTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('site-theme', next); } catch (e) { /* storage unavailable */ }
      syncToggle();
    });
  }

  // Follow OS changes when the visitor hasn't picked a theme
  if (prefersLight && prefersLight.addEventListener) {
    prefersLight.addEventListener('change', function () {
      const stored = readStored();
      if (stored !== 'light' && stored !== 'dark') syncToggle();
    });
  }

  syncToggle();
});
