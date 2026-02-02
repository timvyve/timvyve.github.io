// Scroll Animations - Disabled for immediate page load
// Elements are visible by default, only hover effects remain

(function() {
  'use strict';

  // All elements are now visible immediately on page load
  // No scroll-triggered animations

  // Add magnetic effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // 3D Tilt effect for hero image (hover only, not scroll)
  const heroImage = document.querySelector('.hero-img');
  if (heroImage && !window.matchMedia('(pointer: coarse)').matches) {
    const heroContainer = heroImage.parentElement;
    
    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroContainer.addEventListener('mouseleave', () => {
      heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  }
})();
