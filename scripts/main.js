import { initElements } from './modules/elements.js';
import { initTheme } from './modules/themes.js';
import { initLoader } from './modules/loader.js';
import { initCharacters } from './modules/characters.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initLoader();
  initElements();
  initTheme();
  initCharacters();
});
