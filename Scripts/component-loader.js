/* ─── COMPONENT LOADER ─── */

/**
 * Load and inject HTML components into the page
 * @param {string} componentPath - Path to the component file
 * @param {string} targetSelector - CSS selector for target element
 * @returns {Promise<void>}
 */
async function loadComponent(componentPath, targetSelector) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${response.statusText}`);
    }
    const html = await response.text();
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.error(`Target element not found: ${targetSelector}`);
      return;
    }

    targetElement.innerHTML = html;
    console.log(`[Component Loader] ${componentPath} loaded successfully`);
  } catch (error) {
    console.error(`[Component Loader] Error loading ${componentPath}:`, error);
  }
}

/**
 * Load multiple components and wait for all to complete
 * @param {Array<{path: string, target: string}>} components - Array of component configs
 * @returns {Promise<void>}
 */
async function loadComponents(components) {
  try {
    await Promise.all(components.map((comp) => loadComponent(comp.path, comp.target)));
    console.log('[Component Loader] All components loaded');
  } catch (error) {
    console.error('[Component Loader] Error loading components:', error);
  }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadComponents([{ path: 'Components/navbar.html', target: '#navbar-container' }, { path: 'Components/footer.html', target: '#footer-container' }]);
  });
} else {
  loadComponents([
    { path: 'Components/navbar.html', target: '#navbar-container' },
    { path: 'Components/footer.html', target: '#footer-container' }
  ]);
}