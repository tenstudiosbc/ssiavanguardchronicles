/* ─── DYNAMIC COMPONENT LOADER ───
   Works with GitHub Pages project sites, custom domains, root pages, /Pages/ pages,
   and future components without editing this file.

   Correct structure for your repo:
   /
   ├─ Components/
   ├─ Pages/
   ├─ Scripts/
   │  └─ components-loader.js
   └─ index.html
*/

(() => {
  'use strict';

  const CONFIG = {
    componentsFolder: 'Components',
    scriptsFolder: 'Scripts',
    containerSuffix: '-container',
    componentExtension: '.html',
    autoLoadSelector: '[data-component], [id$="-container"]',
    skipAutoAttribute: 'data-component-auto'
  };

  /**
   * Finds the website root from the script URL.
   *
   * GitHub Pages project site:
   * https://tenstudiosbc.github.io/ssiavanguardchronicles/Scripts/components-loader.js
   * root = https://tenstudiosbc.github.io/ssiavanguardchronicles/
   *
   * Custom domain:
   * https://ssiavc.tenstudiosbc.my.id/Scripts/components-loader.js
   * root = https://ssiavc.tenstudiosbc.my.id/
   */
  function getSiteRootURL() {
    const script =
      document.currentScript ||
      document.querySelector('script[src*="components-loader"]');

    if (script && script.src) {
      const scriptURL = new URL(script.src, window.location.href);
      const marker = `/${CONFIG.scriptsFolder}/`;

      if (scriptURL.pathname.includes(marker)) {
        const rootPath = scriptURL.pathname.split(marker)[0] + '/';
        return new URL(rootPath, scriptURL.origin);
      }

      return new URL('./', scriptURL);
    }

    const path = window.location.pathname;

    if (path.includes('/Pages/')) {
      return new URL('../', window.location.href);
    }

    return new URL('./', window.location.href);
  }

  function getComponentsBaseURL() {
    return new URL(`${CONFIG.componentsFolder}/`, getSiteRootURL());
  }

  function normalizeComponentName(name) {
    return String(name || '')
      .trim()
      .replace(/^\/+/, '')
      .replace(/^(\.\.\/)+/, '')
      .replace(/^(\.\/)+/, '')
      .replace(/\.html$/i, '');
  }

  function getComponentNameFromElement(element) {
    const fromData = element.getAttribute('data-component');
    if (fromData) return normalizeComponentName(fromData);

    const id = element.id || '';
    if (id.endsWith(CONFIG.containerSuffix)) {
      return normalizeComponentName(id.slice(0, -CONFIG.containerSuffix.length));
    }

    return '';
  }

  function getComponentURL(componentName) {
    const cleanName = normalizeComponentName(componentName);
    return new URL(`${cleanName}${CONFIG.componentExtension}`, getComponentsBaseURL());
  }

  function shouldSkipURL(value) {
    if (!value) return true;

    const trimmed = value.trim();

    return (
      trimmed === '' ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:') ||
      trimmed.startsWith('javascript:') ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:')
    );
  }

  /**
   * Fix links/assets inside components.
   *
   * Example inside Components/navbar.html:
   * href="Pages/characters.html"
   *
   * On GitHub Pages project site becomes:
   * /ssiavanguardchronicles/Pages/characters.html
   *
   * On custom domain becomes:
   * /Pages/characters.html
   */
  function fixComponentURLs(container) {
    const siteRoot = getSiteRootURL();

    const attributes = [
      ['a', 'href'],
      ['img', 'src'],
      ['script', 'src'],
      ['link', 'href'],
      ['source', 'src'],
      ['video', 'src'],
      ['video', 'poster'],
      ['audio', 'src']
    ];

    attributes.forEach(([selector, attribute]) => {
      container.querySelectorAll(`${selector}[${attribute}]`).forEach((element) => {
        const rawValue = element.getAttribute(attribute);
        if (shouldSkipURL(rawValue)) return;

        const cleanValue = rawValue
          .replace(/^(\.\.\/)+/, '')
          .replace(/^(\.\/)+/, '');

        const fixedURL = new URL(cleanValue, siteRoot);

        // Keep links as path-relative to the current domain/repo.
        element.setAttribute(attribute, fixedURL.pathname + fixedURL.search + fixedURL.hash);
      });
    });
  }

  /**
   * Scripts inserted through innerHTML do not run automatically,
   * so this re-inserts them safely.
   */
  function runInjectedScripts(container) {
    container.querySelectorAll('script').forEach((oldScript) => {
      const newScript = document.createElement('script');

      [...oldScript.attributes].forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }

  async function loadComponent(componentName, targetElement) {
    const cleanName = normalizeComponentName(componentName);

    if (!cleanName || !targetElement) {
      console.warn('[Component Loader] Missing component name or target element.');
      return;
    }

    const componentURL = getComponentURL(cleanName);

    try {
      targetElement.setAttribute('data-component-loading', cleanName);

      const response = await fetch(componentURL, { cache: 'no-cache' });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const html = await response.text();

      targetElement.innerHTML = html;
      fixComponentURLs(targetElement);
      runInjectedScripts(targetElement);

      targetElement.removeAttribute('data-component-loading');
      targetElement.removeAttribute('data-component-error');
      targetElement.setAttribute('data-component-loaded', cleanName);

      document.dispatchEvent(new CustomEvent('componentLoaded', {
        detail: {
          component: cleanName,
          url: componentURL.href,
          target: targetElement
        }
      }));

      console.log(`[Component Loader] Loaded: ${cleanName}`);
    } catch (error) {
      targetElement.removeAttribute('data-component-loading');
      targetElement.setAttribute('data-component-error', cleanName);

      console.error(`[Component Loader] Failed to load ${cleanName} from ${componentURL.href}:`, error);
    }
  }

  async function loadAllComponents(root = document) {
    const elements = [...root.querySelectorAll(CONFIG.autoLoadSelector)]
      .filter((element) => element.getAttribute(CONFIG.skipAutoAttribute) !== 'false')
      .filter((element) => !element.hasAttribute('data-component-loaded'))
      .filter((element) => !element.hasAttribute('data-component-loading'));

    const jobs = elements.map((element) => {
      const componentName = getComponentNameFromElement(element);
      return componentName ? loadComponent(componentName, element) : Promise.resolve();
    });

    await Promise.all(jobs);

    document.dispatchEvent(new CustomEvent('componentsLoaded', {
      detail: {
        total: jobs.length
      }
    }));

    console.log(`[Component Loader] Components processed: ${jobs.length}`);
  }

  function init() {
    loadAllComponents();
  }

  window.ComponentsLoader = {
    load: loadComponent,
    loadAll: loadAllComponents,
    getSiteRootURL,
    getComponentsBaseURL
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
