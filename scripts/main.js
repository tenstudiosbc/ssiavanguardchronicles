import { initElements } from './modules/elements.js';
import { initTheme } from './modules/themes.js';
import { initLoader } from './modules/loader.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initLoader();
  initElements();
  initTheme();
});
