// Modal System
// Handles all modal interactions

(function() {
  'use strict';

  class ModalManager {
    constructor() {
      this.modals = new Map();
      this.activeModal = null;
      this.bindEvents();
    }

    bindEvents() {
      // Close modal on overlay click
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
          this.close(e.target.dataset.modalId);
        }
      });

      // Close on close button click (X button or Close button)
      document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.modal-close, .modal-close-btn');
        if (closeBtn) {
          const modal = closeBtn.closest('.modal-overlay');
          if (modal) this.close(modal.dataset.modalId);
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close(this.activeModal);
        }
      });

      // Modal trigger buttons
      document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalId = trigger.dataset.modalTrigger;
          this.open(modalId);
        });
      });
    }

    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      // Close any currently open modal
      if (this.activeModal && this.activeModal !== modalId) {
        this.close(this.activeModal);
      }

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      this.activeModal = modalId;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus management
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();

      // Trigger animation
      setTimeout(() => {
        modal.querySelector('.modal')?.classList.add('animate-scale-in');
      }, 10);
    }

    close(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      
      if (this.activeModal === modalId) {
        this.activeModal = null;
      }

      // Restore body scroll
      document.body.style.overflow = '';

      // Return focus to trigger button if exists
      const trigger = document.querySelector(`[data-modal-trigger="${modalId}"]`);
      if (trigger) trigger.focus();
    }

    // Open resume in modal
    openResume() {
      this.open('resume-modal');
    }

    // Open contact form
    openContact() {
      this.open('contact-modal');
    }

    // Open coursework details
    openCoursework(courseId) {
      const modalId = `course-${courseId}-modal`;
      this.open(modalId);
    }

    // Open learning details
    openLearning(learningId) {
      const modalId = `learning-${learningId}-modal`;
      this.open(modalId);
    }
  }

  // Initialize modal manager
  let modalManager;
  
  function initModals() {
    modalManager = new ModalManager();
    window.modalManager = modalManager;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }

  // Handle contact form submission
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
      e.preventDefault();
      
      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate sending (replace with actual form submission)
      setTimeout(() => {
        submitBtn.textContent = 'Sent!';
        submitBtn.classList.add('btn-primary');
        
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('btn-primary');
          
          // Close modal
          if (window.modalManager) {
            window.modalManager.close('contact-modal');
          }
        }, 1500);
      }, 1000);
    }
  });
})();
