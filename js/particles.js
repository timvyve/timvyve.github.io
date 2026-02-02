// Particle Background Effect
// Lightweight, subtle particle animation

(function() {
  'use strict';

  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouseX = 0;
      this.mouseY = 0;
      this.isActive = true;
      this.isTouch = window.matchMedia('(pointer: coarse)').matches;
      
      // Configuration
      this.config = {
        particleCount: this.isTouch ? 15 : 25, // Fewer particles on mobile
        connectionDistance: 120,
        maxConnections: 3,
        particleSpeed: 0.3,
        particleSize: 2,
        colors: {
          light: 'rgba(59, 130, 246, 0.4)', // Brand color
          dark: 'rgba(96, 165, 250, 0.3)'   // Dark mode brand color
        }
      };

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();
      this.bindEvents();
      this.animate();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * this.config.particleSpeed,
          vy: (Math.random() - 0.5) * this.config.particleSpeed,
          size: this.config.particleSize + Math.random() * 2
        });
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize(), { passive: true });
      
      // Mouse tracking (desktop only)
      if (!this.isTouch) {
        document.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
        }, { passive: true });
      }

      // Pause animation when tab is hidden
      document.addEventListener('visibilitychange', () => {
        this.isActive = document.visibilityState === 'visible';
        if (this.isActive) this.animate();
      });
    }

    isDarkMode() {
      return document.documentElement.classList.contains('dark');
    }

    update() {
      const width = this.canvas.width;
      const height = this.canvas.height;

      this.particles.forEach(particle => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Gentle mouse interaction (desktop only)
        if (!this.isTouch) {
          const dx = this.mouseX - particle.x;
          const dy = this.mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.02;
            particle.vx -= dx * force * 0.01;
            particle.vy -= dy * force * 0.01;
            
            // Limit velocity
            const maxVel = this.config.particleSpeed * 2;
            particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
            particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));
          }
        }
      });
    }

    draw() {
      const ctx = this.ctx;
      const width = this.canvas.width;
      const height = this.canvas.height;
      const isDark = this.isDarkMode();
      const color = isDark ? this.config.colors.dark : this.config.colors.light;

      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;

      for (let i = 0; i < this.particles.length; i++) {
        let connections = 0;
        
        for (let j = i + 1; j < this.particles.length; j++) {
          if (connections >= this.config.maxConnections) break;

          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.config.connectionDistance) {
            const opacity = (1 - distance / this.config.connectionDistance) * 0.5;
            ctx.strokeStyle = isDark 
              ? `rgba(96, 165, 250, ${opacity * 0.3})` 
              : `rgba(59, 130, 246, ${opacity * 0.4})`;
            
            ctx.beginPath();
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw particles
      ctx.fillStyle = color;
      this.particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    animate() {
      if (!this.isActive) return;
      
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }

    destroy() {
      this.isActive = false;
    }
  }

  // Initialize particle system when DOM is ready
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    // Don't initialize on very small screens
    if (window.innerWidth < 480) {
      canvas.style.display = 'none';
      return;
    }

    new ParticleSystem(canvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})();
