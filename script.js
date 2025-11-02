document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Mobile nav toggle
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked (mobile)
    mainNav.addEventListener('click', function (ev) {
      const target = ev.target.closest('a');
      if (!target) return;
      if (window.innerWidth < 850) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme cycling: default -> alt1 -> alt2 -> default
  const themes = ['', 'theme-alt1', 'theme-alt2'];
  function applyTheme(name) {
    // remove known theme classes
    themes.forEach(t => { if (t) body.classList.remove(t); });
    if (name) body.classList.add(name);
    localStorage.setItem('site-theme', name || '');
  }

  // Load stored theme
  const stored = localStorage.getItem('site-theme') || '';
  if (stored) applyTheme(stored);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      // find index of current theme
      const current = themes.findIndex(t => t && body.classList.contains(t));
      const nextIndex = (current + 1) % themes.length;
      applyTheme(themes[nextIndex]);
    });
  }

  // Accessibility: close nav on Escape
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
