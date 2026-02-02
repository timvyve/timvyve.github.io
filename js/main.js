// Main JavaScript - Core functionality

// Theme management
(function() {
  'use strict';

  // Initialize theme from localStorage or default to light
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
      root.classList.add('dark');
      if (themeToggle) themeToggle.innerHTML = '☀️';
    } else {
      if (themeToggle) themeToggle.innerHTML = '🌙';
    }
  }

  // Toggle theme function
  function toggleTheme() {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const isDark = root.classList.contains('dark');
    
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeToggle) themeToggle.innerHTML = '🌙';
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeToggle) themeToggle.innerHTML = '☀️';
    }
  }

  // Set current year in footer
  function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Scroll progress indicator - disabled
  function initScrollProgress() {
    // No scroll progress bar
  }

  // Typewriter effect
  function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const text = "Hi, I'm ";
    const name = "Tim Vyverberg";
    const exclamation = "!";
    let index = 0;
    let phase = 0; // 0: text, 1: name, 2: exclamation

    function type() {
      if (phase === 0) {
        // Type "Hi, I'm "
        if (index < text.length) {
          typewriterElement.textContent += text.charAt(index);
          index++;
          setTimeout(type, 80);
        } else {
          phase = 1;
          index = 0;
          // Start name with gradient span
          const nameSpan = document.createElement('span');
          nameSpan.className = 'gradient-text';
          nameSpan.id = 'typewriter-name';
          typewriterElement.appendChild(nameSpan);
          setTimeout(type, 100);
        }
      } else if (phase === 1) {
        // Type name with gradient
        const nameSpan = document.getElementById('typewriter-name');
        if (index < name.length) {
          nameSpan.textContent += name.charAt(index);
          index++;
          setTimeout(type, 100);
        } else {
          phase = 2;
          index = 0;
          setTimeout(type, 150);
        }
      } else if (phase === 2) {
        // Type exclamation
        if (index < exclamation.length) {
          typewriterElement.appendChild(document.createTextNode(exclamation.charAt(index)));
          index++;
          setTimeout(type, 80);
        }
      }
    }

    // Start typing after a brief delay
    setTimeout(type, 300);
  }

  // Initialize everything when DOM is ready
  function init() {
    initTheme();
    setCurrentYear();
    initScrollProgress();
    initTypewriter();

    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Handle expandable details
    document.querySelectorAll('details').forEach(detail => {
      detail.addEventListener('toggle', function() {
        if (this.open) {
          // Close other details in the same container
          const siblings = this.parentElement.querySelectorAll('details');
          siblings.forEach(sibling => {
            if (sibling !== this && sibling.open) {
              sibling.open = false;
            }
          });
        }
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions globally for debugging
  window.app = {
    toggleTheme,
    setCurrentYear
  };
})();
