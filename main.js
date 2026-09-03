// Tim Vyverberg — personal site interactions

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Copy email to clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyEmailLabel');
  if (copyBtn && copyLabel) {
    const originalLabel = copyLabel.textContent;
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        copyLabel.textContent = 'copied ✓';
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
      setTimeout(() => { copyLabel.textContent = originalLabel; }, 1800);
    });
  }

  // Modal handling
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal-trigger');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    const close = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelectorAll('.modal-close, .modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', close);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });
});
