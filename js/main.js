import { initTheme } from './modules/theme.js';
import { initNav } from './modules/nav.js';
import { initElements } from './modules/elements.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initTheme();
  initNav();
  initElements();
  
  // Remove loader
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }, 1000);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
