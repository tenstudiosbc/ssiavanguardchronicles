import { initElements } from './modules/elements.js';
import { initTheme } from './modules/themes.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initElements();
    initTheme();
    
    // Remove loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
    }, 1000);
});
